import { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  MapPin,
  Truck,
  CreditCard,
  ClipboardCheck,
  ArrowLeft,
  ArrowRight,
  Check,
  Plus,
  Wallet,
  Banknote,
  Star,
} from "lucide-react";
import { products } from "../data/products";
import { useShop } from "../context/ShopContext";
import AddressForm, { validateAddress } from "../components/AddressForm";
import ProductImage from "../components/ProductImage";

const COUPONS = { SHAHAN10: 0.1, WELCOME5: 0.05, OFF20: 0.2 };

const shippingMethods = [
  { id: "normal", label: "ارسال عادی", desc: "۲ تا ۴ روز کاری", price: 150000 },
  {
    id: "express",
    label: "ارسال اکسپرس",
    desc: "حداکثر ۲۴ ساعت",
    price: 350000,
  },
];

const paymentMethods = [
  {
    id: "online",
    label: "پرداخت آنلاین",
    desc: "اتصال به درگاه بانکی (نمایشی)",
    icon: CreditCard,
  },
  {
    id: "cod",
    label: "پرداخت در محل",
    desc: "پرداخت هنگام تحویل کالا",
    icon: Banknote,
  },
];

const steps = [
  { id: 1, label: "آدرس ارسال", icon: MapPin },
  { id: 2, label: "روش ارسال", icon: Truck },
  { id: 3, label: "پرداخت", icon: Wallet },
  { id: 4, label: "بازبینی نهایی", icon: ClipboardCheck },
];

function formatPrice(n) {
  return n.toLocaleString("fa-IR");
}

export default function Checkout() {
  const { cart, user, addresses, addAddress, addOrder, clearCart, showToast } =
    useShop();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [selectedAddressId, setSelectedAddressId] = useState(
    () => addresses.find((a) => a.isDefault)?.id || addresses[0]?.id || null,
  );
  const [showNewAddressForm, setShowNewAddressForm] = useState(
    addresses.length === 0,
  );
  const [newAddress, setNewAddress] = useState({
    title: "",
    name: user?.name || "",
    phone: user?.phone || "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
  });
  const [addressErrors, setAddressErrors] = useState({});

  const [shippingId, setShippingId] = useState("normal");
  const [paymentId, setPaymentId] = useState("online");

  const [coupon, setCoupon] = useState("");
  const [appliedCode, setAppliedCode] = useState("");

  const items = useMemo(
    () =>
      cart
        .map((i) => ({ ...i, product: products.find((p) => p.id === i.id) }))
        .filter((i) => i.product),
    [cart],
  );

  if (!user) return <Navigate to="/login?redirect=/checkout" replace />;
  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-ink-900">سبد خرید خالی است</h1>
        <Link
          to="/products"
          className="inline-flex mt-6 bg-primary-600 text-white rounded-xl px-5 py-3 font-bold hover:bg-primary-700 transition-colors"
        >
          مشاهده محصولات
        </Link>
      </div>
    );
  }

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  const discount = Math.round(subtotal * (COUPONS[appliedCode] || 0));
  const shippingMethod = shippingMethods.find((s) => s.id === shippingId);
  const shipping = subtotal >= 50000000 ? 0 : shippingMethod.price;
  const total = subtotal - discount + shipping;

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId);

  const applyCoupon = () => {
    const code = coupon.trim();
    if (!COUPONS[code]) {
      setAppliedCode("");
      showToast?.("کد تخفیف معتبر نیست.", "error");
      return;
    }
    setAppliedCode(code);
    showToast?.(`کد ${code} با موفقیت اعمال شد.`);
  };

  const goNext = () => {
    if (step === 1) {
      if (showNewAddressForm || !selectedAddressId) {
        const errs = validateAddress(newAddress);
        setAddressErrors(errs);
        if (Object.keys(errs).length) return;
        const saved = addAddress(newAddress);
        setSelectedAddressId(saved.id);
        setShowNewAddressForm(false);
      }
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const placeOrder = () => {
    const finalAddress =
      addresses.find((a) => a.id === selectedAddressId) || newAddress;
    const order = {
      id: `SH-${Date.now().toString().slice(-8)}`,
      date: new Date().toLocaleDateString("fa-IR"),
      status: "در حال پردازش",
      items: cart,
      subtotal,
      discount,
      shipping,
      total,
      shippingMethod: shippingMethod.label,
      paymentMethod: paymentMethods.find((p) => p.id === paymentId).label,
      address: finalAddress,
    };
    addOrder(order);
    clearCart();
    navigate(`/order-success/${order.id}`, { state: { order } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-2xl font-black text-ink-900 mb-7">تکمیل سفارش</h1>

      {/* Stepper */}
      <div className="flex items-center justify-between relative mb-10 max-w-2xl">
        <div className="absolute top-5 right-0 left-0 h-0.5 bg-ink-500/10" />
        <div
          className="absolute top-5 right-0 h-0.5 bg-primary-600 transition-all"
          style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
        />
        {steps.map(({ id, label, icon: Icon }) => {
          const reached = id <= step;
          return (
            <div
              key={id}
              className="relative flex flex-col items-center gap-2 z-10 flex-1"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                  reached
                    ? "bg-primary-600 text-white"
                    : "bg-white border-2 border-ink-500/15 text-ink-500"
                }`}
              >
                {id < step ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Icon className="w-4.5 h-4.5" />
                )}
              </div>
              <span
                className={`text-[11px] sm:text-xs font-semibold text-center ${reached ? "text-ink-900" : "text-ink-500"}`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_380px] gap-6 items-start">
        <div className="space-y-6">
          {step === 1 && (
            <section className="bg-white rounded-2xl border border-ink-500/10 p-5 md:p-6">
              <div className="flex items-center gap-2 mb-5">
                <MapPin className="text-primary-600 w-5 h-5" />
                <h2 className="font-black text-ink-900">آدرس ارسال</h2>
              </div>

              {!showNewAddressForm && addresses.length > 0 && (
                <>
                  <div className="space-y-3 mb-5">
                    {addresses.map((addr) => (
                      <label
                        key={addr.id}
                        className={`flex items-start gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                          selectedAddressId === addr.id
                            ? "border-primary-500 bg-primary-50"
                            : "border-ink-500/10 hover:border-primary-200"
                        }`}
                      >
                        <input
                          type="radio"
                          name="address"
                          checked={selectedAddressId === addr.id}
                          onChange={() => setSelectedAddressId(addr.id)}
                          className="mt-1 accent-primary-600"
                        />
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-ink-900">
                              {addr.title}
                            </span>
                            {addr.isDefault && (
                              <span className="text-[11px] font-bold text-success bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 fill-current" />{" "}
                                پیش‌فرض
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-ink-700 mt-1">
                            {addr.name} • <span dir="ltr">{addr.phone}</span>
                          </div>
                          <div className="text-sm text-ink-500 mt-1">
                            {addr.province}، {addr.city}، {addr.address}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowNewAddressForm(true)}
                    className="flex items-center gap-1.5 text-sm font-bold text-primary-600"
                  >
                    <Plus className="w-4 h-4" /> افزودن آدرس جدید
                  </button>
                </>
              )}

              {showNewAddressForm && (
                <div>
                  <AddressForm
                    form={newAddress}
                    errors={addressErrors}
                    onChange={setNewAddress}
                  />
                  {addresses.length > 0 && (
                    <button
                      onClick={() => setShowNewAddressForm(false)}
                      className="mt-4 text-sm font-semibold text-ink-500 hover:text-primary-600"
                    >
                      انصراف و انتخاب از آدرس‌های ذخیره‌شده
                    </button>
                  )}
                </div>
              )}
            </section>
          )}

          {step === 2 && (
            <section className="bg-white rounded-2xl border border-ink-500/10 p-5 md:p-6">
              <div className="flex items-center gap-2 mb-5">
                <Truck className="text-primary-600 w-5 h-5" />
                <h2 className="font-black text-ink-900">روش ارسال</h2>
              </div>
              <div className="space-y-3">
                {shippingMethods.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center justify-between gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                      shippingId === m.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-ink-500/10 hover:border-primary-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        checked={shippingId === m.id}
                        onChange={() => setShippingId(m.id)}
                        className="accent-primary-600"
                      />
                      <div>
                        <div className="font-bold text-ink-900">{m.label}</div>
                        <div className="text-xs text-ink-500 mt-0.5">
                          {m.desc}
                        </div>
                      </div>
                    </div>
                    <span className="font-bold text-ink-900 shrink-0">
                      {subtotal >= 50000000
                        ? "رایگان"
                        : `${formatPrice(m.price)} تومان`}
                    </span>
                  </label>
                ))}
              </div>
              {subtotal >= 50000000 && (
                <p className="text-xs text-success mt-3">
                  خرید شما بالای ۵۰ میلیون تومان است و ارسال رایگان می‌باشد.
                </p>
              )}
            </section>
          )}

          {step === 3 && (
            <section className="bg-white rounded-2xl border border-ink-500/10 p-5 md:p-6">
              <div className="flex items-center gap-2 mb-5">
                <CreditCard className="text-primary-600 w-5 h-5" />
                <h2 className="font-black text-ink-900">روش پرداخت</h2>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-3 rounded-xl border-2 p-4 cursor-pointer transition-colors ${
                      paymentId === m.id
                        ? "border-primary-500 bg-primary-50"
                        : "border-ink-500/10 hover:border-primary-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentId === m.id}
                      onChange={() => setPaymentId(m.id)}
                      className="accent-primary-600"
                    />
                    <m.icon className="w-5 h-5 text-primary-600 shrink-0" />
                    <div>
                      <div className="font-bold text-ink-900">{m.label}</div>
                      <div className="text-xs text-ink-500 mt-0.5">
                        {m.desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="space-y-5">
              <div className="bg-white rounded-2xl border border-ink-500/10 p-5 md:p-6">
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="text-primary-600 w-5 h-5" />
                  <h2 className="font-black text-ink-900">آدرس ارسال</h2>
                  <button
                    onClick={() => setStep(1)}
                    className="text-xs font-bold text-primary-600 mr-auto"
                  >
                    ویرایش
                  </button>
                </div>
                {selectedAddress ? (
                  <div className="text-sm text-ink-700">
                    <div className="font-semibold">
                      {selectedAddress.title} — {selectedAddress.name} (
                      <span dir="ltr">{selectedAddress.phone}</span>)
                    </div>
                    <div className="text-ink-500 mt-1">
                      {selectedAddress.province}، {selectedAddress.city}،{" "}
                      {selectedAddress.address}
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-ink-500">آدرسی انتخاب نشده است.</p>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-ink-500/10 p-5 md:p-6 grid sm:grid-cols-2 gap-5">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Truck className="text-primary-600 w-4 h-4" />
                    <h3 className="font-bold text-ink-900 text-sm">
                      روش ارسال
                    </h3>
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs font-bold text-primary-600 mr-auto"
                    >
                      ویرایش
                    </button>
                  </div>
                  <p className="text-sm text-ink-700">{shippingMethod.label}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Wallet className="text-primary-600 w-4 h-4" />
                    <h3 className="font-bold text-ink-900 text-sm">
                      روش پرداخت
                    </h3>
                    <button
                      onClick={() => setStep(3)}
                      className="text-xs font-bold text-primary-600 mr-auto"
                    >
                      ویرایش
                    </button>
                  </div>
                  <p className="text-sm text-ink-700">
                    {paymentMethods.find((p) => p.id === paymentId).label}
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-ink-500/10 p-5 md:p-6">
                <h3 className="font-bold text-ink-900 text-sm mb-4">
                  کالاهای سفارش
                </h3>
                <div className="space-y-3">
                  {items.map(({ product, qty }) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                        <ProductImage
                          product={product}
                          iconClassName="w-6 h-6"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-ink-900 line-clamp-1">
                          {product.title}
                        </div>
                        <div className="text-xs text-ink-500">
                          تعداد: {qty.toLocaleString("fa-IR")}
                        </div>
                      </div>
                      <div className="text-sm font-bold text-ink-900 shrink-0">
                        {formatPrice(product.price * qty)} تومان
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                onClick={goBack}
                className="flex items-center gap-2 border border-ink-500/15 text-ink-700 font-bold rounded-xl px-5 py-3 text-sm hover:bg-surface transition-colors"
              >
                <ArrowRight className="w-4 h-4" />
                مرحله قبل
              </button>
            )}
            {step < 4 ? (
              <button
                onClick={goNext}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl px-6 py-3 text-sm transition-colors mr-auto"
              >
                مرحله بعد
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={placeOrder}
                className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl px-6 py-3 text-sm transition-colors mr-auto"
              >
                ثبت نهایی سفارش و پرداخت
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <aside className="bg-white rounded-2xl border border-ink-500/10 p-5 lg:sticky lg:top-24">
          <h2 className="font-black text-ink-900 mb-5">خلاصه سفارش</h2>
          <div className="space-y-2 text-sm max-h-48 overflow-y-auto pl-1">
            {items.map(({ product, qty }) => (
              <div
                key={product.id}
                className="flex justify-between gap-3 text-ink-700"
              >
                <span className="line-clamp-1">
                  {product.title} × {qty.toLocaleString("fa-IR")}
                </span>
                <span className="font-semibold shrink-0">
                  {formatPrice(product.price * qty)}
                </span>
              </div>
            ))}
          </div>
          <hr className="border-ink-500/10 my-4" />
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-ink-700">
              <span>جمع کالاها</span>
              <b>{formatPrice(subtotal)} تومان</b>
            </div>
            <div className="flex justify-between text-ink-700">
              <span>تخفیف</span>
              <b className="text-success">
                {discount ? `-${formatPrice(discount)}` : "۰"} تومان
              </b>
            </div>
            <div className="flex justify-between text-ink-700">
              <span>هزینه ارسال</span>
              <b>{shipping ? `${formatPrice(shipping)} تومان` : "رایگان"}</b>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="کد تخفیف"
              className="flex-1 rounded-xl border border-ink-500/15 bg-surface px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
            />
            <button
              type="button"
              onClick={applyCoupon}
              className="border border-primary-200 text-primary-600 rounded-xl px-4 font-bold text-sm"
            >
              اعمال
            </button>
          </div>
          {appliedCode && (
            <p className="text-xs text-success mt-2">
              کد {appliedCode} اعمال شد.
            </p>
          )}

          <div className="border-t border-ink-500/10 mt-5 pt-5 flex justify-between items-center">
            <b className="text-ink-900">مبلغ نهایی</b>
            <strong className="text-xl text-primary-600">
              {formatPrice(total)} تومان
            </strong>
          </div>
        </aside>
      </div>
    </div>
  );
}
