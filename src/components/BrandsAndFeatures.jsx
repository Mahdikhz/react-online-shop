import {
  ShieldCheck,
  Headset,
  Truck,
  BadgePercent,
  RotateCcw,
} from "lucide-react";

const brands = ["LG", "Canon", "Lenovo", "iPhone", "SAMSUNG", "XIAOMI"];

const features = [
  { icon: ShieldCheck, title: "اصالت کالا", desc: "تضمین اصالت کالا" },
  { icon: Headset, title: "پشتیبانی عالی", desc: "۲۴ ساعته شبانه روز" },
  { icon: Truck, title: "ارسال سریع", desc: "امن و مطمئن" },
  { icon: BadgePercent, title: "تضمین قیمت", desc: "کمترین قیمت بازار" },
  { icon: RotateCcw, title: "ضمانت بازگشت وجه", desc: "در صورت عدم رضایت" },
];

export default function BrandsAndFeatures() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 space-y-10">
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4">
        {brands.map((b) => (
          <div
            key={b}
            className="rounded-2xl bg-white border border-ink-500/10 py-6 flex items-center justify-center font-bold text-ink-500/70 hover:text-primary-600 hover:border-primary-200 transition-colors text-sm sm:text-base"
          >
            {b}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-4 justify-items-center text-center">
        {features.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-3 max-w-[160px]"
          >
            <div className="w-16 h-16 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-soft">
              <Icon className="w-7 h-7" strokeWidth={1.6} />
            </div>
            <div>
              <div className="font-bold text-ink-900 text-sm">{title}</div>
              <div className="text-xs text-ink-500 mt-0.5">{desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
