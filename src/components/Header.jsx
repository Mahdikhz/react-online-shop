import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  User,
  Search,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { categories } from "../data/products";
export default function Header() {
  const { cartCount, wishlist, user, theme, toggleTheme } = useShop();
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(
    () => setQuery(new URLSearchParams(location.search).get("q") || ""),
    [location.search],
  );
  const search = (e) => {
    e.preventDefault();
    const q = query.trim();
    navigate(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
    setMobileOpen(false);
  };
  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center gap-4 md:gap-8">
        <button className="md:hidden" onClick={() => setMobileOpen((x) => !x)}>
          {mobileOpen ? (
            <X className="w-6 h-6 text-ink-700" />
          ) : (
            <Menu className="w-6 h-6 text-ink-700" />
          )}
        </button>
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-black">
            SH
          </div>
          <div className="hidden sm:block leading-tight">
            <b className="text-lg text-ink-900">فروشگاه آنلاین شاهان</b>
            <div className="text-xs text-ink-500">
              فروشگاهی برای همه سلیقه‌ها
            </div>
          </div>
        </Link>
        <form onSubmit={search} className="hidden md:flex flex-1 max-w-xl">
          <div className="relative w-full">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="جستجوی محصول..."
              className="w-full rounded-xl border border-ink-500/15 bg-surface pr-4 pl-11 py-2.5 text-sm"
            />
            <button className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>
        <div className="flex items-center gap-2 md:gap-3 mr-auto">
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "حالت روشن" : "حالت تاریک"}
            className="w-11 h-11 rounded-xl bg-surface flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-ink-700" />
            )}
          </button>
          <Link
            to="/wishlist"
            className="relative w-11 h-11 rounded-xl bg-surface flex items-center justify-center"
          >
            <Heart className="w-5 h-5 text-ink-700" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -left-1 bg-accent text-white text-[10px] rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link
            to={user ? "/account" : "/login"}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-primary-600 text-primary-600 px-4 py-2.5 text-sm font-semibold"
          >
            <User className="w-4 h-4" />
            {user ? user.name : "ورود / ثبت نام"}
          </Link>
          <Link
            to="/cart"
            className="relative flex items-center gap-2 rounded-xl bg-primary-600 text-white px-4 py-2.5 text-sm font-semibold"
          >
            <ShoppingCart className="w-4 h-4" />
            <span className="hidden sm:inline">سبد خرید</span>
            {cartCount > 0 && (
              <span className="bg-white text-primary-700 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
      <form onSubmit={search} className="md:hidden px-4 pb-3">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجوی محصول..."
            className="w-full rounded-xl border border-ink-500/15 bg-surface pr-4 pl-11 py-2.5 text-sm"
          />
          <button className="absolute left-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-primary-600 text-white flex items-center justify-center">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </form>
      <nav className="hidden md:block border-t border-ink-500/10 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6 text-sm font-medium text-ink-700">
            <Link to="/products" className="text-primary-600 font-bold">
              مگا لیست منو
            </Link>
            {categories.slice(0, 6).map((c) => (
              <Link
                key={c.id}
                to={`/products?category=${c.id}`}
                className="hover:text-primary-600"
              >
                {c.label}
              </Link>
            ))}
          </div>
          <Link to="/products" className="text-sm font-semibold text-ink-700">
            همه محصولات
          </Link>
        </div>
      </nav>
      {mobileOpen && (
        <div className="md:hidden border-t border-ink-500/10 bg-white px-4 py-3 space-y-1">
          <Link
            to={user ? "/account" : "/login"}
            onClick={() => setMobileOpen(false)}
            className="block py-2 font-semibold text-primary-600"
          >
            {user ? "پنل کاربری" : "ورود / ثبت نام"}
          </Link>
          {categories.map((c) => (
            <Link
              key={c.id}
              to={`/products?category=${c.id}`}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-ink-700"
            >
              {c.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
