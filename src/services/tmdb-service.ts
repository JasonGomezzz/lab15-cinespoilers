import { tmdbClient } from "@/services/tmdb-client";
import type { TmdbMovieDetail, TmdbMoviesResponse } from "@/types/tmdb";

/** Lists the currently popular movies (paginated). */
export async function getPopularMovies(
  page = 1,
): Promise<TmdbMoviesResponse> {
  const { data } = await tmdbClient.get<TmdbMoviesResponse>("/movie/popular", {
    params: { page, language: "en-US" },
  });

  return data;
}

/** Searches movies by title (paginated). Adult content is excluded. */
export async function searchMovies(
  query: string,
  page = 1,
): Promise<TmdbMoviesResponse> {
  const { data } = await tmdbClient.get<TmdbMoviesResponse>("/search/movie", {
    params: { query, page, include_adult: false, language: "en-US" },
  });

  return data;
}

/** Fetches the full detail of a single movie by its TMDB id. */
export async function getMovieDetail(
  movieId: number | string,
): Promise<TmdbMovieDetail> {
  const { data } = await tmdbClient.get<TmdbMovieDetail>(`/movie/${movieId}`, {
    params: { language: "en-US" },
  });

  return data;
}
