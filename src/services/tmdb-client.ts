import axios from "axios";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

const tmdbToken = import.meta.env.VITE_TMDB_TOKEN;

if (!tmdbToken) {
  console.warn(
    "[tmdb] VITE_TMDB_TOKEN is not set. Requests to TMDB will fail with 401.",
  );
}

/**
 * Dedicated axios instance for the TMDB REST API (v3 endpoints), authenticated
 * with the v4 Read Access Token via Bearer auth. Kept separate from the
 * project's generic `httpClient` (which targets VITE_API_URL).
 */
export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  headers: {
    Authorization: `Bearer ${tmdbToken}`,
    Accept: "application/json",
  },
});
