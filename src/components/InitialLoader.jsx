import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = () => setVisible(false);
    const timer = setTimeout(hide, 650);
    window.addEventListener("load", hide, { once: true });

    // ---------------To view the site loader----------------------------------
    // const timer = window.setTimeout(hide, 12650);
    // // window.addEventListener("load", hide, { once: true });

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
          className="w-28 h-28 object-contain mx-auto"
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
