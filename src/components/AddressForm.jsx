const fields = [
  { name: "title", label: "عنوان آدرس (مثلاً: خانه، محل کار)", wide: true },
  { name: "name", label: "نام و نام خانوادگی تحویل‌گیرنده" },
  { name: "phone", label: "شماره موبایل" },
  { name: "province", label: "استان" },
  { name: "city", label: "شهر" },
  { name: "postalCode", label: "کد پستی" },
  { name: "address", label: "آدرس کامل", wide: true, textarea: true },
];

export default function AddressForm({ form, errors = {}, onChange }) {
  const set = (name) => (e) => onChange({ ...form, [name]: e.target.value });

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      {fields.map(({ name, label, wide, textarea }) => (
        <div key={name} className={wide ? "sm:col-span-2" : ""}>
          <label className="block text-sm font-bold text-ink-700 mb-1.5">
            {label}
          </label>
          {textarea ? (
            <textarea
              value={form[name] || ""}
              onChange={set(name)}
              rows={2}
              className={`w-full rounded-xl border ${errors[name] ? "border-red-400" : "border-ink-500/15"} bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 resize-none`}
            />
          ) : (
            <input
              value={form[name] || ""}
              onChange={set(name)}
              type="text"
              className={`w-full rounded-xl border ${errors[name] ? "border-red-400" : "border-ink-500/15"} bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400`}
            />
          )}
          {errors[name] && (
            <p className="text-xs text-red-500 mt-1">{errors[name]}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export function validateAddress(form) {
  const required = [
    "title",
    "name",
    "phone",
    "province",
    "city",
    "address",
    "postalCode",
  ];
  const errors = {};
  required.forEach((key) => {
    if (!form[key] || !form[key].trim()) errors[key] = "این فیلد الزامی است.";
  });
  if (form.phone && !/^09\d{9}$/.test(form.phone.trim())) {
    errors.phone = "شماره موبایل معتبر نیست.";
  }
  return errors;
}
