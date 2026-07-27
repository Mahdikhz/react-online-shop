import { Minus, Plus } from "lucide-react";

/**
 * Shared quantity stepper used in the cart, product detail page, and
 * anywhere else a "how many" control is needed. Keeps behavior/markup
 * consistent instead of re-implementing +/- buttons in every place.
 */
export default function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
  size = "md", // 'sm' | 'md' | 'lg'
}) {
  const sizes = {
    sm: { btn: "w-7 h-7", icon: "w-3 h-3", text: "w-7 text-sm" },
    md: { btn: "w-9 h-9", icon: "w-3.5 h-3.5", text: "w-9 text-sm" },
    lg: { btn: "w-11 h-11", icon: "w-4 h-4", text: "w-11 text-base" },
  }[size];

  const decrease = () => onChange(Math.max(min, value - 1));
  const increase = () => onChange(Math.min(max, value + 1));

  return (
    <div className="inline-flex items-center border border-ink-500/15 rounded-xl overflow-hidden bg-white">
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        aria-label="افزایش تعداد"
        className={`${sizes.btn} flex items-center justify-center text-ink-700 hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent transition-colors`}
      >
        <Plus className={sizes.icon} />
      </button>
      <span
        className={`${sizes.text} text-center font-bold text-ink-900 select-none`}
      >
        {value.toLocaleString("fa-IR")}
      </span>

      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        aria-label="کاهش تعداد"
        className={`${sizes.btn} flex items-center justify-center text-ink-700 hover:bg-surface disabled:opacity-30 disabled:hover:bg-transparent transition-colors`}
      >
        <Minus className={sizes.icon} />
      </button>
    </div>
  );
}
