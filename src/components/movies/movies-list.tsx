import type { TmdbMovie } from "@/types/tmdb";

import MovieCard from "./movie-card";

interface Props {
  movies: TmdbMovie[];
}

const MoviesList = ({
  movies,
}: Props) => {
  if (movies.length === 0) {
    return (
      <section className="rounded-lg border border-dashed py-16 text-center">
        <h2 className="text-xl font-semibold">
          No movies found
        </h2>

        <p className="mt-2 text-sm text-muted-foreground">
          Try another title.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label="Movies list"
      className="grid gap-6 pb-12 md:grid-cols-2 lg:grid-cols-3"
    >
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
        />
      ))}
    </section>
  );
};

export default MoviesList;
