import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { User, Phone, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function Auth() {
  const [mode, setMode] = useState("login"); // 'login' | 'register'
  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [errors, setErrors] = useState({});
  const { user, setUser } = useShop();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/account";

  if (user) {
    return <Navigate to={redirectTo} replace />;
  }

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const errs = {};
    if (mode === "register" && form.name.trim().length < 3) {
      errs.name = "نام باید حداقل ۳ حرف باشد";
    }
    if (!/^09\d{9}$/.test(form.phone)) {
      errs.phone = "شماره موبایل معتبر وارد کنید (مثال: 09123456789)";
    }
    if (form.password.length < 6) {
      errs.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }
    if (mode === "register" && form.confirm !== form.password) {
      errs.confirm = "رمز عبور و تکرار آن یکسان نیستند";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setUser({
      name: mode === "register" ? form.name : "کاربر شاهان",
      phone: form.phone,
    });
    navigate(redirectTo);
  };

  return (
    <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img
            src="/SHAHAN.svg"
            alt="لوگوی فروشگاه شاهان"
            className="w-14 h-14 object-contain mx-auto mb-1"
          />
          <h1 className="text-2xl font-black text-ink-900">
            {mode === "login" ? "ورود به حساب کاربری" : "ساخت حساب کاربری جدید"}
          </h1>
          <p className="text-ink-500 text-sm mt-1">
            به فروشگاه آنلاین شاهان خوش آمدید
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-ink-500/10 shadow-soft p-6 sm:p-8">
          <div className="flex bg-surface rounded-xl p-1 mb-6">
            <button
              onClick={() => setMode("login")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                mode === "login" ? "bg-primary-600 text-white" : "text-ink-500"
              }`}
            >
              ورود
            </button>
            <button
              onClick={() => setMode("register")}
              className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                mode === "register"
                  ? "bg-primary-600 text-white"
                  : "text-ink-500"
              }`}
            >
              ثبت نام
            </button>
          </div>

          <form onSubmit={submit} className="space-y-4" noValidate>
            {mode === "register" && (
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-1.5">
                  نام و نام خانوادگی
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
                  <input
                    value={form.name}
                    onChange={update("name")}
                    type="text"
                    placeholder="مثلاً: علی رضایی"
                    className="w-full rounded-xl border border-ink-500/15 pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                )}
              </div>
            )}

            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-1.5">
                شماره موبایل
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  type="tel"
                  dir="ltr"
                  placeholder="09123456789"
                  className="w-full rounded-xl border border-ink-500/15 pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400 text-right"
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-ink-700 mb-1.5">
                رمز عبور
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
                <input
                  value={form.password}
                  onChange={update("password")}
                  type={showPass ? "text" : "password"}
                  placeholder="حداقل ۶ کاراکتر"
                  className="w-full rounded-xl border border-ink-500/15 pr-10 pl-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-500"
                  aria-label="نمایش رمز عبور"
                >
                  {showPass ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-sm font-semibold text-ink-700 mb-1.5">
                  تکرار رمز عبور
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-500" />
                  <input
                    value={form.confirm}
                    onChange={update("confirm")}
                    type={showPass ? "text" : "password"}
                    placeholder="رمز عبور را دوباره وارد کنید"
                    className="w-full rounded-xl border border-ink-500/15 pr-10 pl-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
                  />
                </div>
                {errors.confirm && (
                  <p className="text-xs text-red-500 mt-1">{errors.confirm}</p>
                )}
              </div>
            )}

            {mode === "login" && (
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-ink-700">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded accent-primary-600"
                  />
                  مرا به خاطر بسپار
                </label>
                <a
                  href="#"
                  className="text-primary-600 font-semibold hover:underline"
                >
                  فراموشی رمز عبور
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl py-3.5 transition-colors"
            >
              {mode === "login" ? "ورود به حساب" : "ایجاد حساب کاربری"}
            </button>
          </form>

          <div className="flex items-center gap-2 justify-center text-xs text-ink-500 mt-6">
            <ShieldCheck className="w-4 h-4 text-success" />
            اطلاعات شما نزد ما محفوظ و رمزنگاری شده است
          </div>
        </div>

        <p className="text-center text-sm text-ink-500 mt-6">
          <Link
            to="/"
            className="text-primary-600 font-semibold hover:underline"
          >
            بازگشت به فروشگاه
          </Link>
        </p>
      </div>
    </div>
  );
}
