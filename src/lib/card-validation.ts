export interface CardFormValues {
  cardholder: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export type CardFormErrors = Partial<Record<keyof CardFormValues, string>>;

/** Strips everything that is not a digit. */
export function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Formats a raw card number into groups of 4 (max 16 digits): "1234 5678 9012 3456". */
export function formatCardNumber(value: string): string {
  const digits = onlyDigits(value).slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

/** Formats an expiry into "MM/YY" as the user types. */
export function formatExpiry(value: string): string {
  const digits = onlyDigits(value).slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

/** Luhn checksum — the standard sanity check for card numbers. */
export function luhnCheck(cardNumber: string): boolean {
  const digits = onlyDigits(cardNumber);
  if (digits.length === 0) return false;

  let sum = 0;
  let double = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);

    if (double) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    double = !double;
  }

  return sum % 10 === 0;
}

/** True when `expiry` (MM/YY) is a valid month that has not already passed. */
export function isExpiryValid(expiry: string, now: Date = new Date()): boolean {
  const match = /^(\d{2})\/(\d{2})$/.exec(expiry);
  if (!match) return false;

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  if (month < 1 || month > 12) return false;

  // Card is valid through the last moment of its expiry month.
  const expiresAt = new Date(year, month, 0, 23, 59, 59, 999);
  return expiresAt.getTime() >= now.getTime();
}

/** Runs basic validation over the whole card form; returns a per-field error map. */
export function validateCardForm(
  values: CardFormValues,
  now: Date = new Date(),
): CardFormErrors {
  const errors: CardFormErrors = {};

  if (values.cardholder.trim().length < 3) {
    errors.cardholder = "Enter the cardholder name.";
  }

  const numberDigits = onlyDigits(values.cardNumber);
  if (numberDigits.length !== 16) {
    errors.cardNumber = "Card number must have 16 digits.";
  } else if (!luhnCheck(numberDigits)) {
    errors.cardNumber = "Invalid card number.";
  }

  if (!isExpiryValid(values.expiry, now)) {
    errors.expiry = "Enter a valid, non-expired date (MM/YY).";
  }

  if (!/^\d{3,4}$/.test(values.cvv)) {
    errors.cvv = "CVV must have 3 or 4 digits.";
  }

  return errors;
}
