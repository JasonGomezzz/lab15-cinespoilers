import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import PageContainer from "@/components/layout/page-container";
import OrderSummary from "@/components/checkout/order-summary";
import PaymentForm from "@/components/checkout/payment-form";
import PurchaseSuccess from "@/components/checkout/purchase-success";
import { useCineStore } from "@/store/cine-store";

import { Button } from "@/components/ui/button";

const CheckoutPage = () => {
  const items = useCineStore((state) => state.items);
  const purchaseStatus = useCineStore((state) => state.purchaseStatus);
  const lastReceipt = useCineStore((state) => state.lastReceipt);

  // Just completed a purchase (cart was emptied) → show the confirmation.
  if (purchaseStatus === "success" && lastReceipt && items.length === 0) {
    return (
      <PageContainer>
        <PurchaseSuccess receipt={lastReceipt} />
      </PageContainer>
    );
  }

  if (items.length === 0) {
    return (
      <PageContainer>
        <section className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <ShoppingCart className="h-12 w-12 text-muted-foreground" />

          <h1 className="mt-6 text-3xl font-bold tracking-tight">
            Your cart is empty
          </h1>

          <p className="mt-3 max-w-md text-muted-foreground">
            Add a movie to your cart to start a simulated purchase.
          </p>

          <Button
            asChild
            className="mt-8"
          >
            <Link to="/movies">
              Browse movies
            </Link>
          </Button>
        </section>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="py-10">
        <h1 className="text-3xl font-bold tracking-tight">
          Checkout
        </h1>

        <p className="mt-2 text-muted-foreground">
          Review your order and complete the simulated payment.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <PaymentForm />
          <OrderSummary />
        </div>
      </div>
    </PageContainer>
  );
};

export default CheckoutPage;
