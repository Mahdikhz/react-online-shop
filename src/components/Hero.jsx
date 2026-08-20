import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight} from "lucide-react";
import heroGif1 from "../assets/slide-1.gif";
import heroGif2 from "../assets/slide-2.gif";
import heroGif3 from "../assets/slide-3.gif";

const slides = [
  {
    id: 1,
    gif: heroGif1,
  },
  {
    id: 2,
    gif: heroGif2,
  },
  {
    id: 3,
    gif: heroGif3,
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 4600);
    return () => clearInterval(t);
  }, [index]);

  const go = (dir) =>
    setIndex((i) => (i + dir + slides.length) % slides.length);
  const slide = slides[index];

  return (
    <section className="mx-auto  max-w-7xl px-4 pt-6">
      <div className="relative aspect-18.5/6 overflow-hidden rounded-3xl shadow-soft">
        <img
          src={slide.gif}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover "
        />

        <button
          onClick={() => go(1)}
          aria-label="اسلاید بعدی "
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => go(-1)}
          aria-label="اسلاید قبلی"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 text-white flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-row-reverse gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`اسلاید ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
