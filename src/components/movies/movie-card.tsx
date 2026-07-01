import { Star } from "lucide-react";
import { Link } from "react-router-dom";

import { getPosterUrl } from "@/lib/tmdb-image";
import type { TmdbMovie } from "@/types/tmdb";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  movie: TmdbMovie;
}

const MovieCard = ({ movie }: Props) => {
  const releaseYear = movie.release_date?.slice(0, 4) || "—";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  return (
    <article>
      <Card className="h-full overflow-hidden">
        <Link
          to={`/movies/${movie.id}`}
          className="block"
        >
          <img
            src={getPosterUrl(movie.poster_path, "w500")}
            alt={movie.title}
            loading="lazy"
            className="aspect-2/3 w-full object-cover"
          />
        </Link>

        <CardHeader className="gap-3">
          <div className="flex items-center justify-between gap-2">
            <Badge
              variant="secondary"
              className="w-fit"
            >
              {releaseYear}
            </Badge>

            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              {rating}
            </span>
          </div>

          <CardTitle className="line-clamp-1">
            {movie.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="mb-4 line-clamp-3 text-sm text-muted-foreground">
            {movie.overview || "No synopsis available."}
          </p>

          <Link
            to={`/movies/${movie.id}`}
            className="
              text-sm
              font-medium
              text-blue-600
              hover:underline
            "
          >
            View details
          </Link>
        </CardContent>
      </Card>
    </article>
  );
};

export default MovieCard;
