"use server";

import service from "@/lib/service";
import { PhotoPostSchema } from "@/schema/photo-phost.schema";

export async function photoPost(data: PhotoPostSchema) {
  try {
    const response = await service.photo.post(data);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
