"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/lib/constants";

const GenreYearLine: React.FC<{ data: Record<string, number>[] }> = ({
  data,
}) => {
  const dataKeys = Object.keys(data[0]).filter((i) => i !== "year");

  return (
    <Card className="w-fit mx-auto">
      <CardContent className="flex justify-center items-center w-fit">
        <ChartContainer config={chartConfig} className="h-96">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
            height={300}
          >
            <CartesianGrid />
            <XAxis
              dataKey="year"
              tickLine={true}
              axisLine={true}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            {dataKeys.map((i) => (
              <Line
                key={i}
                dataKey={i}
                type="monotone"
                stroke={`var(--color-${i})`}
                strokeWidth={2}
                dot={true}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GenreYearLine;
