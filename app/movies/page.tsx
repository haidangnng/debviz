import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import MovieYear from "./_components/movie-years";
import BudgetRating from "./_components/budget-rating";

export default async function MoviePage() {
  return (
    <div className="h-full">
      <p className="description">
        Explore the evolution of cinema through data-driven insights. This page
        visualizes key trends such as movie production over the years, genre
        distribution, IMDb ratings, and more. Gain a deeper understanding of how
        the film industry has changed over time without diving into individual
        movie details.{" "}
      </p>

      <Accordion type="single" collapsible>
        <AccordionItem value="genre-distribution">
          <AccordionTrigger className="text-2xl justify-end gap-10">
            Movies Released Over the Years
          </AccordionTrigger>
          <AccordionContent>
            <MovieYear />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="genre-year">
          <AccordionTrigger className="text-2xl justify-end gap-10">
            Profit vs IMDb Ratings Over the Years{" "}
          </AccordionTrigger>
          <AccordionContent>
            <BudgetRating />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="genre-imdb">
          <AccordionTrigger className="text-2xl justify-end gap-10">
            Genres Rating
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
