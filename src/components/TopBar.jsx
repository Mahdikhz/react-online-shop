import { Phone, Mail } from "lucide-react";
import {
  TelegramIcon,
  LinkedinIcon,
  YoutubeIcon,
  InstagramIcon,
} from "./SocialIcons";

const socials = [
  { icon: TelegramIcon, href: "#", label: "تلگرام" },
  { icon: LinkedinIcon, href: "#", label: "لینکدین" },
  { icon: YoutubeIcon, href: "#", label: "یوتیوب" },
  { icon: InstagramIcon, href: "#", label: "اینستاگرام" },
];

export default function TopBar() {
  return (
    <div className="bg-primary-600 text-white text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="hidden sm:flex items-center gap-2">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/25 transition-colors flex items-center justify-center"
            >
              <Icon className="w-3.5 h-3.5" />
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-6 text-white/90">
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5" />
            <span dir="ltr">02123456789</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5" />
            admin@admin.com
          </span>
        </div>

        <div className="flex items-center gap-5 mr-auto text-white/90">
          <a href="#" className="hover:text-white transition-colors">
            سوالی دارید
          </a>
          <a
            href="#"
            className="hidden sm:inline hover:text-white transition-colors"
          >
            تخفیف‌ها و پیشنهادها
          </a>
        </div>
      </div>
    </div>
  );
}
