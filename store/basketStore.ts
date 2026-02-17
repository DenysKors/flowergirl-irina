import { create } from "zustand";

import { BasketProduct, InitBasketState } from "@/types/types";

const initialState: InitBasketState = {
  products: [],
  totalPrice: 0,
};

type ProductState = typeof initialState & {
  addProduct: (product: BasketProduct) => void;
  removeProduct: (product: BasketProduct) => void;
  reset: () => void;
};

export const useBasketStore = create<ProductState>()((set) => ({
  ...initialState,
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
      totalPrice: state.totalPrice + product.price,
    })),
  removeProduct: (product) =>
    set((state) => ({
      products: state.products.filter((item) => item.code !== product.code),
      totalPrice: state.totalPrice - product.price,
    })),
  reset: () => {
    set(initialState);
  },
}));
