"use client";
import { useCallback, useMemo, useState } from "react";
import { GenreYearLine } from "./charts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type GenreByYears = {
  data: Record<string, number>[];
};

const genres = [
  {
    label: "Action",
    value: "action",
    color: "hsl(var(--chart-1))",
  },
  {
    label: "Adventure",
    value: "adventure",
    color: "hsl(var(--chart-2))",
  },
  {
    label: "Animation",
    value: "animation",
    color: "hsl(var(--chart-3))",
  },
  {
    label: "Comedy",
    value: "comedy",
    color: "hsl(var(--chart-4))",
  },
  {
    label: "Crime",
    value: "crime",
    color: "hsl(var(--chart-5))",
  },
  {
    label: "Documentary",
    value: "documentary",
    color: "hsl(var(--chart-6))",
  },
  {
    label: "Drama",
    value: "drama",
    color: "hsl(var(--chart-7))",
  },
  {
    label: "Family",
    value: "family",
    color: "hsl(var(--chart-8))",
  },
  {
    label: "Fantasy",
    value: "fantasy",
    color: "hsl(var(--chart-9))",
  },
  {
    label: "History",
    value: "history",
    color: "hsl(var(--chart-10))",
  },
  {
    label: "Horror",
    value: "horror",
    color: "hsl(var(--chart-11))",
  },
  {
    label: "Music",
    value: "music",
    color: "hsl(var(--chart-12))",
  },
  {
    label: "Mystery",
    value: "mystery",
    color: "hsl(var(--chart-13))",
  },
  {
    label: "Romance",
    value: "romance",
    color: "hsl(var(--chart-14))",
  },
  {
    label: "Science Fiction",
    value: "scienceFiction",
    color: "hsl(var(--chart-15))",
  },
  {
    label: "Thriller",
    value: "thriller",
    color: "hsl(var(--chart-16))",
  },
  {
    label: "TV Movie",
    value: "tvMovie",
    color: "hsl(var(--chart-17))",
  },
  {
    label: "War",
    value: "war",
    color: "hsl(var(--chart-18))",
  },
  {
    label: "Western",
    value: "western",
    color: "hsl(var(--chart-19))",
  },
];

const GenreByYears: React.FC<GenreByYears> = ({ data }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const filteredData = useMemo(() => {
    if (!selectedGenres.length) return data;

    return data.map((i) => {
      const res: Record<string, number> = {
        year: i["year"],
      };

      selectedGenres.map((genre) => (res[genre] = i[genre]));
      return res;
    });
  }, [data, selectedGenres]);

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

  return (
    <div className="flex flex-col">
      <p className="description">
        Movie genres evolve over time, reflecting shifts in audience
        preferences, cultural movements, and industry trends. By analyzing genre
        distribution year by year, we can see which types of films gained
        popularity and which ones faded away. This visualization provides
        insights into how storytelling and entertainment have changed over the
        past decade.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-start gap-6">
        <GenreYearLine data={filteredData} />

        <div className="flex flex-col gap-4 my-6">
          <div className="flex items-center gap-2 font-medium leading-none">
            We could just select the genres we are interested in
          </div>

          <div className="flex justify-start items-center gap-2">
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
              ) || { color: undefined, label: undefined };

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
      </div>
    </div>
  );
};

export default GenreByYears;
