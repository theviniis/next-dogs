"use client";

import queryClient from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";

export const RootProvider = ({ children }: { children: React.ReactNode }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
