/* eslint-disable @typescript-eslint/no-explicit-any */

import { tokenGet } from "@/action/token-get";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

type HttpApiConfig = {
  baseUrl?: string;
  headers?: {
    "Content-Type": string;
    Authorization?: string;
  };
};

export type HttpResponse<T = any> = {
  status: number;
  data: T;
  ok: boolean;
};

export type HttpRequestOptions = RequestInit & {
  data?: unknown;
  expectToken?: boolean;
  method?: HttpMethod;
  stringify?: boolean;
};

export class Api {
  constructor(private config?: HttpApiConfig) {}

  public async request<D = any>(
    url: string,
    { stringify = true, ...c }: HttpRequestOptions,
  ): Promise<HttpResponse<D>> {
    const _url = `${this.config?.baseUrl}${url}`;

    const headers = {
      ...this.config?.headers,
      ...c.headers,
      ...(!!c.expectToken && {
        Authorization: `Bearer ${(await tokenGet())?.value}`,
      }),
    };

    try {
      const response = await fetch(_url, {
        method: c.method || "GET",
        headers,
        body: stringify ? JSON.stringify(c.data) : (c.data as BodyInit),
      });

      const data = await response.json();

      if (data?.code === "error") {
        throw new Error(data?.message || "Erro genérico");
      }

      return {
        ok: true,
        status: response.status,
        data,
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}

const api = new Api({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
});

export default api;
