import { X } from "lucide-react";

import { getPosterUrl } from "@/lib/tmdb-image";
import {
  selectCartTotal,
  useCineStore,
} from "@/store/cine-store";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const OrderSummary = () => {
  const items = useCineStore((state) => state.items);
  const total = useCineStore(selectCartTotal);
  const removeFromCart = useCineStore((state) => state.removeFromCart);
  const isProcessing = useCineStore(
    (state) => state.purchaseStatus === "processing",
  );

  return (
    <aside className="rounded-lg border bg-card p-6">
      <h2 className="text-lg font-semibold">
        Order summary
      </h2>

      <ul className="mt-4 space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center gap-3"
          >
            <img
              src={getPosterUrl(item.posterPath, "w92")}
              alt={item.title}
              className="h-16 w-11 shrink-0 rounded object-cover"
            />

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">
                {item.title}
              </p>
              <p className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)}
              </p>
            </div>

            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Remove ${item.title}`}
              disabled={isProcessing}
              onClick={() => removeFromCart(item.id)}
            >
              <X />
            </Button>
          </li>
        ))}
      </ul>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <span className="font-medium">Total</span>
        <span className="text-lg font-bold">
          ${total.toFixed(2)}
        </span>
      </div>
    </aside>
  );
};

export default OrderSummary;
