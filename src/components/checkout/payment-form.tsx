import { useState } from "react";
import type { ChangeEvent, FormEvent, ReactNode } from "react";

import { CreditCard, Loader2, Lock } from "lucide-react";

import {
  formatCardNumber,
  formatExpiry,
  onlyDigits,
  validateCardForm,
} from "@/lib/card-validation";
import type { CardFormErrors, CardFormValues } from "@/lib/card-validation";
import { selectCartTotal, useCineStore } from "@/store/cine-store";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const INITIAL_VALUES: CardFormValues = {
  cardholder: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

/** Simulated gateway latency before the "charge" resolves. */
const PROCESSING_MS = 1500;

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function Field({ id, label, error, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="text-sm font-medium"
      >
        {label}
      </label>

      <div className="mt-2">{children}</div>

      {error ? (
        <p className="mt-1 text-sm text-destructive">{error}</p>
      ) : null}
    </div>
  );
}

const PaymentForm = () => {
  const [values, setValues] = useState<CardFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<CardFormErrors>({});

  const total = useCineStore(selectCartTotal);
  const isProcessing = useCineStore(
    (state) => state.purchaseStatus === "processing",
  );
  const startPurchase = useCineStore((state) => state.startPurchase);
  const completePurchase = useCineStore((state) => state.completePurchase);

  const setField =
    (field: keyof CardFormValues, formatter?: (value: string) => string) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const raw = event.target.value;
      const next = formatter ? formatter(raw) : raw;
      setValues((prev) => ({ ...prev, [field]: next }));
    };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isProcessing) return;

    const validationErrors = validateCardForm(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    startPurchase();
    // Simulated processing — no real payment provider is contacted.
    window.setTimeout(() => {
      completePurchase();
    }, PROCESSING_MS);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-lg border bg-card p-6"
    >
      <div className="flex items-center gap-2">
        <CreditCard className="h-5 w-5 text-blue-600" />
        <h2 className="text-lg font-semibold">Payment details</h2>
      </div>

      <p className="mt-1 text-sm text-muted-foreground">
        Simulated checkout — use a test card like{" "}
        <span className="font-mono">4242 4242 4242 4242</span>.
      </p>

      <fieldset
        disabled={isProcessing}
        className="mt-6 space-y-4"
      >
        <Field
          id="cardholder"
          label="Cardholder name"
          error={errors.cardholder}
        >
          <Input
            id="cardholder"
            value={values.cardholder}
            onChange={setField("cardholder")}
            placeholder="Jane Doe"
            autoComplete="cc-name"
            aria-invalid={Boolean(errors.cardholder)}
          />
        </Field>

        <Field
          id="card-number"
          label="Card number"
          error={errors.cardNumber}
        >
          <Input
            id="card-number"
            value={values.cardNumber}
            onChange={setField("cardNumber", formatCardNumber)}
            placeholder="1234 5678 9012 3456"
            inputMode="numeric"
            autoComplete="cc-number"
            aria-invalid={Boolean(errors.cardNumber)}
          />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field
            id="expiry"
            label="Expiry (MM/YY)"
            error={errors.expiry}
          >
            <Input
              id="expiry"
              value={values.expiry}
              onChange={setField("expiry", formatExpiry)}
              placeholder="MM/YY"
              inputMode="numeric"
              autoComplete="cc-exp"
              aria-invalid={Boolean(errors.expiry)}
            />
          </Field>

          <Field
            id="cvv"
            label="CVV"
            error={errors.cvv}
          >
            <Input
              id="cvv"
              value={values.cvv}
              onChange={setField("cvv", (value) => onlyDigits(value).slice(0, 4))}
              placeholder="123"
              inputMode="numeric"
              autoComplete="cc-csc"
              aria-invalid={Boolean(errors.cvv)}
            />
          </Field>
        </div>
      </fieldset>

      <Button
        type="submit"
        size="lg"
        className="mt-6 w-full"
        disabled={isProcessing}
      >
        {isProcessing ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="h-4 w-4" />
            Pay ${total.toFixed(2)}
          </>
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
