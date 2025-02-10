import Link from "next/link";
import { getCountryCount, getGenreCount, getMovieCount } from "./_actions";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default async function Home() {
  const movieCount = await getMovieCount();
  const genreCount = await getGenreCount();
  const countryCount = await getCountryCount();

  return (
    <main className="size-full flex flex-col items-end gap-10">
      <h1 className="text-3xl">Explore IMDb Movies Through Data</h1>

      <p className="text-right text-xl">
        Explore the world of movies like never before! Our interactive
        visualizations provide insights into IMDb movie trends, genre
        popularity, and rating distributions.
      </p>

      <div className="flex flex-col w-1/3 gap-4">
        <div className="flex flex-col gap-2 justify-center items-end flex-1 py-8">
          <h2 className="text-4xl font-semibold">{movieCount}</h2>
          <h3 className="text-2xl">MOVIES</h3>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex flex-col gap-2 justify-center items-end flex-1 py-8">
          <h2 className="text-4xl font-semibold">{genreCount}</h2>
          <h3 className="text-2xl">GENRES</h3>
        </div>

        <Separator orientation="horizontal" />

        <div className="flex flex-col gap-2 justify-center items-end flex-1 py-8">
          <h2 className="text-4xl font-semibold">{countryCount}</h2>
          <h3 className="text-2xl">COUNTRIES</h3>
        </div>
      </div>
    </main>
  );
}
