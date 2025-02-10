"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { chartConfig } from "@/lib/constants";
import { toCamelCase } from "@/lib/utils";

export type GenreRatingDataType = {
  genre: string;
  averageRating: number;
};

type GenreRatingBarProps = {
  data: GenreRatingDataType[];
  displayOption: string;
};

const GenreRatingBar: React.FC<GenreRatingBarProps> = ({
  data,
  displayOption,
}) => {
  const fillData = data.map((i) => ({
    ...i,
    fill: `var(--color-${toCamelCase(i.genre)})`,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Genres&apos; Average Rating</CardTitle>
        <CardDescription>
          {displayOption === "all" ? "Last 10 years" : displayOption}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={fillData}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="genre"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="averageRating" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GenreRatingBar;
