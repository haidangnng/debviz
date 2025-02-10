"use client";

import { BudgetRatingDataType } from "./budget-rating";
import MovieBudgetRating from "./charts/movie-budget-rating";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { selectYearOptions } from "@/lib/constants";
import { useMemo, useState } from "react";

type BudgetRatingClientProps = {
  data: BudgetRatingDataType;
};

const BudgetRatingClient: React.FC<BudgetRatingClientProps> = ({ data }) => {
  const [displayOption, setDisplayOption] = useState<string>("2023");

  const chartData = useMemo(() => {
    return data.find((i) => i.year === +displayOption);
  }, [data, displayOption]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-4 md:justify-start md:items-center">
        <Label className="font-semibold">Select year: </Label>
        <Select
          onValueChange={(v) => setDisplayOption(v)}
          value={displayOption}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select year" />
          </SelectTrigger>

          <SelectContent>
            {selectYearOptions.map(
              ({ label, value }) =>
                value !== "all" && (
                  <SelectItem key={value} value={`${value}`}>
                    {label}
                  </SelectItem>
                ),
            )}
          </SelectContent>
        </Select>
      </div>

      {chartData && <MovieBudgetRating data={chartData.data} />}
    </div>
  );
};

export default BudgetRatingClient;
