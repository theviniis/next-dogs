"use server";

import service, { PhotoGetSearchParams } from "@/lib/service";

export default async function photoGet(options?: PhotoGetSearchParams) {
  try {
    const response = await service.photo.get(options);
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
