"use client";
import { useMemo, useState } from "react";
import { AverageRatingsType } from "../_actions";
import GenreRatingBar from "./charts/genres-rating-bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { selectYearOptions } from "@/lib/constants";

type GenreRatingProps = {
  data: AverageRatingsType;
};

const GenreRating: React.FC<GenreRatingProps> = ({ data }) => {
  const [displayOption, setDisplayOption] = useState<string>("all");

  const genreRatings = useMemo(() => {
    return data.map((genre) => {
      const ratings = genre.movies
        .map(({ movie }) => {
          if (
            displayOption === "all" ||
            new Date(movie.release_date!).getFullYear() === +displayOption
          )
            return movie.vote_average;
          return null;
        })
        .filter((r) => r !== null);

      const averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
          : 0;

      return {
        genre: genre.name,
        averageRating: parseFloat(averageRating.toFixed(2)),
      };
    });
  }, [data, displayOption]);

  return (
    <div className="">
      <p className="description">
        Not all movie genres are rated equally. Some genres consistently receive
        higher IMDb ratings, while others face more critical reception. This
        analysis explores the average IMDb ratings for each genre, helping us
        understand which categories tend to be more critically acclaimed or
        audience-favored.
      </p>

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
              {selectYearOptions.map(({ label, value }) => (
                <SelectItem key={value} value={`${value}`}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <GenreRatingBar data={genreRatings} displayOption={displayOption} />
      </div>
    </div>
  );
};

export default GenreRating;
