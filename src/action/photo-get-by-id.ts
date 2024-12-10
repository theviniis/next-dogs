"use server";

import { Photo } from "@/entities/Photo";
import service from "@/lib/service";

export default async function getPhotoById(id: Photo["id"]) {
  try {
    const response = await service.photo.getById(id);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
