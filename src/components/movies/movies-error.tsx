import { TriangleAlert } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  message?: string;
  onRetry?: () => void;
}

const MoviesError = ({ message, onRetry }: Props) => {
  return (
    <section className="rounded-lg border border-dashed py-16 text-center">
      <TriangleAlert className="mx-auto h-8 w-8 text-destructive" />

      <h2 className="mt-4 text-xl font-semibold">
        Something went wrong
      </h2>

      <p className="mt-2 text-sm text-muted-foreground">
        {message ?? "We couldn't load the movies. Please try again."}
      </p>

      {onRetry ? (
        <Button
          variant="outline"
          className="mt-6"
          onClick={onRetry}
        >
          Retry
        </Button>
      ) : null}
    </section>
  );
};

export default MoviesError;
