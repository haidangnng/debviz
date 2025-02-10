import { prisma } from "@/lib/prisma";
import { toCamelCase } from "@/lib/utils";

const getGenresCountByYear = async () => {
  const currentYear = new Date().getFullYear();
  const minYear = Math.max(currentYear - 9, 2015);

  const moviesWithGenres = await prisma.movie.findMany({
    select: {
      release_date: true,
      genres: {
        select: {
          genre: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      release_date: {
        gte: new Date(`${minYear}-01-01`),
        lte: new Date("2024-12-31"), // Ensures max year is 2025
      },
    },
  });

  // Process data into the required format
  const genreCountsByYear = moviesWithGenres.reduce(
    (acc, movie) => {
      const year = new Date(movie.release_date!).getFullYear();

      if (!acc[year]) {
        acc[year] = { year };
      }

      movie.genres.forEach(({ genre }) => {
        acc[year][toCamelCase(genre.name)] =
          (acc[year][toCamelCase(genre.name)] || 0) + 1;
      });

      return acc;
    },
    {} as Record<number, Record<string, number>>,
  );

  return Object.values(genreCountsByYear);
};

const getGenresWithMovieCount = async () => {
  const genres = await prisma.genre.findMany({
    select: {
      name: true,
      _count: {
        select: {
          movies: true,
        },
      },
    },
  });

  return genres.map((genre) => ({
    name: genre.name,
    size: genre._count.movies,
  }));
};

const getAverageRatingsByGenre = async () => {
  const genresWithRatings = await prisma.genre.findMany({
    select: {
      name: true,
      movies: {
        select: {
          movie: {
            select: {
              vote_average: true,
              release_date: true,
            },
          },
        },
      },
    },
  });

  return genresWithRatings;
};

export type AverageRatingsType = Awaited<
  ReturnType<typeof getAverageRatingsByGenre>
>;

export {
  getGenresCountByYear,
  getGenresWithMovieCount,
  getAverageRatingsByGenre,
};
