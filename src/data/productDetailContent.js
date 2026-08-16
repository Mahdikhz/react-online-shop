// Lightweight mock data generator for the product detail page (specs + reviews).
// Since this is a demo catalogue without a real backend, specs/reviews are
// derived deterministically from each product so the same product always
// shows the same content.

const reviewerNames = [
  "علی محمدی",
  "سارا احمدی",
  "رضا کریمی",
  "مریم حسینی",
  "امیر رضایی",
  "نگار صادقی",
];
const reviewComments = [
  "کیفیت ساخت واقعاً عالی بود و سریع‌تر از موعد به دستم رسید.",
  "نسبت به قیمتش انتظار بیشتری داشتم ولی در مجموع راضی‌ام.",
  "پشتیبانی فروشگاه شاهان فوق‌العاده بود، حتماً باز هم خرید می‌کنم.",
  "بسته‌بندی خیلی خوب و مطمئن بود، محصول هم اورجینال بود.",
  "عملکردش عالیه، دقیقاً همونی بود که توی توضیحات نوشته شده بود.",
];

export function getSpecs(product) {
  const base = [
    { label: "برند", value: product.brand },
    { label: "دسته‌بندی", value: product.category },
    { label: "گارانتی", value: "۱۸ ماه گارانتی شرکتی" },
    { label: "کد محصول", value: `SH-${String(product.id).padStart(4, "0")}` },
  ];

  const byCategory = {
    mobile: [
      { label: "حافظه داخلی", value: "۲۵۶ گیگابایت" },
      { label: "رم", value: "۸ گیگابایت" },
      { label: "نوع نمایشگر", value: "AMOLED" },
    ],
    laptop: [
      { label: "پردازنده", value: "نسل جدید، عملکرد بالا" },
      { label: "رم", value: "۱۶ گیگابایت" },
      { label: "حافظه", value: "۵۱۲ گیگابایت SSD" },
    ],
    camera: [
      { label: "رزولوشن سنسور", value: "۲۴.۲ مگاپیکسل" },
      { label: "نوع لنز", value: "قابل تعویض" },
      { label: "ضبط ویدیو", value: "4K" },
    ],
    audio: [
      { label: "اتصال", value: "بلوتوث ۵.۳" },
      { label: "باتری", value: "تا ۳۰ ساعت پخش" },
      { label: "حذف نویز", value: "فعال (ANC)" },
    ],
    watch: [
      { label: "صفحه نمایش", value: "AMOLED لمسی" },
      { label: "ضدآب", value: "مقاوم تا ۵۰ متر" },
      { label: "باتری", value: "تا ۷ روز" },
    ],
    tv: [
      { label: "رزولوشن", value: "4K UHD" },
      { label: "سیستم‌عامل", value: "اسمارت TV" },
      { label: "اتصالات", value: "HDMI 2.1 / WiFi" },
    ],
    gaming: [
      { label: "حافظه داخلی", value: "۱ ترابایت" },
      { label: "رزولوشن خروجی", value: "تا 4K / 120fps" },
      { label: "اتصال کنترلر", value: "بی‌سیم" },
    ],
    home: [
      { label: "مصرف انرژی", value: "کلاس A+" },
      { label: "کنترل", value: "اپلیکیشن هوشمند" },
      { label: "رنگ", value: "مشکی/سفید" },
    ],
  };

  return [...base, ...(byCategory[product.category] || [])];
}

export function getReviews(product) {
  const count = 4;

  return Array.from({ length: count }, (_, i) => ({
    id: i,
    name: reviewerNames[(product.id + i) % reviewerNames.length],
    rating: Math.max(3, Math.min(5, Math.round(product.rating) - (i % 2))),
    comment: reviewComments[(product.id + i) % reviewComments.length],
    date: `140${3 - (i % 2)}/0${((product.id + i) % 9) + 1}/1${i}`,
  }));
}
