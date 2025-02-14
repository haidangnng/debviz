"use client";
import { useMemo, useState } from "react";
import { AverageRatingsType } from "../_actions";
import GenreRatingBar from "./charts/genres-rating-bar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { selectYearOptions } from "@/lib/constants";
import { filter } from "d3";

type GenreRatingProps = {
  data: AverageRatingsType;
};

const GenreRating: React.FC<GenreRatingProps> = ({ data }) => {
  const [sortDirection, setSortDirection] = useState<string>("acs");
  const [displayOption, setDisplayOption] = useState<string>("all");

  const genreRatings = useMemo(() => {
    return data
      .map((genre) => {
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
      })
      .sort((a, b) => {
        const nameA = a.genre.toUpperCase(); // ignore upper and lowercase
        const nameB = b.genre.toUpperCase(); // ignore upper and lowercase
        switch (sortDirection) {
          case "asc":
            return a.averageRating - b.averageRating;
          case "desc":
            return b.averageRating - a.averageRating;
          case "az":
            return nameA > nameB;
          case "za":
            return nameA < nameB;
          default:
            return a.averageRating - b.averageRating;
        }
      });
  }, [data, displayOption, sortDirection]);

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
        <div className="flex justify-between items-center">
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

          <RadioGroup
            defaultValue="asc"
            className="flex gap-4"
            onValueChange={(v) => setSortDirection(v)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="asc" id="asc" />
              <Label htmlFor="asc">Ascending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="desc" id="desc" />
              <Label htmlFor="desc">Descending</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="az" id="asc" />
              <Label htmlFor="asc">A-Z</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="za" id="desc" />
              <Label htmlFor="desc">Z-A</Label>
            </div>
          </RadioGroup>
        </div>
        <GenreRatingBar data={genreRatings} displayOption={displayOption} />
      </div>
    </div>
  );
};

export default GenreRating;
