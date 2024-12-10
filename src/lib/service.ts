import { HttpJwtResponse } from "@/action/auth-signin";
import { Comment } from "@/entities/Comment";
import { Dashboard } from "@/entities/Dashboard";
import { Photo } from "@/entities/Photo";
import { User } from "@/entities/User";
import { CommentPostSchema } from "@/schema/comment-post.schema";
import { PasswordResetSchema } from "@/schema/password-reset";
import { PhotoPostSchema } from "@/schema/photo-phost.schema";
import { SigninSchema } from "@/schema/signin.schema";
import { SignupSchema } from "@/schema/signup.schema";
import api, { HttpRequestOptions, HttpResponse } from "./api";

export type ServerFn<Data, Response> = (data?: Data) => Promise<HttpResponse<Response>>;

const createUser: ServerFn<SignupSchema, void> = async (data) => {
  return await api.request<void>("/api/user", {
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUser: ServerFn<SearchParams, User | null> = async () => {
  const response = await api.request<Omit<User, "role">>(`/api/user`, {
    method: "GET",
    expectToken: true,
    next: {
      revalidate: 60,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status !== 200) {
    return {
      ok: false,
      data: null,
      status: response.status,
    };
  }

  return {
    ...response,
    data: { ...response.data, role: "user" },
  };
};

const signin: ServerFn<SigninSchema, HttpJwtResponse> = async (data) => {
  return await api.request("/jwt-auth/v1/token", {
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

type PasswordLostImpl = { login: string; url: string };

const passwordLost: ServerFn<PasswordLostImpl, string> = async (data) => {
  return await api.request("/api/password/lost", {
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

type PasswordResetImpl = PasswordResetSchema & SearchParams;

const passwordReset: ServerFn<PasswordResetImpl, string> = async (data) => {
  return await api.request("/api/password/reset", {
    method: "POST",
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const tokenValidate: ServerFn<string, void> = async (token) => {
  return await api.request("/jwt-auth/v1/token/validate", {
    method: "POST",
    data: { token },
    headers: {
      "Content-Type": "application/json",
    },
    expectToken: true,
  });
};

export interface PhotoPostHttpResponse {
  post_author: number;
  post_type: string;
  post_status: string;
  post_title: string;
  post_content: string;
  files: Files;
  meta_input: MetaInput;
}

export interface Files {
  img: Img;
}

export interface Img {
  name: string;
  full_path: string;
  type: string;
  tmp_name: string;
  error: number;
  size: number;
}

export interface MetaInput {
  peso: string;
  idade: string;
  acessos: number;
}

const photoPost: ServerFn<PhotoPostSchema, PhotoPostHttpResponse> = async (data) => {
  if (!data) throw new Error("Data is required");

  const formData = new FormData();
  formData.append("nome", data.nome);
  formData.append("peso", data.peso.toString());
  formData.append("idade", data.idade.toString());
  formData.append("img", data.img);

  return await api.request("/api/photo", {
    method: "POST",
    data: formData,
    expectToken: true,
    stringify: false,
  });
};

export type PhotoGetSearchParams = {
  page?: number;
  total?: number;
  user?: 0 | string;
};

export type PhotoGetFn = ServerFn<PhotoGetSearchParams | undefined, Photo[]>;

const photoGet = async (
  { page = 1, total = 9, user = 0 }: PhotoGetSearchParams = {},
  options?: HttpRequestOptions,
) => {
  return await api.request<Photo[]>(
    `/api/photo?_user=${user}&_page=${page}&_total=${total}`,
    options || {
      expectToken: true,
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 10,
        tags: ["photos"],
      },
    },
  );
};

export interface GetPhotoByIdHttpResponse {
  photo: Photo;
  comments: Comment[];
}

const photoGetById: ServerFn<Photo["id"], GetPhotoByIdHttpResponse> = async (id) => {
  return await api.request(`/api/photo/${id}`, {
    expectToken: true,
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
      tags: ["photos", "comment"],
    },
  });
};

export type PhotoDeleteFn = ServerFn<Photo["id"], string>;

const photoDelete: PhotoDeleteFn = async (id) => {
  const response = await api.request(`/api/photo/${id}`, {
    method: "DELETE",
    expectToken: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export type CommentPostBody = {
  photoId: Photo["id"];
  data: CommentPostSchema;
};

export type CommentPostFn = ServerFn<CommentPostBody, Comment>;

const commentPost: CommentPostFn = async ({ photoId, data } = {} as CommentPostBody) => {
  const response = await api.request(`/api/comment/${photoId}`, {
    method: "POST",
    expectToken: true,
    data,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};

export type GetDashboardFn = ServerFn<undefined, Dashboard[]>;

const getDashboard: GetDashboardFn = async () => {
  return await api.request(`/api/stats`, {
    expectToken: true,
    headers: {
      "Content-Type": "application/json",
    },
    next: {
      revalidate: 60,
      tags: ["dashboard"],
    },
  });
};

const service = {
  user: {
    create: createUser,
    get: getUser,
  },
  auth: {
    signin,
    passwordLost,
    passwordReset,
    tokenValidate,
  },
  photo: {
    post: photoPost,
    get: photoGet,
    getById: photoGetById,
    delete: photoDelete,
  },
  comment: {
    post: commentPost,
  },
  dashboard: {
    get: getDashboard,
  },
} as const;

export default service;
