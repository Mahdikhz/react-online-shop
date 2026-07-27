import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  TelegramIcon,
  LinkedinIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./SocialIcons";
import { categories } from "../data/products";

export default function Footer() {
  return (
    <footer className="bg-ink-900 text-white/80 mt-12">
      <div className="mx-auto max-w-7xl px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary-600 text-white flex items-center justify-center font-black">
              SH
            </div>
            <span className="font-extrabold text-white text-lg">
              فروشگاه شاهان
            </span>
          </div>
          <p className="text-sm leading-6 mb-4">
            فروشگاهی برای همه سلیقه‌ها؛ خرید آسان، مطمئن و سریع کالای دیجیتال با
            ضمانت اصالت.
          </p>
          <div className="flex items-center gap-2">
            {[TelegramIcon, LinkedinIcon, YoutubeIcon, InstagramIcon].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ),
            )}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">دسته‌بندی‌ها</h4>
          <ul className="space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.id}>
                <Link
                  to={`/products?category=${c.id}`}
                  className="hover:text-white transition-colors"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">خدمات مشتریان</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/login" className="hover:text-white transition-colors">
                حساب کاربری
              </Link>
            </li>
            <li>
              <Link
                to="/products"
                className="hover:text-white transition-colors"
              >
                پیگیری سفارش
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                شرایط بازگشت کالا
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                سوالات متداول
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">تماس با ما</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
              تهران، خیابان ولیعصر، پلاک ۱۰
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <span dir="ltr">021 234 5678</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              admin@admin.com
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © تمامی حقوق برای فروشگاه شاهان محفوظ است — پروژه آموزشی React
      </div>
    </footer>
  );
}
