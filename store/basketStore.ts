import { create } from "zustand";

import { BasketProduct, InitBasketState } from "@/types/types";

const initialState: InitBasketState = {
  products: [],
  totalPrice: 0,
};

type ProductState = typeof initialState & {
  addProduct: (product: BasketProduct) => void;
  removeProduct: (product: BasketProduct) => void;
  increaseUserQty: (id: number, userQty: number) => void;
  decreaseUserQty: (id: number, userQty: number) => void;
  reset: () => void;
};

export const useBasketStore = create<ProductState>()((set, get) => ({
  ...initialState,
  addProduct: (product) =>
    set((state) => ({
      products: [...state.products, product],
      totalPrice: state.totalPrice + product.sumPrice,
    })),
  removeProduct: (product) =>
    set((state) => ({
      products: state.products.filter((item) => item.id !== product.id),
      totalPrice: state.totalPrice - product.sumPrice,
    })),
  increaseUserQty: (id, userQty) => {
    const products = get().products;
    const updatedProducts = products?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          userQty: userQty + 1,
          sumPrice: item.price * (userQty + 1),
        };
      } else {
        return item;
      }
    });
    const updatedTotalPrice = updatedProducts.reduce((prev, item) => {
      return prev + item.sumPrice;
    }, 0);
    set(() => ({
      products: updatedProducts,
      totalPrice: updatedTotalPrice,
    }));
  },
  decreaseUserQty: (id, userQty) => {
    const products = get().products;
    const updatedProducts = products?.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          userQty: userQty - 1,
          sumPrice: item.price * (userQty - 1),
        };
      } else {
        return item;
      }
    });
    const updatedTotalPrice = updatedProducts.reduce((prev, item) => {
      return prev + item.sumPrice;
    }, 0);
    set(() => ({
      products: updatedProducts,
      totalPrice: updatedTotalPrice,
    }));
  },
  reset: () => {
    set(initialState);
  },
}));
