"use client";

import { Dashboard } from "@/entities/Dashboard";
import dynamic from "next/dynamic";

const UserChartBar = dynamic(
  () => import("@/components/dashboard/user-chart-bar").then((mod) => mod.UserChartBar),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

const UserChartPie = dynamic(
  () => import("@/components/dashboard/user-chart-pie").then((mod) => mod.UserChartPie),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  },
);

export const UserChartWrapper = ({ data = [] }: { data: Dashboard[] }) => {
  return (
    <>
      <UserChartPie data={data} />
      <UserChartBar data={data} />
    </>
  );
};
