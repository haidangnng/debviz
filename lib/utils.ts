import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toCamelCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 ]/g, "") // Remove special characters
    .split(" ")
    .map((word, index) =>
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join("");
}

export function groupMoviesByGenre(movies) {
  return Object.values(
    movies.reduce((acc, movie) => {
      const genre = movie.genre.toLowerCase();

      if (!acc[genre]) {
        acc[genre] = { genre, movies: [] };
      }

      acc[genre].movies.push(movie);
      return acc;
    }, {}),
  );
}
