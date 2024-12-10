"use server";

import { Photo } from "@/entities/Photo";
import service from "@/lib/service";

export default async function photoDelete(id: Photo["id"]) {
  try {
    const response = await service.photo.delete(id);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
