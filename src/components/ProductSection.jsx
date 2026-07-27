import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  subtitle,
  products,
  viewAllHref = "/products",
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-ink-900">
            {title}
          </h2>
          {subtitle && <p className="text-ink-500 text-sm mt-1">{subtitle}</p>}
        </div>
        <Link
          to={viewAllHref}
          className="text-sm font-semibold text-primary-600 hover:underline hidden sm:block"
        >
          مشاهده همه
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
