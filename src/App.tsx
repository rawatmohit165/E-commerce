import { useState , useEffect } from "react";
import Navbar from "./components/Navbar";
import "./index.css";
import HomePage   from "./pages/HomePage.tsx"
import CartPage from "./pages/CartPage.tsx"
import type { CartItem, CartProps, Page, Product } from "./types";

export default function App() {
  const [page, setPage] = useState<Page>("home");
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product: Product) => {
    setCart((prev: CartItem[]) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const increment = (id: number) =>
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)),
    );

  const decrement = (id: number) =>
    setCart((prev) =>
      prev.map((i) =>
        i.id === id ? { ...i, qty: i.qty - 1 } : i,
      ).filter((i) => i.qty > 0),
    );

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0);

  const cartProps: CartProps = {
    cart,
    addToCart,
    removeFromCart,
    increment,
    decrement,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <>
      <Navbar currentPage={page} setPage={setPage} totalItems={totalItems} />
      <main>
        {page === "home" && (
          <HomePage setPage={setPage} cartProps={cartProps} />
        )}
        {page === "cart" && (
          <CartPage cartProps={cartProps} setPage={setPage} />
        )}
      </main>
    </>
  );
}
