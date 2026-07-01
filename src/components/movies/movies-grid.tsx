import { usePopularMovies } from "@/hooks/use-movies";

import MoviesError from "./movies-error";
import MoviesGridSkeleton from "./movies-grid-skeleton";
import MoviesList from "./movies-list";

const FEATURED_COUNT = 6;

const MoviesGrid = () => {
  const { data, isLoading, isError, refetch } = usePopularMovies();

  return (
    <section className="py-4">
      <header className="mb-8">
        <h2 className="text-3xl font-bold">
          Featured Movies
        </h2>

        <p className="mt-2 text-muted-foreground">
          Most popular releases right now.
        </p>
      </header>

      {isLoading ? (
        <MoviesGridSkeleton count={FEATURED_COUNT} />
      ) : isError ? (
        <MoviesError onRetry={() => refetch()} />
      ) : (
        <MoviesList movies={(data?.results ?? []).slice(0, FEATURED_COUNT)} />
      )}
    </section>
  );
};

export default MoviesGrid;
