"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";

export type CartItem = {
  productId: number;
  variantId: number | null;
  name: string;
  slug: string;
  price: number;
  image: string | null;
  size: string | null;
  color: string | null;
  qty: number;
};

type State = { items: CartItem[] };

type Action =
  | { type: "add"; item: CartItem }
  | { type: "remove"; key: string }
  | { type: "qty"; key: string; qty: number }
  | { type: "clear" }
  | { type: "hydrate"; items: CartItem[] };

const keyOf = (i: { productId: number; variantId: number | null }) =>
  `${i.productId}:${i.variantId ?? "base"}`;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { items: action.items };
    case "add": {
      const k = keyOf(action.item);
      const existing = state.items.find((i) => keyOf(i) === k);
      if (existing) {
        return {
          items: state.items.map((i) =>
            keyOf(i) === k ? { ...i, qty: i.qty + action.item.qty } : i
          ),
        };
      }
      return { items: [...state.items, action.item] };
    }
    case "remove":
      return { items: state.items.filter((i) => keyOf(i) !== action.key) };
    case "qty":
      return {
        items: state.items.map((i) =>
          keyOf(i) === action.key ? { ...i, qty: Math.max(1, action.qty) } : i
        ),
      };
    case "clear":
      return { items: [] };
    default:
      return state;
  }
}

type CartCtx = {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  keyOf: typeof keyOf;
};

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "silora_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  // Load once on mount (client only — safe outside artifact sandbox)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) dispatch({ type: "hydrate", items: JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  // Persist on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      /* ignore quota / private mode */
    }
  }, [state.items]);

  const count = state.items.reduce((n, i) => n + i.qty, 0);
  const subtotal = state.items.reduce((n, i) => n + i.qty * i.price, 0);

  return (
    <Ctx.Provider
      value={{
        items: state.items,
        add: (item) => dispatch({ type: "add", item }),
        remove: (key) => dispatch({ type: "remove", key }),
        setQty: (key, qty) => dispatch({ type: "qty", key, qty }),
        clear: () => dispatch({ type: "clear" }),
        count,
        subtotal,
        keyOf,
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
