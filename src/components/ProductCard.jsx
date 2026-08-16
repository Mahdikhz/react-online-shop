import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import ProductImage from "./ProductImage";
import { useShop } from "../context/ShopContext";

function formatPrice(n) {
  return n.toLocaleString("fa-IR");
}

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist } = useShop();
  const isWished = wishlist.includes(product.id);
  const discount = product.oldPrice
    ? Math.round(100 - (product.price / product.oldPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-2xl border border-ink-500/10 hover:shadow-soft hover:-translate-y-0.5 transition-all overflow-hidden flex flex-col">
      <div className="relative p-4">
        <Link
          to={`/products/${product.id}`}
          className="block aspect-square rounded-xl overflow-hidden"
        >
          <ProductImage
            product={product}
            iconClassName="w-16 h-16 sm:w-20 sm:h-20"
          />
        </Link>

        {discount && (
          <span
            className="absolute top-6 right-6 text-[11px] font-bold text-white px-2.5 py-1 rounded-lg bg-accent"
          >
            تخفیف
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="افزودن به علاقه‌مندی"
          className="absolute top-6 left-6 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center"
        >
          <Heart
            className={`w-4 h-4 ${isWished ? "fill-accent text-accent" : "text-ink-500"}`}
          />
        </button>
      </div>

      <div className="px-4 pb-4 flex flex-col flex-1">
        <div className="text-xs text-ink-500 mb-1">{product.brand}</div>
        <Link
          to={`/products/${product.id}`}
          className="font-bold text-sm sm:text-[15px] text-ink-900 line-clamp-1 mb-2 hover:text-primary-600"
        >
          {product.title}
        </Link>

        <div className="flex items-center gap-1 mb-3 text-xs text-ink-500">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-ink-700">{product.rating}</span>
          <span>({product.reviews.toLocaleString("fa-IR")})</span>
        </div>

        <div className="mt-auto">
          {product.oldPrice && (
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-ink-500 line-through">
                {formatPrice(product.oldPrice)}
              </span>
              <span className="text-[11px] font-bold text-accent">
                ٪{discount.toLocaleString("fa-IR")} تخفیف
              </span>
            </div>
          )}
          <div className="flex items-center justify-between gap-2">
            <span className="font-extrabold text-ink-900 text-sm sm:text-base">
              {formatPrice(product.price)}{" "}
              <span className="text-xs font-medium text-ink-500">تومان</span>
            </span>
            <button
              onClick={() => addToCart(product)}
              aria-label="افزودن به سبد خرید"
              className="w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors shrink-0"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
