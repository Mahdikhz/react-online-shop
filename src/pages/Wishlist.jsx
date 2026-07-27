import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2, X } from "lucide-react";
import ProductImage from "../components/ProductImage";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";

function formatPrice(n) {
  return n.toLocaleString("fa-IR");
}

export default function Wishlist() {
  const { wishlist, toggleWishlist, addToCart, showToast } = useShop();

  const items = products.filter((p) => wishlist.includes(p.id));

  const addAllToCart = () => {
    items.forEach((p) => addToCart(p));
    showToast?.("همه محصولات به سبد خرید اضافه شدند.");
  };

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <Heart className="w-16 h-16 text-ink-500/25 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-ink-900 mb-2">
          لیست علاقه‌مندی‌ها خالی است
        </h1>
        <p className="text-ink-500 mb-6">
          محصولات مورد علاقه‌تان را با ضربه روی آیکون قلب ذخیره کنید.
        </p>
        <Link
          to="/products"
          className="inline-block bg-primary-600 text-white font-bold rounded-xl px-6 py-3 hover:bg-primary-700 transition-colors"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-black text-ink-900">
            لیست علاقه‌مندی‌ها
          </h1>
          <p className="text-ink-500 text-sm mt-1">
            {items.length.toLocaleString("fa-IR")} محصول ذخیره‌شده
          </p>
        </div>
        <button
          onClick={addAllToCart}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl px-4 py-2.5 text-sm transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          افزودن همه به سبد خرید
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
        {items.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl border border-ink-500/10 hover:shadow-soft transition-all overflow-hidden flex flex-col"
          >
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
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="حذف از علاقه‌مندی‌ها"
                className="absolute top-6 left-6 w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-ink-500 hover:text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-4 pb-4 flex flex-col flex-1">
              <div className="text-xs text-ink-500 mb-1">{product.brand}</div>
              <Link
                to={`/products/${product.id}`}
                className="font-bold text-sm text-ink-900 line-clamp-2 mb-2 hover:text-primary-600"
              >
                {product.title}
              </Link>

              <div className="mt-auto flex items-center justify-between gap-2">
                <span className="font-extrabold text-ink-900 text-sm">
                  {formatPrice(product.price)}{" "}
                  <span className="text-xs font-medium text-ink-500">
                    تومان
                  </span>
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => addToCart(product)}
                    aria-label="افزودن به سبد خرید"
                    className="w-9 h-9 rounded-lg bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                  {/* <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label="حذف از علاقه‌مندی‌ها"
                    className="w-9 h-9 rounded-lg border border-ink-500/15 hover:border-red-300 hover:text-red-500 text-ink-500 flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
