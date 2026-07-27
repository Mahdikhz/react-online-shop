import { Link } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowLeft } from "lucide-react";
import ProductImage from "../components/ProductImage";
import QuantitySelector from "../components/QuantitySelector";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";

function formatPrice(n) {
  return n.toLocaleString("fa-IR");
}

export default function Cart() {
  const { cart, updateQty, removeFromCart } = useShop();

  const items = cart
    .map((item) => ({
      ...item,
      product: products.find((p) => p.id === item.id),
    }))
    .filter((i) => i.product);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const shipping = items.length ? (subtotal >= 50000000 ? 0 : 150000) : 0;
  const total = subtotal + shipping;

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-24 text-center">
        <ShoppingBag className="w-16 h-16 text-ink-500/30 mx-auto mb-4" />
        <h1 className="text-2xl font-black text-ink-900 mb-2">
          سبد خرید خالی است
        </h1>
        <p className="text-ink-500 mb-6">محصولی برای نمایش وجود ندارد.</p>
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
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-black text-ink-900 mb-6">سبد خرید</h1>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="space-y-4">
          {items.map(({ product, qty }) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-ink-500/10 p-4 flex items-center gap-4"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                <ProductImage product={product} iconClassName="w-9 h-9" />
              </div>

              <div className="flex-1 min-w-0">
                <Link
                  to={`/products/${product.id}`}
                  className="font-bold text-ink-900 text-sm sm:text-base hover:text-primary-600 line-clamp-2"
                >
                  {product.title}
                </Link>
                <div className="text-xs text-ink-500 mt-1">{product.brand}</div>
                <div className="font-extrabold text-ink-900 mt-2">
                  {formatPrice(product.price)}{" "}
                  <span className="text-xs font-medium text-ink-500">
                    تومان
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-end gap-3 shrink-0">
                <button
                  onClick={() => removeFromCart(product.id)}
                  className="flex items-center gap-1 text-xs font-bold text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  حذف
                </button>
                <QuantitySelector
                  value={qty}
                  onChange={(next) => updateQty(product.id, next)}
                  size="md"
                />
              </div>
            </div>
          ))}
        </div>

        <aside className="bg-white rounded-2xl border border-ink-500/10 p-6 lg:sticky lg:top-24">
          <h2 className="font-bold text-ink-900 mb-4">خلاصه سفارش</h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between text-ink-700">
              <span>جمع کالاها</span>
              <span>{formatPrice(subtotal)} تومان</span>
            </div>
            <div className="flex items-center justify-between text-ink-700">
              <span>هزینه ارسال</span>
              <span
                className={shipping === 0 ? "text-success font-semibold" : ""}
              >
                {shipping ? `${formatPrice(shipping)} تومان` : "رایگان"}
              </span>
            </div>
          </div>
          <div className="border-t border-ink-500/10 mt-5 pt-5 flex items-center justify-between font-extrabold text-ink-900">
            <span>مبلغ نهایی</span>
            <span className="text-xl text-primary-600">
              {formatPrice(total)} تومان
            </span>
          </div>
          <Link
            to="/checkout"
            className="mt-5 w-full bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2 transition-colors"
          >
            ادامه فرآیند خرید
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </aside>
      </div>
    </div>
  );
}
