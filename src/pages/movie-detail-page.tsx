import { useEffect } from "react";

import { ArrowLeft, Check, Clock, Plus, Star } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import MoviesError from "@/components/movies/movies-error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useMovieDetail } from "@/hooks/use-movies";
import { getBackdropUrl, getPosterUrl } from "@/lib/tmdb-image";
import {
  MOVIE_PRICE,
  selectIsInCart,
  useCineStore,
} from "@/store/cine-store";

function DetailSkeleton() {
  return (
    <div className="grid gap-8 py-10 md:grid-cols-[240px_1fr]">
      <Skeleton className="aspect-2/3 w-full rounded-lg" />

      <div className="space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-5 w-1/3" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-10 w-40" />
      </div>
    </div>
  );
}

export function MovieDetailPage() {
  const { movieId } = useParams();
  const { data: movie, isLoading, isError, refetch } = useMovieDetail(movieId);

  const setSelectedMovie = useCineStore((state) => state.setSelectedMovie);
  const addToCart = useCineStore((state) => state.addToCart);
  const removeFromCart = useCineStore((state) => state.removeFromCart);
  const inCart = useCineStore(selectIsInCart(Number(movieId)));

  useEffect(() => {
    if (movie) setSelectedMovie(movie);
  }, [movie, setSelectedMovie]);

  if (isLoading) {
    return (
      <PageContainer>
        <DetailSkeleton />
      </PageContainer>
    );
  }

  if (isError || !movie) {
    return (
      <PageContainer>
        <div className="py-10">
          <MoviesError
            message="We couldn't load this movie. Please try again."
            onRetry={() => refetch()}
          />
        </div>
      </PageContainer>
    );
  }

  const releaseYear = movie.release_date?.slice(0, 4) || "—";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <div>
      <div
        className="relative h-64 w-full bg-cover bg-center md:h-96"
        style={{
          backgroundImage: `url(${getBackdropUrl(movie.backdrop_path)})`,
        }}
      >
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/60 to-transparent" />
      </div>

      <PageContainer>
        <div className="relative -mt-28 grid gap-8 pb-16 md:grid-cols-[240px_1fr]">
          <img
            src={getPosterUrl(movie.poster_path, "w500")}
            alt={movie.title}
            className="w-40 rounded-lg border shadow-lg md:w-full"
          />

          <div>
            <Link
              to="/movies"
              className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to movies
            </Link>

            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {movie.title}
            </h1>

            {movie.tagline ? (
              <p className="mt-1 text-muted-foreground italic">
                {movie.tagline}
              </p>
            ) : null}

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <Badge variant="secondary">
                {releaseYear}
              </Badge>

              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                {rating}
              </span>

              {movie.runtime ? (
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {movie.runtime} min
                </span>
              ) : null}
            </div>

            {movie.genres.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {movie.genres.map((genre) => (
                  <Badge
                    key={genre.id}
                    variant="outline"
                  >
                    {genre.name}
                  </Badge>
                ))}
              </div>
            ) : null}

            <h2 className="mt-8 text-lg font-semibold">
              Overview
            </h2>

            <p className="mt-2 max-w-2xl text-muted-foreground">
              {movie.overview || "No synopsis available."}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <span className="text-2xl font-bold">
                ${MOVIE_PRICE.toFixed(2)}
              </span>

              {inCart ? (
                <Button
                  variant="outline"
                  onClick={() => removeFromCart(movie.id)}
                >
                  <Check className="h-4 w-4" />
                  In cart — remove
                </Button>
              ) : (
                <Button onClick={() => addToCart(movie)}>
                  <Plus className="h-4 w-4" />
                  Add to cart
                </Button>
              )}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
