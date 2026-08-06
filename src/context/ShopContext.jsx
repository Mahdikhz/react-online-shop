import { createContext, useContext, useEffect, useMemo, useState } from "react";

const ShopContext = createContext(null);

const readStorage = (key, fallback) => {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
};

export function ShopProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("shahan-cart", []));
  const [wishlist, setWishlist] = useState(() =>
    readStorage("shahan-wishlist", []),
  );
  const [user, setUserState] = useState(() => readStorage("shahan-user", null));
  const [orders, setOrders] = useState(() => readStorage("shahan-orders", []));
  const [addresses, setAddresses] = useState(() =>
    readStorage("shahan-addresses", []),
  );
  const [theme, setTheme] = useState(() =>
    readStorage("shahan-theme", "light"),
  );
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", theme === "dark");
    try {
      localStorage.setItem("shahan-theme", JSON.stringify(theme));
    } catch {}
  }, [theme]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const persist = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {}
  };

  const updateCart = (fn) =>
    setCart((prev) => {
      const next = fn(prev);
      persist("shahan-cart", next);
      return next;
    });

  const updateWishlist = (fn) =>
    setWishlist((prev) => {
      const next = fn(prev);
      persist("shahan-wishlist", next);
      return next;
    });

  const updateAddresses = (fn) =>
    setAddresses((prev) => {
      const next = fn(prev);
      persist("shahan-addresses", next);
      return next;
    });

  const setUser = (next) => {
    setUserState(next);
    try {
      if (next) localStorage.setItem("shahan-user", JSON.stringify(next));
      else localStorage.removeItem("shahan-user");
    } catch {}
  };

  const updateUser = (patch) => {
    setUserState((prev) => {
      const next = { ...prev, ...patch };
      persist("shahan-user", next);
      return next;
    });
  };

  const addToCart = (product) => {
    updateCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      return existing
        ? prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...prev, { id: product.id, qty: 1 }];
    });
    setToast({
      type: "success",
      message: `«${product.title}» به سبد خرید اضافه شد.`,
    });
  };

  const removeFromCart = (id) =>
    updateCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id, qty) =>
    updateCart((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );

  const toggleWishlist = (id) =>
    updateWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const addOrder = (order) =>
    setOrders((prev) => {
      const next = [order, ...prev];
      persist("shahan-orders", next);
      return next;
    });

  const clearCart = () => updateCart(() => []);

  const addAddress = (address) => {
    const withId = { ...address, id: address.id || `addr-${Date.now()}` };
    updateAddresses((prev) => {
      const next = [...prev, withId];
      return prev.length === 0
        ? next.map((a) => ({ ...a, isDefault: a.id === withId.id }))
        : next;
    });
    return withId;
  };

  const updateAddress = (id, patch) =>
    updateAddresses((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...patch } : a)),
    );

  const removeAddress = (id) =>
    updateAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length && !next.some((a) => a.isDefault))
        next[0].isDefault = true;
      return next;
    });

  const setDefaultAddress = (id) =>
    updateAddresses((prev) =>
      prev.map((a) => ({ ...a, isDefault: a.id === id })),
    );

  const cartCount = useMemo(
    () => cart.reduce((sum, i) => sum + i.qty, 0),
    [cart],
  );

  const logout = () => setUser(null);

  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    cartCount,
    wishlist,
    toggleWishlist,
    user,
    setUser,
    updateUser,
    logout,
    orders,
    addOrder,
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
    theme,
    toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
    toast,
    showToast: (message, type = "success") => setToast({ message, type }),
    closeToast: () => setToast(null),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used within ShopProvider");
  return ctx;
}
