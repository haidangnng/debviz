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
import { useCallback, useMemo, useState } from "react";
import { genres } from "@/app/genres/_components/genre-by-years";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn, groupMoviesByGenre, toCamelCase } from "@/lib/utils";
import { XIcon } from "lucide-react";

type BudgetRatingClientProps = {
  data: BudgetRatingDataType;
};

const BudgetRatingClient: React.FC<BudgetRatingClientProps> = ({ data }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [displayOption, setDisplayOption] = useState<string>("2023");

  const selectOptions = useMemo(() => {
    if (!selectedGenres.length) {
      return genres;
    }

    return genres.filter((genre) => !selectedGenres.includes(genre.value));
  }, [selectedGenres]);

  const handleSelectGenres = (v: string) => {
    setSelectedGenres((prev) => [...prev, v]);
  };

  const handleRemoveGenre = useCallback(
    (v: string) => {
      const newSelectedGenres = selectedGenres.filter((genre) => genre !== v);
      setSelectedGenres(newSelectedGenres);
    },
    [selectedGenres],
  );

  const chartData = useMemo(() => {
    const yearData = data.find((i) => i.year === +displayOption)?.data || [];

    if (!selectedGenres.length) return groupMoviesByGenre(yearData) || [];

    return groupMoviesByGenre(
      yearData.filter((i) => {
        return selectedGenres.includes(toCamelCase(i.genre));
      }),
    );
  }, [data, displayOption, selectedGenres]);

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

      <div className="flex flex-col justify-start gap-2">
        <div className="flex gap-2">
          <Select onValueChange={handleSelectGenres} value="">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Add a genre" />
            </SelectTrigger>

            <SelectContent>
              {selectOptions.map(({ label, value }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedGenres.length > 0 && (
            <Button onClick={() => setSelectedGenres([])}>Remove all</Button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedGenres.map((selected, index) => {
            const { color, label } = genres.find(
              (i) => i.value === selected,
            ) || {
              color: undefined,
              label: undefined,
            };

            return (
              <Badge
                key={index}
                className={`flex gap-2 items-center justify-between w-fit rounded-full`}
                style={{
                  backgroundColor: color,
                }}
              >
                {label}
                <Button
                  variant={"ghost"}
                  className={cn("p-0 h-fit")}
                  onClick={() => handleRemoveGenre(selected)}
                >
                  <XIcon />
                </Button>
              </Badge>
            );
          })}
        </div>
      </div>

      {chartData && (
        <MovieBudgetRating data={chartData} selectedGenres={selectedGenres} />
      )}
    </div>
  );
};

export default BudgetRatingClient;
