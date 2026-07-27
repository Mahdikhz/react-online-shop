import { Link } from "react-router-dom";
import DynamicIcon from "./DynamicIcon";
import { categories } from "../data/products";

export default function CategorySection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-ink-900">
            دسته‌بندی محصولات
          </h2>
          <p className="text-ink-500 text-sm mt-1">
            آنچه نیاز دارید را سریع‌تر پیدا کنید
          </p>
        </div>
        <Link
          to="/products"
          className="text-sm font-semibold text-primary-600 hover:underline hidden sm:block"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((c) => (
          <Link
            key={c.id}
            to={`/products?category=${c.id}`}
            className="group flex flex-col items-center gap-2 sm:gap-3 bg-white rounded-2xl border border-ink-500/10 py-5 px-2 hover:border-primary-300 hover:shadow-soft transition-all"
          >
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary-50 text-primary-600 group-hover:bg-primary-600 group-hover:text-white flex items-center justify-center transition-colors">
              <DynamicIcon
                name={c.icon}
                className="w-6 h-6 sm:w-7 sm:h-7"
                strokeWidth={1.6}
              />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-ink-700 text-center">
              {c.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
