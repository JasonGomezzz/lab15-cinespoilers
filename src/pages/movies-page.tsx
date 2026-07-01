import { useState } from "react";

import PageContainer from "@/components/layout/page-container";
import MoviesError from "@/components/movies/movies-error";
import MoviesGridSkeleton from "@/components/movies/movies-grid-skeleton";
import MoviesList from "@/components/movies/movies-list";
import MoviesPageHeader from "@/components/movies/movies-page-header";
import MoviesSearch from "@/components/movies/movies-search";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { usePopularMovies, useSearchMovies } from "@/hooks/use-movies";

const MoviesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebouncedValue(searchTerm.trim(), 400);
  const isSearchActive = debouncedSearch.length > 0;

  const popularQuery = usePopularMovies();
  const searchQuery = useSearchMovies(debouncedSearch);

  const activeQuery = isSearchActive ? searchQuery : popularQuery;
  const movies = activeQuery.data?.results ?? [];

  return (
    <PageContainer>
      <MoviesPageHeader />

      <MoviesSearch
        searchTerm={searchTerm}
        resultsCount={movies.length}
        isFetching={activeQuery.isFetching}
        onSearchTermChange={setSearchTerm}
      />

      {activeQuery.isLoading ? (
        <MoviesGridSkeleton />
      ) : activeQuery.isError ? (
        <MoviesError onRetry={() => activeQuery.refetch()} />
      ) : (
        <MoviesList movies={movies} />
      )}
    </PageContainer>
  );
};

export default MoviesPage;
