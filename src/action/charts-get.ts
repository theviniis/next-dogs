"use server";

import service from "@/lib/service";

export default async function chartsGet() {
  try {
    const response = await service.dashboard.get();
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}
