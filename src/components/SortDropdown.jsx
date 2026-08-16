import { useEffect, useRef, useState } from "react";
import { ChevronDown, Check, SlidersHorizontal } from "lucide-react";

const options = [
  { value: "popular", label: "محبوب‌ترین" },
  { value: "cheapest", label: "ارزان‌ترین" },
  { value: "expensive", label: "گران‌ترین" },
  { value: "discount", label: "بیشترین تخفیف" },
  { value: "newest", label: "جدیدترین" },
];

export default function SortDropdown({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const selected =
    options.find((option) => option.value === value) || options[0];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Button */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`
          flex items-center gap-3
          min-w-[190px]
          justify-between
          bg-white
          border
          rounded-xl
          px-4
          py-3
          text-sm
          font-semibold
          text-ink-800
          transition-all
          duration-200
          ${
            open
              ? "border-primary-500 ring-4 ring-primary-500/10"
              : "border-ink-500/15 hover:border-primary-300"
          }
        `}
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-primary-600" />

          <span className="text-xs text-ink-500">مرتب‌سازی:</span>

          <span className="text-ink-900">{selected.label}</span>
        </div>

        <ChevronDown
          className={`
            w-4 h-4 text-ink-500
            transition-transform duration-200
            ${open ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="
            absolute
            z-50
            top-full
            right-0
            mt-2
            w-full
            min-w-190px
            bg-white
            border
            border-ink-500/10
            rounded-2xl
            shadow-xl
            p-1.5
            overflow-hidden
          "
        >
          {options.map((option) => {
            const active = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={`
                  w-full
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  px-3
                  py-2.5
                  text-sm
                  font-medium
                  text-right
                  transition-colors
                  ${
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-ink-700 menu-hover"
                  }
                `}
              >
                <span>{option.label}</span>

                {active && <Check className="w-4 h-4 text-primary-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
