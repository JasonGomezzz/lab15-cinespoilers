export interface TmdbMovie {
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  genre_ids: number[];
  adult: boolean;
  video: boolean;
  original_language: string;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TmdbMovieDetail extends Omit<TmdbMovie, "genre_ids"> {
  genres: TmdbGenre[];
  runtime: number | null;
  tagline: string | null;
  status: string;
  homepage: string | null;
  budget: number;
  revenue: number;
  imdb_id: string | null;
  production_companies: TmdbProductionCompany[];
}

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export type TmdbMoviesResponse = TmdbPaginatedResponse<TmdbMovie>;
