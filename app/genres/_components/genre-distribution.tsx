import { GenresTree } from "./charts";

type GenreDistributionProps = {
  data: {
    name: string;
    size: number;
  }[];
};

const GenreDistribution: React.FC<GenreDistributionProps> = ({ data }) => {
  return (
    <div className="h-[500px]">
      <p className="description">
        This treemap visualizes the distribution of movies by genre,
        illustrating which genres dominate the industry. Larger blocks indicate
        genres with a higher number of movies, reflecting trends in audience
        demand and filmmaking preferences over time.
      </p>
      <GenresTree data={data} />
    </div>
  );
};

export default GenreDistribution;
