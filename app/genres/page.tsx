import {
  getAverageRatingsByGenre,
  getGenresCountByYear,
  getGenresWithMovieCount,
} from "./_actions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import GenreDistribution from "./_components/genre-distribution";
import GenreByYears from "./_components/genre-by-years";
import GenreRating from "./_components/genre-rating";

export default async function GenrePage() {
  const genresWithMovieCounts = await getGenresWithMovieCount();
  const genresCountByYear = await getGenresCountByYear();
  const genresImdb = await getAverageRatingsByGenre();

  return (
    <div className="h-full">
      <p className="description">
        Genres define the identity of movies, shaping audience expectations and
        storytelling styles. From timeless classics to modern blockbusters,
        understanding genre trends helps us see how the film industry evolves.
        This page explores the distribution of movies across different genres,
        providing insights into their popularity and presence in cinema history.
      </p>
      <Accordion type="single" collapsible>
        <AccordionItem value="genre-distribution">
          <AccordionTrigger className="text-2xl justify-end gap-10">
            Genre Distributions
          </AccordionTrigger>
          <AccordionContent>
            <GenreDistribution data={genresWithMovieCounts} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="genre-year">
          <AccordionTrigger className="text-2xl justify-end gap-10">
            Genres By Years
          </AccordionTrigger>
          <AccordionContent>
            <GenreByYears data={genresCountByYear} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="genre-imdb">
          <AccordionTrigger className="text-2xl justify-end gap-10">
            Genres Rating
          </AccordionTrigger>
          <AccordionContent>
            <GenreRating data={genresImdb} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
