import { Loader2, Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface Props {
  searchTerm: string;
  resultsCount: number;
  isFetching?: boolean;
  onSearchTermChange: (searchTerm: string) => void;
}

const MoviesSearch = ({
  searchTerm,
  resultsCount,
  isFetching = false,
  onSearchTermChange,
}: Props) => {
  return (
    <section
      aria-label="Movie search"
      className="mb-8"
    >
      <div className="grid gap-4 rounded-lg border bg-card p-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <label
            htmlFor="movie-search"
            className="text-sm font-medium"
          >
            Search by title
          </label>

          <div className="relative mt-2">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="movie-search"
              value={searchTerm}
              onChange={(event) => onSearchTermChange(event.target.value)}
              placeholder="Search movies"
              className="pl-9"
            />
          </div>
        </div>

        <p className="flex items-center gap-2 text-sm text-muted-foreground md:pb-2">
          {isFetching ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          {resultsCount} {resultsCount === 1 ? "result" : "results"}
        </p>
      </div>
    </section>
  );
};

export default MoviesSearch;
