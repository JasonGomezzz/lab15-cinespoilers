const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export type PosterSize =
  | "w92"
  | "w154"
  | "w185"
  | "w342"
  | "w500"
  | "w780"
  | "original";

export type BackdropSize = "w300" | "w780" | "w1280" | "original";

const POSTER_PLACEHOLDER = "https://placehold.co/342x513?text=No+Poster";
const BACKDROP_PLACEHOLDER = "https://placehold.co/1280x720?text=No+Image";

/** Builds a full poster URL from a TMDB `poster_path`, with a placeholder fallback. */
export function getPosterUrl(
  path: string | null | undefined,
  size: PosterSize = "w500",
): string {
  if (!path) return POSTER_PLACEHOLDER;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}

/** Builds a full backdrop URL from a TMDB `backdrop_path`, with a placeholder fallback. */
export function getBackdropUrl(
  path: string | null | undefined,
  size: BackdropSize = "w1280",
): string {
  if (!path) return BACKDROP_PLACEHOLDER;
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
}
