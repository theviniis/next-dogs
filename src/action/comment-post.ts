"use server";

import service, { CommentPostBody } from "@/lib/service";
import { revalidateTag } from "next/cache";

export default async function commentPost(data: CommentPostBody) {
  try {
    const response = await service.comment.post(data);
    revalidateTag("photos");
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
