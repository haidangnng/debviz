import { prisma } from "@/lib/prisma";

export async function getMoviesCountByYear() {
  const moviesPerYear = await prisma.movie.groupBy({
    by: ["release_date"],
    _count: {
      id: true,
    },
    orderBy: {
      release_date: "asc",
    },
    where: {
      release_date: {
        lte: new Date("2024-12-31"),
      },
    },
  });

  // Aggregate data by year
  const yearCountMap: Record<number, number> = {};

  moviesPerYear.forEach((entry) => {
    const year = new Date(entry.release_date!).getFullYear();
    yearCountMap[year] = (yearCountMap[year] || 0) + entry._count.id;
  });

  // Convert map to array
  const formattedData = Object.entries(yearCountMap).map(([year, count]) => ({
    year,
    count,
  }));

  return formattedData;
}

export async function getBudgetVsRatingData() {
  const moviesPerYear = await prisma.movie.findMany({
    select: {
      title: true,
      release_date: true,
      budget: true,
      revenue: true,
      vote_average: true,
    },
    where: {
      budget: { gt: 0 }, // Only consider movies with a valid budget
      revenue: { gt: 0 }, // Only consider movies with valid revenue
      vote_average: { gte: 0 }, // Ensure ratings are valid numbers
    },
    orderBy: {
      release_date: "asc",
    },
  });

  // Process the data into the required format
  const yearMap: Record<
    number,
    { title: string; profit: number; rating: number }[]
  > = {};

  moviesPerYear.forEach((movie) => {
    const year = new Date(movie.release_date!).getFullYear();
    const profit = parseFloat((movie.revenue - movie.budget).toFixed(2));
    const rating = movie.vote_average
      ? parseFloat(movie.vote_average.toFixed(2))
      : 0;

    if (!yearMap[year]) {
      yearMap[year] = [];
    }
    yearMap[year].push({ title: movie.title, profit, rating });
  });

  const formattedData = Object.entries(yearMap).map(([year, data]) => ({
    year: Number(year),
    data,
  }));

  return formattedData;
}
