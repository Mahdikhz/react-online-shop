import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    const timer = window.setTimeout(hide, 650);
    window.addEventListener("load", hide, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", hide);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-surface flex items-center justify-center"
      aria-label="در حال بارگذاری"
    >
      <div className="text-center">
        <img
            src="/SHAHAN.svg"
            alt="لوگوی فروشگاه شاهان"
            className=" flex items-center justify-center font-black text-xl mx-auto shadow-soft"
          />
        <div className="mt-5 flex justify-center gap-1.5" aria-hidden="true">
          <span className="loader-dot" />
          <span className="loader-dot loader-dot-delay-1" />
          <span className="loader-dot loader-dot-delay-2" />
        </div>
        <p className="text-sm text-ink-500 mt-3">
          در حال آماده‌سازی فروشگاه...
        </p>
      </div>
    </div>
  );
}
