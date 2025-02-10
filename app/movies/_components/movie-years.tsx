import { getMoviesCountByYear } from "../_actions";
import MovieYearChart from "./charts/movie-year-chart";

const MovieYear: React.FC = async () => {
  const moviesCountByYear = await getMoviesCountByYear();

  return (
    <div>
      <p className="description">
        The number of movies produced each year reveals trends in the film
        industry. This visualization highlights the rise and fall of movie
        production, showing industry booms, shifts in audience demand, and
        technological advancements that influenced filmmaking over time.
      </p>

      <MovieYearChart data={moviesCountByYear} />
    </div>
  );
};

export default MovieYear;
