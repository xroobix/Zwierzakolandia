import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CartProduct } from '../types/products';

interface CartState {
  cart: CartProduct[];
  totalItems: () => number;
  totalPrice: () => number;
  totalSavings: () => number;
  addToCart: (product: CartProduct) => void;
  removeFromCart: (product: CartProduct) => void;
  setQuantity: (product: CartProduct, productQuantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>()(
  devtools(
    persist(
      (set, get) => ({
        cart: [],
        totalItems: () => {
            const cart = get().cart;
            let updatedTotalItems = 0;
            cart.map((item) => {
                updatedTotalItems += item.quantity;
            })
            return updatedTotalItems;
        },
        totalPrice: () => {
            const cart = get().cart;
            let updatedTotalPrice = 0;
            cart.map((item) => {
                item.discountedPrice ? updatedTotalPrice += item.discountedPrice * item.quantity : updatedTotalPrice += item.price * item.quantity;
            })
            return updatedTotalPrice;
        },
        totalSavings: ()=> {
          const cart = get().cart;
          let updatedTotalSavings = 0;
          cart.map((item) => {
            if (item.discountedPrice) updatedTotalSavings += (item.price - item.discountedPrice) * item.quantity;
          })
          return updatedTotalSavings;
      },
        addToCart: (product) => {
          const cart = get().cart;
          const cartItem = cart.find((item) => item['product-number'] === product['product-number']);
          if (cartItem) {
            const updatedCart = cart.map((item) =>
              item['product-number'] === product['product-number'] ? { ...item, quantity: item.quantity + product.quantity } : item
            );
            set({ cart: updatedCart });
          } else {
            set({ cart: [...cart, product] });
          }
        },
        removeFromCart: (product) =>
          set((state) => ({
            cart: state.cart.filter((p) => p['product-number'] !== product['product-number']),
          })),
        setQuantity: (product, productQuantity) => set((state) => ({
            cart: state.cart.map((item) => (item['product-number'] === product['product-number'] ? {...item, quantity: productQuantity } : item))
        })),
        clearCart: () => set({ cart: [] }),
      }),
      { name: 'cart-storage' }
    )
  )
);

export default useCartStore;
