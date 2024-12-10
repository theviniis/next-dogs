"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Dashboard } from "@/entities/Dashboard";
import React from "react";

const chartConfig = {
  acessos: {
    label: "Acessos",
  },
} satisfies ChartConfig;

type UserChartBarProps = Omit<React.ComponentProps<"div">, "children"> & {
  data: Dashboard[];
};

const UserChartBar = React.forwardRef<HTMLDivElement, UserChartBarProps>(
  ({ data = [], ...props }, ref) => {
    return (
      <Card {...props} ref={ref}>
        <CardContent className="flex-1 p-4 h-full my-auto">
          <ChartContainer config={chartConfig} className="">
            <BarChart
              accessibilityLayer
              data={data}
              margin={{
                top: 32,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="title"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Bar dataKey="acessos" fill="hsl(var(--chart-1))" radius={8}>
                <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },
);

UserChartBar.displayName = "UserChartBar";

export { UserChartBar };
