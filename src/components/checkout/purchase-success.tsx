import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";

import type { PurchaseReceipt } from "@/store/cine-store";
import { useCineStore } from "@/store/cine-store";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface Props {
  receipt: PurchaseReceipt;
}

const PurchaseSuccess = ({ receipt }: Props) => {
  const resetPurchase = useCineStore((state) => state.resetPurchase);

  const purchasedAt = new Date(receipt.purchasedAt).toLocaleString();

  return (
    <section className="mx-auto max-w-lg py-16 text-center">
      <CircleCheck className="mx-auto h-14 w-14 text-green-600" />

      <h1 className="mt-6 text-3xl font-bold tracking-tight">
        Purchase successful!
      </h1>

      <p className="mt-2 text-muted-foreground">
        Thanks for your (simulated) purchase. Enjoy the show!
      </p>

      <div className="mt-8 rounded-lg border bg-card p-6 text-left">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Order</span>
          <span className="font-mono font-medium">{receipt.orderId}</span>
        </div>

        <div className="mt-1 flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Date</span>
          <span>{purchasedAt}</span>
        </div>

        <Separator className="my-4" />

        <ul className="space-y-2">
          {receipt.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <span className="truncate">{item.title}</span>
              <span className="shrink-0 text-muted-foreground">
                ${item.price.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>

        <Separator className="my-4" />

        <div className="flex items-center justify-between">
          <span className="font-medium">Total paid</span>
          <span className="text-lg font-bold">
            ${receipt.total.toFixed(2)}
          </span>
        </div>
      </div>

      <Button
        asChild
        className="mt-8"
        onClick={resetPurchase}
      >
        <Link to="/movies">
          Browse more movies
        </Link>
      </Button>
    </section>
  );
};

export default PurchaseSuccess;
