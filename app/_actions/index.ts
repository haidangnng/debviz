import { prisma } from "@/lib/prisma";

export const getMovieCount = async (): Promise<number> => {
  try {
    const count = await prisma.movie.count();
    return count;
  } catch (error) {
    console.error("Error fetching movie count:", error);
    throw error;
  }
};

export const getGenreCount = async (): Promise<number> => {
  try {
    const count = await prisma.genre.count();
    return count;
  } catch (error) {
    console.error("Error fetching genre count:", error);
    throw error;
  }
};

export const getCountryCount = async (): Promise<number> => {
  try {
    const count = await prisma.country.count();
    return count;
  } catch (error) {
    console.error("Error fetching country count:", error);
    throw error;
  }
};
