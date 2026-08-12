import { useEffect, useState } from "react";

export default function InitialLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const MIN_DISPLAY_TIME = 1000;
    let minTimeElapsed = false;
    let pageLoaded = false;

    const tryHide = () => {
      if (minTimeElapsed && pageLoaded) {
        setVisible(false);
      }
    };

    const minTimer = setTimeout(() => {
      minTimeElapsed = true;
      tryHide();
    }, MIN_DISPLAY_TIME);

    const handleLoad = () => {
      pageLoaded = true;
      tryHide();
    };

    if (document.readyState === "complete") {
      // اگه صفحه از قبل لود شده بود شده
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad, { once: true });
    }
// ---------------------Cleanup Function------------------
    return () => {
      clearTimeout(minTimer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-100 bg-surface flex items-center justify-center"
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
