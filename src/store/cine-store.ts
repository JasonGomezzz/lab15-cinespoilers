import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { TmdbMovie, TmdbMovieDetail } from "@/types/tmdb";

/** Simulated fixed price (USD) charged per movie license. */
export const MOVIE_PRICE = 9.99;

export type SelectableMovie = TmdbMovie | TmdbMovieDetail;

export interface CartItem {
  id: number;
  title: string;
  posterPath: string | null;
  price: number;
}

export type PurchaseStatus = "idle" | "processing" | "success" | "error";

export interface PurchaseReceipt {
  orderId: string;
  items: CartItem[];
  total: number;
  purchasedAt: string;
}

interface CineState {
  // --- Selected movie -------------------------------------------------------
  selectedMovie: SelectableMovie | null;
  setSelectedMovie: (movie: SelectableMovie | null) => void;

  // --- Cart / purchase list -------------------------------------------------
  items: CartItem[];
  addToCart: (movie: SelectableMovie) => void;
  removeFromCart: (movieId: number) => void;
  clearCart: () => void;

  // --- Simulated purchase ---------------------------------------------------
  purchaseStatus: PurchaseStatus;
  purchaseError: string | null;
  lastReceipt: PurchaseReceipt | null;
  startPurchase: () => void;
  /** Turns the current cart into a receipt, empties the cart and returns it. */
  completePurchase: () => PurchaseReceipt | null;
  failPurchase: (message: string) => void;
  resetPurchase: () => void;
}

function toCartItem(movie: SelectableMovie): CartItem {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path,
    price: MOVIE_PRICE,
  };
}

function generateOrderId(): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `CS-${Date.now().toString(36).toUpperCase()}-${random}`;
}

export const useCineStore = create<CineState>()(
  persist(
    (set, get) => ({
      // --- Selected movie -----------------------------------------------------
      selectedMovie: null,
      setSelectedMovie: (movie) => set({ selectedMovie: movie }),

      // --- Cart / purchase list ----------------------------------------------
      items: [],
      addToCart: (movie) => {
        // A movie is a single license: ignore duplicates.
        if (get().items.some((item) => item.id === movie.id)) return;
        set((state) => ({ items: [...state.items, toCartItem(movie)] }));
      },
      removeFromCart: (movieId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== movieId),
        })),
      clearCart: () => set({ items: [] }),

      // --- Simulated purchase -------------------------------------------------
      purchaseStatus: "idle",
      purchaseError: null,
      lastReceipt: null,
      startPurchase: () =>
        set({ purchaseStatus: "processing", purchaseError: null }),
      completePurchase: () => {
        const { items } = get();
        if (items.length === 0) return null;

        const receipt: PurchaseReceipt = {
          orderId: generateOrderId(),
          items,
          total: items.reduce((sum, item) => sum + item.price, 0),
          purchasedAt: new Date().toISOString(),
        };

        set({
          purchaseStatus: "success",
          purchaseError: null,
          lastReceipt: receipt,
          items: [],
        });

        return receipt;
      },
      failPurchase: (message) =>
        set({ purchaseStatus: "error", purchaseError: message }),
      resetPurchase: () =>
        set({ purchaseStatus: "idle", purchaseError: null }),
    }),
    {
      name: "cinespoilers-cart",
      storage: createJSONStorage(() => localStorage),
      // Only the cart is durable; selection and purchase flow are transient.
      partialize: (state) => ({ items: state.items }),
    },
  ),
);

// --- Reusable selectors (keep components reactive to the right slice) --------

export const selectCartCount = (state: CineState) => state.items.length;

export const selectCartTotal = (state: CineState) =>
  state.items.reduce((sum, item) => sum + item.price, 0);

/** Selector factory: is a given movie already in the cart? */
export const selectIsInCart =
  (movieId: number) =>
  (state: CineState): boolean =>
    state.items.some((item) => item.id === movieId);
