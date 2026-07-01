import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  getMovieDetail,
  getPopularMovies,
  searchMovies,
} from "@/services/tmdb-service";

/** Centralized query keys for movie-related queries (handy for invalidation/tests). */
export const movieKeys = {
  all: ["movies"] as const,
  popular: (page: number) => [...movieKeys.all, "popular", page] as const,
  search: (query: string, page: number) =>
    [...movieKeys.all, "search", query, page] as const,
  detail: (movieId: string | number) =>
    [...movieKeys.all, "detail", String(movieId)] as const,
};

/** Popular movies list, keeping previous page's data while the next one loads. */
export function usePopularMovies(page = 1) {
  return useQuery({
    queryKey: movieKeys.popular(page),
    queryFn: () => getPopularMovies(page),
    placeholderData: keepPreviousData,
  });
}

/** Search-by-title query. Disabled while the (trimmed) query is empty. */
export function useSearchMovies(query: string, page = 1) {
  const normalizedQuery = query.trim();

  return useQuery({
    queryKey: movieKeys.search(normalizedQuery, page),
    queryFn: () => searchMovies(normalizedQuery, page),
    enabled: normalizedQuery.length > 0,
    placeholderData: keepPreviousData,
  });
}

/** Single movie detail. Disabled until a valid id is provided. */
export function useMovieDetail(movieId: string | number | undefined) {
  return useQuery({
    queryKey: movieKeys.detail(movieId ?? ""),
    queryFn: () => getMovieDetail(movieId as string | number),
    enabled: movieId !== undefined && String(movieId).length > 0,
  });
}
