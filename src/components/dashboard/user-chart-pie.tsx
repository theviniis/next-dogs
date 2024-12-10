"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Dashboard } from "@/entities/Dashboard";
import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = { acessos: { label: "Acessos" } } satisfies ChartConfig;

type UserChartPieProps = Omit<React.ComponentProps<"div">, "children"> & {
  data: Dashboard[];
};

const UserChartPie = React.forwardRef<HTMLDivElement, UserChartPieProps>(
  ({ data = [], ...props }, ref) => {
    const totalVisitors = React.useMemo(() => {
      return data.reduce((acc, curr) => acc + curr.acessos, 0);
    }, [data]);

    return (
      <Card {...props} ref={ref}>
        <CardContent className="flex-1 p-4 h-full my-auto">
          <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[300px]">
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={data}
                dataKey="acessos"
                nameKey="title"
                innerRadius={60}
                fill={"hsl(var(--chart-1))"}
                stroke="hsl(var(--background))"
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalVisitors.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Acessos
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  },
);

UserChartPie.displayName = "UserChartPie";

export { UserChartPie };
