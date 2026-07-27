import Hero from "../components/Hero";
import BrandsAndFeatures from "../components/BrandsAndFeatures";
import CategorySection from "../components/CategorySection";
import ProductSection from "../components/ProductSection";
import { products } from "../data/products";

export default function Home() {
  const bestSellers = products.filter((p) => p.badge === "پرفروش");
  const discounted = products.filter((p) => p.oldPrice);
  const newest = [...products].reverse().slice(0, 5);

  return (
    <>
      <Hero />
      <BrandsAndFeatures />
      <CategorySection />
      <ProductSection
        title="پرفروش‌ترین‌ها"
        subtitle="محصولاتی که کاربران بیشتر انتخاب کرده‌اند"
        products={bestSellers}
      />
      <ProductSection
        title="تخفیف‌های ویژه"
        subtitle="فرصت محدود، همین حالا سفارش دهید"
        products={discounted}
        viewAllHref="/products?sort=discount"
      />
      <ProductSection
        title="تازه‌های فروشگاه"
        subtitle="جدیدترین محصولات اضافه‌شده"
        products={newest}
        viewAllHref="/products?sort=newest"
      />
    </>
  );
}
