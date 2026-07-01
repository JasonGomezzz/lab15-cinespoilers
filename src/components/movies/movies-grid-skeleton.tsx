import { Skeleton } from "@/components/ui/skeleton";

interface Props {
  count?: number;
}

const MoviesGridSkeleton = ({ count = 8 }: Props) => {
  return (
    <div
      aria-hidden
      className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-lg border"
        >
          <Skeleton className="aspect-2/3 w-full rounded-none" />

          <div className="space-y-3 p-4">
            <Skeleton className="h-5 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MoviesGridSkeleton;
