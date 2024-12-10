"use server";

import service from "@/lib/service";

export async function userGet() {
  try {
    const response = await service.user.get();
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
