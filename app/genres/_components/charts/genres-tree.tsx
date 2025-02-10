"use client";

import React, { useMemo } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
  "#FF8042",
  "#FFBB28",
  "#00C49F",
  "#0088FE",
  "#FF6666",
  "#FF4444",
  "#AA336A",
  "#DDBB99",
  "#FF5733",
  "#66CC99",
  "#3399FF",
  "#B266FF",
  "#FF99CC",
];

const CustomizedContent = (props) => {
  const { depth, x, y, width, height, index, colors, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: colors[index],
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth !== 1 ? (
        <text
          x={x + width / 2}
          y={y + height / 2 + 7}
          textAnchor="middle"
          fill="#fff"
          fontSize={14}
        >
          {name}
        </text>
      ) : null}
      {depth === 1 ? (
        <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
          {index + 1}
        </text>
      ) : null}
    </g>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white p-2 rounded shadow-md">
        <p className="text-sm font-semibold">{payload[0].payload.name}</p>
        <p className="text-xs">Numbers of Movies: {payload[0].value}</p>
      </div>
    );
  }
  return null;
};

type GenresTreeProps = {
  data: {
    name: string;
    size: number;
  }[];
};

const GenresTree: React.FC<GenresTreeProps> = ({ data }) => {
  const parsedData = useMemo(
    () => [
      {
        name: "genres",
        children: data,
      },
    ],
    [data],
  );

  return (
    <ResponsiveContainer width="100%" height="100%">
      <Treemap
        // width={400}
        // height={200}
        data={parsedData}
        dataKey="size"
        stroke="#fff"
        fill="#8884d8"
        content={<CustomizedContent colors={COLORS} />}
      >
        <Tooltip content={<CustomTooltip />} />
      </Treemap>
    </ResponsiveContainer>
  );
};

export default GenresTree;
