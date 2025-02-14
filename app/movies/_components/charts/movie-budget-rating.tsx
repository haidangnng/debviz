"use client";

import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import {
  CartesianGrid,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BudgetRatingDataType } from "../budget-rating";
import { genres } from "@/app/genres/_components/genre-by-years";
import { toCamelCase } from "@/lib/utils";
import { useMemo } from "react";

const chartConfig = {
  title: {
    label: "Movie released: ",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type MovieBudgetRatingProps = {
  data: BudgetRatingDataType;
  selectedGenres?: string[];
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="bg-gray-800 text-white p-2 rounded shadow-md"
        style={{
          background: getColor(payload[0].payload.genre),
        }}
      >
        <p className="text-xs">Title: {payload[0].payload.title}</p>
        <p className="text-xs">Genre: {payload[0].payload.genre}</p>
        <p className="text-xs">Profit: {payload[0].payload.profit} million</p>
        <p className="text-xs">Rating: {payload[0].payload.rating}</p>
      </div>
    );
  }
  return null;
};

const getColor = (v: string) => {
  const val = toCamelCase(v);
  const genre = genres.find((i) => i.value === val);
  return genre?.color || "hsl(var(--chart-1))";
};

const MovieBudgetRating: React.FC<MovieBudgetRatingProps> = ({ data }) => {
  const scatterMovies = useMemo(() => {
    return data.map((v, i) => {
      return (
        <Scatter
          key={i}
          name="title"
          data={v.movies}
          fill={getColor(v.genre)}
        />
      );
    });
  }, [data]);
  return (
    <ChartContainer config={chartConfig}>
      <ScatterChart
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="profit" name="budget" unit="mil" />
        <YAxis
          type="number"
          dataKey="rating"
          name="rating"
          unit=""
          domain={[0, 10]}
        />
        <Tooltip
          cursor={{ strokeDasharray: "3 3" }}
          content={<CustomTooltip />}
        />
        {scatterMovies}
      </ScatterChart>
    </ChartContainer>
  );
};

export default MovieBudgetRating;
