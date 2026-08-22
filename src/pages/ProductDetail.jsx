import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Star,
  ChevronLeft,
  Share2,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Check,
} from "lucide-react";
import ProductImage from "../components/ProductImage";
import QuantitySelector from "../components/QuantitySelector";
import ProductSection from "../components/ProductSection";
import { products } from "../data/products";
import { getSpecs, getReviews } from "../data/productDetailContent";
import { useShop } from "../context/ShopContext";

function formatPrice(n) {
  return n.toLocaleString("fa-IR");
}

const tabs = [
  { id: "description", label: "توضیحات" },
  { id: "specs", label: "مشخصات فنی" },
  { id: "reviews", label: "نظرات کاربران" },
];

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart, toggleWishlist, wishlist, showToast } = useShop();
  const product = products.find((p) => String(p.id) === id);
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [copied, setCopied] = useState(false);
  const gallery =
    product?.images && product.images.length > 1 ? product.images : null;
  const [activeImage, setActiveImage] = useState(
    gallery ? gallery[0] : undefined,
  );

  useEffect(() => {
    setActiveImage(gallery ? gallery[0] : undefined);
    setQty(1);
  }, [id]);

  if (!product) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <p className="text-ink-500 mb-4">محصول مورد نظر پیدا نشد.</p>
        <Link to="/products" className="text-primary-600 font-semibold">
          بازگشت به فروشگاه
        </Link>
      </div>
    );
  }

  const isWished = wishlist.includes(product.id);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 5);
  const specs = getSpecs(product);
  const reviews = getReviews(product);

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast?.("لینک محصول کپی شد.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast?.("کپی کردن لینک ممکن نشد.", "error");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex items-center gap-1.5 text-sm text-ink-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-primary-600">
          خانه
        </Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link to="/products" className="hover:text-primary-600">
          محصولات
        </Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <Link
          to={`/products?category=${product.category}`}
          className="hover:text-primary-600"
        >
          {product.brand}
        </Link>
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="text-ink-900 font-medium line-clamp-1">
          {product.title}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <div className="aspect-square max-w-[540px] mx-auto rounded-3xl overflow-hidden">
            {gallery ? (
              <ProductImage
                product={product}
                src={activeImage}
                iconClassName="w-32 h-32 sm:w-44 sm:h-44"
              />
            ) : (
              <ProductImage
                product={product}
                iconClassName="w-32 h-32 sm:w-44 sm:h-44"
              />
            )}
          </div>
          {gallery && (
            <div className="flex items-center gap-3 mt-4">
              {gallery.map((imgSrc, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgSrc)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-colors ${
                    activeImage === imgSrc
                      ? "border-primary-500"
                      : "border-transparent hover:border-primary-200"
                  }`}
                >
                  <ProductImage
                    product={product}
                    src={imgSrc}
                    iconClassName="w-6 h-6"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-sm text-primary-600 font-semibold">
              {product.brand}
            </span>
            <span className="flex items-center gap-1 text-xs font-bold text-success bg-emerald-50 px-2.5 py-1 rounded-full">
              <CheckCircle2 className="w-3.5 h-3.5" /> موجود در انبار
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-ink-900 mb-3">
            {product.title}
          </h1>

          <div className="flex items-center gap-3 mb-5 text-sm">
            <div className="flex items-center gap-1 text-amber-500 font-semibold">
              <Star className="w-4 h-4 fill-amber-400" /> {product.rating}
            </div>
            <button
              onClick={() => setActiveTab("reviews")}
              className="text-ink-500 hover:text-primary-600 hover:underline"
            >
              ({product.reviews.toLocaleString("fa-IR")} نظر)
            </button>
          </div>

          <div className="mb-6">
            {product.oldPrice && (
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm text-ink-500 line-through">
                  {formatPrice(product.oldPrice)} تومان
                </span>
                <span className="text-xs font-bold text-accent bg-orange-50 px-2 py-0.5 rounded-full">
                  ٪
                  {Math.round(
                    100 - (product.price / product.oldPrice) * 100,
                  ).toLocaleString("fa-IR")}{" "}
                  تخفیف
                </span>
              </div>
            )}
            <div className="text-3xl font-black text-ink-900">
              {formatPrice(product.price)}{" "}
              <span className="text-base font-medium text-ink-500">تومان</span>
            </div>
          </div>

          <p className="text-ink-700 leading-7 mb-20 text-sm sm:text-base">
            {product.title} با کیفیت ساخت عالی و گارانتی اصالت کالا، آماده ارسال
            به سراسر کشور است. این محصول یکی از پرطرفدارترین کالاهای دسته{" "}
            {product.brand} در فروشگاه شاهان می‌باشد.
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-semibold text-ink-700">تعداد:</span>
            <QuantitySelector
              value={qty}
              onChange={setQty}
              size="md"
              max={10}
            />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl py-3.5 transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              افزودن به سبد خرید
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="علاقه‌مندی"
              className="w-14 h-14 rounded-xl border border-ink-500/15 flex items-center justify-center shrink-0 hover:border-accent transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${isWished ? "fill-accent text-accent" : "text-ink-500"}`}
              />
            </button>
            <button
              onClick={handleShare}
              aria-label="اشتراک‌گذاری"
              className="w-14 h-14 rounded-xl border border-ink-500/15 flex items-center justify-center shrink-0 hover:border-primary-300 transition-colors"
            >
              {copied ? (
                <Check className="w-5 h-5 text-success" />
              ) : (
                <Share2 className="w-5 h-5 text-ink-500" />
              )}
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center border-t border-ink-500/10 pt-5">
            <div className="flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-5 h-5 text-primary-600" />
              <span className="text-xs text-ink-500">اصالت کالا</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <Truck className="w-5 h-5 text-primary-600" />
              <span className="text-xs text-ink-500">ارسال سریع</span>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <RotateCcw className="w-5 h-5 text-primary-600" />
              <span className="text-xs text-ink-500">۷ روز ضمانت بازگشت</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex items-center gap-2 border-b border-ink-500/10 mb-6 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors ${
                activeTab === t.id
                  ? "border-primary-600 text-primary-600"
                  : "border-transparent text-ink-500 hover:text-ink-900"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === "description" && (
          <div className="bg-white rounded-2xl border border-ink-500/10 p-6 text-sm sm:text-base leading-7 text-ink-700">
            {product.title} یکی از محبوب‌ترین محصولات برند {product.brand} است
            که با توجه به کیفیت ساخت بالا و طراحی مدرن، انتخابی مطمئن برای خرید
            محسوب می‌شود. این محصول دارای گارانتی اصالت کالا و پشتیبانی کامل
            فروشگاه آنلاین شاهان است و آماده ارسال سریع به سراسر کشور می‌باشد.
          </div>
        )}

        {activeTab === "specs" && (
          <div className="bg-white rounded-2xl border border-ink-500/10 divide-y divide-ink-500/10">
            {specs.map((spec) => (
              <div
                key={spec.label}
                className="flex items-center justify-between gap-4 px-6 py-3.5 text-sm"
              >
                <span className="text-ink-500">{spec.label}</span>
                <span className="font-semibold text-ink-900">{spec.value}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === "reviews" && (
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-ink-500/10 p-6 flex items-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="text-4xl font-black text-ink-900">
                  {product.rating}
                </div>
                <div className="flex items-center gap-0.5 justify-center mt-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-ink-500/20"}`}
                    />
                  ))}
                </div>
                <div className="text-xs text-ink-500 mt-1">
                  {product.reviews.toLocaleString("fa-IR")} نظر
                </div>
              </div>
            </div>

            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-2xl border border-ink-500/10 p-5"
              >
                <div className="flex items-center justify-between gap-3 mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-sm">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-semibold text-sm text-ink-900">
                        {review.name}
                      </div>
                      <div className="text-xs text-ink-500">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? "fill-amber-400 text-amber-400" : "text-ink-500/20"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-ink-700 leading-6">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div className="mt-14">
          <ProductSection
            title="محصولات مرتبط"
            products={related}
            viewAllHref={`/products?category=${product.category}`}
          />
        </div>
      )}
    </div>
  );
}
