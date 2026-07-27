import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Star, ChevronDown } from "lucide-react";
import ProductCard from "../components/ProductCard";
import DynamicIcon from "../components/DynamicIcon";
import { products, categories, brands } from "../data/products";
import { useShop } from "../context/ShopContext";
const MAX = 120000000;
export default function Products() {
  const [params, setParams] = useSearchParams();
  const { wishlist } = useShop();
  const [query, setQuery] = useState("");
  const [cats, setCats] = useState([]);
  const [brand, setBrand] = useState([]);
  const [max, setMax] = useState(MAX);
  const [rating, setRating] = useState(0);
  const [discount, setDiscount] = useState(false);
  const [sort, setSort] = useState("popular");
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    setQuery(params.get("q") || "");
    setCats((params.get("category") || "").split(",").filter(Boolean));
    setBrand((params.get("brand") || "").split(",").filter(Boolean));
    setMax(Number(params.get("maxPrice")) || MAX);
    setRating(Number(params.get("rating")) || 0);
    setDiscount(params.get("discount") === "1");
    setSort(params.get("sort") || "popular");
  }, [params]);
  const patch = (obj) => {
    const n = new URLSearchParams(params);
    Object.entries(obj).forEach(([k, v]) => {
      const del =
        v === "" ||
        v === false ||
        v == null ||
        (Array.isArray(v) && !v.length) ||
        (k === "maxPrice" && v === MAX) ||
        (k === "rating" && v === 0) ||
        (k === "sort" && v === "popular");
      if (del) n.delete(k);
      else n.set(k, Array.isArray(v) ? v.join(",") : String(v));
    });
    setParams(n);
  };
  const filtered = useMemo(() => {
    let l = products.filter((p) => {
      const q = query.trim().toLowerCase();
      if (params.get("wishlist") === "1" && !wishlist.includes(p.id))
        return false;
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.brand.toLowerCase().includes(q)
      )
        return false;
      if (cats.length && !cats.includes(p.category)) return false;
      if (brand.length && !brand.includes(p.brand)) return false;
      if (p.price > max || p.rating < rating) return false;
      if (discount && (!p.oldPrice || p.oldPrice <= p.price)) return false;

      return true;
    });
    if (sort === "cheapest") l.sort((a, b) => a.price - b.price);
    else if (sort === "expensive") l.sort((a, b) => b.price - a.price);
    else if (sort === "discount")
      l.sort(
        (a, b) =>
          (b.oldPrice ? 1 - b.price / b.oldPrice : 0) -
          (a.oldPrice ? 1 - a.price / a.oldPrice : 0),
      );
    else if (sort === "newest") l.sort((a, b) => b.id - a.id);
    else l.sort((a, b) => b.reviews - a.reviews);
    return l;
  }, [query, cats, brand, max, rating, discount, sort, params, wishlist]);
  const filters = (
    <div className="space-y-6">
      <div>
        <h3 className="font-bold text-ink-900 mb-3">دسته‌بندی</h3>
        {categories.map((c) => (
          <label
            key={c.id}
            className="flex items-center gap-2.5 cursor-pointer text-sm mb-2"
          >
            <input
              type="checkbox"
              checked={cats.includes(c.id)}
              onChange={() =>
                patch({
                  category: cats.includes(c.id)
                    ? cats.filter((x) => x !== c.id)
                    : [...cats, c.id],
                })
              }
            />
            <DynamicIcon name={c.icon} className="w-4 h-4 text-ink-500" />
            <span className="text-ink-700">{c.label}</span>
          </label>
        ))}
      </div>
      <div className="border-t border-ink-500/10 pt-5">
        <h3 className="font-bold mb-3">برند</h3>
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() =>
                patch({
                  brand: brand.includes(b)
                    ? brand.filter((x) => x !== b)
                    : [...brand, b],
                })
              }
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${brand.includes(b) ? "bg-primary-600 text-white border-primary-600" : "border-ink-500/15 text-ink-700"}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>
      <div className="border-t border-ink-500/10 pt-5">
        <h3 className="font-bold mb-3">حداکثر قیمت</h3>
        <input
          type="range"
          min="0"
          max={MAX}
          step="500000"
          value={max}
          onChange={(e) => patch({ maxPrice: Number(e.target.value) })}
          className="w-full accent-primary-600"
        />
        <div className="text-xs text-ink-500 mt-1">
          تا {max.toLocaleString("fa-IR")} تومان
        </div>
      </div>
      <div className="border-t border-ink-500/10 pt-5">
        <h3 className="font-bold mb-3">حداقل امتیاز</h3>
        <div className="flex gap-2 flex-wrap">
          {[0, 3, 4, 4.5].map((r) => (
            <button
              key={r}
              onClick={() => patch({ rating: r })}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border ${rating === r ? "bg-primary-600 text-white" : "border-ink-500/15 text-ink-700"}`}
            >
              {r === 0 ? (
                "همه"
              ) : (
                <>
                  <Star className="inline w-3 h-3 fill-current" /> {r}+
                </>
              )}
            </button>
          ))}
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={discount}
          onChange={(e) =>
            patch({
              discount: e.target.checked ? "1" : "",
            })
          }
        />
        <span>فقط کالاهای تخفیف‌دار</span>
      </label>
      <button
        onClick={() =>
          setParams(params.get("wishlist") === "1" ? { wishlist: "1" } : {})
        }
        className="w-full text-sm font-semibold text-primary-600 border border-primary-200 rounded-xl py-2.5"
      >
        حذف همه فیلترها
      </button>
    </div>
  );
  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-black">
          {params.get("wishlist") === "1"
            ? "لیست علاقه‌مندی‌ها"
            : "جستجو و فیلتر محصولات"}
        </h1>
        <p className="text-ink-500 text-sm mt-1">
          {filtered.length.toLocaleString("fa-IR")} محصول یافت شد
        </p>
      </div>
      <div className="mb-6 max-w-xl">
        <input
          value={query}
          onChange={(e) => patch({ q: e.target.value })}
          placeholder="جستجو در محصولات..."
          className="w-full rounded-xl border border-ink-500/15 bg-white px-4 py-3 text-sm"
        />
      </div>
      <div className="flex gap-8">
        <aside className="hidden lg:block w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-ink-500/10 p-5 sticky top-24">
            {filters}
          </div>
        </aside>
        <div className="flex-1">
          <div className="flex justify-between mb-5">
            <button
              onClick={() => setMobile(true)}
              className="lg:hidden flex gap-2 bg-white border border-ink-500/15 rounded-xl px-4 py-2.5"
            >
              <SlidersHorizontal className="w-4 h-4" />
              فیلترها
            </button>
            <div className="relative mr-auto">
              <select
                value={sort}
                onChange={(e) => patch({ sort: e.target.value })}
                className="appearance-none bg-white border border-ink-500/15 rounded-xl pr-4 pl-9 py-2.5 text-sm"
              >
                <option value="popular">محبوب‌ترین</option>
                <option value="cheapest">ارزان‌ترین</option>
                <option value="expensive">گران‌ترین</option>
                <option value="discount">بیشترین تخفیف</option>
                <option value="newest">جدیدترین</option>
              </select>
              <ChevronDown className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4" />
            </div>
          </div>
          {filtered.length ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl py-20 text-center text-ink-500">
              محصولی مطابق فیلترهای شما پیدا نشد.
            </div>
          )}
        </div>
      </div>
      {mobile && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobile(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white p-5 overflow-y-auto">
            <button onClick={() => setMobile(false)} className="mb-5">
              بستن ×
            </button>
            {filters}
          </div>
        </div>
      )}
    </div>
  );
}
