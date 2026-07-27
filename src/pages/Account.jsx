import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  UserRound,
  Package,
  Truck,
  Clock3,
  LogOut,
  ChevronLeft,
  ShoppingBag,
  MapPin,
  Phone,
  Heart,
  Pencil,
  Plus,
  Trash2,
  Star,
  Check,
} from "lucide-react";
import { useShop } from "../context/ShopContext";
import { products } from "../data/products";
import AddressForm, { validateAddress } from "../components/AddressForm";

const tabs = [
  { id: "overview", label: "نمای کلی", icon: UserRound },
  { id: "orders", label: "سفارش‌های من", icon: Package },
  { id: "tracking", label: "پیگیری سفارش", icon: Truck },
  { id: "history", label: "سوابق سفارش", icon: Clock3 },
  { id: "wishlist", label: "علاقه‌مندی‌ها", icon: Heart },
  { id: "profile", label: "ویرایش پروفایل", icon: Pencil },
  { id: "addresses", label: "آدرس‌های من", icon: MapPin },
];

function formatPrice(n) {
  return n.toLocaleString("fa-IR");
}

export default function Account() {
  const {
    user,
    logout,
    orders,
    wishlist,
    addresses,
    addAddress,
    updateAddress,
    removeAddress,
    setDefaultAddress,
    updateUser,
    showToast,
  } = useShop();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:py-10">
      <div className="mb-6">
        <p className="text-sm text-ink-500">حساب کاربری</p>
        <h1 className="text-2xl md:text-3xl font-black text-ink-900 mt-1">
          سلام، {user.name}
        </h1>
      </div>

      <div className="grid lg:grid-cols-[240px_1fr] gap-6 items-start">
        <aside className="bg-white rounded-2xl border border-ink-500/10 shadow-soft p-3 lg:sticky lg:top-28">
          <div className="px-3 py-4 border-b border-ink-500/10 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3 font-bold text-lg">
              {user.name?.charAt(0) || "ک"}
            </div>
            <div className="font-bold text-ink-900 truncate">{user.name}</div>
            <div
              className="text-xs text-ink-500 mt-1 flex items-center gap-1"
              dir="ltr"
            >
              <Phone className="w-3.5 h-3.5" /> {user.phone}
            </div>
          </div>

          <nav className="space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition-colors text-right ${
                  activeTab === id
                    ? "bg-primary-50 text-primary-700"
                    : "text-ink-700 hover:bg-ink-500"
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {label}
              </button>
            ))}
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
            >
              <LogOut className="w-4.5 h-4.5" />
              خروج از حساب
            </button>
          </nav>
        </aside>

        <section className="space-y-5">
          {activeTab === "overview" && (
            <OverviewTab
              orders={orders}
              wishlistCount={wishlist.length}
              user={user}
              onGoTracking={() => setActiveTab("tracking")}
            />
          )}

          {activeTab === "orders" && (
            <Panel title="سفارش‌های من" icon={Package}>
              {orders.length ? <OrderList orders={orders} /> : <EmptyOrders />}
            </Panel>
          )}

          {activeTab === "tracking" && <TrackingTab orders={orders} />}

          {activeTab === "history" && (
            <Panel title="سوابق سفارش" icon={Clock3}>
              {orders.length ? (
                <OrderList orders={orders} showAll />
              ) : (
                <EmptyOrders message="سوابق سفارش شما اینجا نمایش داده می‌شود." />
              )}
            </Panel>
          )}

          {activeTab === "wishlist" && <WishlistTab wishlist={wishlist} />}

          {activeTab === "profile" && (
            <ProfileTab
              user={user}
              updateUser={updateUser}
              showToast={showToast}
            />
          )}

          {activeTab === "addresses" && (
            <AddressesTab
              addresses={addresses}
              addAddress={addAddress}
              updateAddress={updateAddress}
              removeAddress={removeAddress}
              setDefaultAddress={setDefaultAddress}
              showToast={showToast}
            />
          )}
        </section>
      </div>
    </div>
  );
}

function OverviewTab({ orders, wishlistCount, user, onGoTracking }) {
  return (
    <>
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard
          icon={Package}
          title="کل سفارش‌ها"
          value={orders.length.toLocaleString("fa-IR")}
        />
        <StatCard
          icon={Truck}
          title="در حال ارسال"
          value={orders
            .filter((o) => o.status === "ارسال شده")
            .length.toLocaleString("fa-IR")}
        />
        <StatCard
          icon={Heart}
          title="علاقه‌مندی‌ها"
          value={wishlistCount.toLocaleString("fa-IR")}
        />
      </div>

      <Panel title="آخرین سفارش‌ها" icon={Package}>
        {orders.length ? (
          <OrderList orders={orders.slice(0, 3)} />
        ) : (
          <EmptyOrders />
        )}
      </Panel>

      <div className="grid md:grid-cols-2 gap-5">
        <Panel title="اطلاعات حساب" icon={UserRound}>
          <div className="space-y-3 text-sm">
            <InfoRow label="نام و نام خانوادگی" value={user.name} />
            <InfoRow label="شماره موبایل" value={user.phone} />
          </div>
        </Panel>
        <Panel title="پیگیری سفارش" icon={Truck}>
          {orders.length ? (
            <p className="text-sm text-ink-500">
              برای مشاهده وضعیت ارسال، از بخش «پیگیری سفارش» استفاده کنید.
            </p>
          ) : (
            <p className="text-sm text-ink-500">
              هنوز سفارشی برای پیگیری ثبت نشده است.
            </p>
          )}
          <button
            onClick={onGoTracking}
            className="mt-4 text-sm font-bold text-primary-600 flex items-center gap-1"
          >
            مشاهده پیگیری‌ها <ChevronLeft className="w-4 h-4" />
          </button>
        </Panel>
      </div>
    </>
  );
}

function TrackingTab({ orders }) {
  const stepMap = { "در حال پردازش": 1, "ارسال شده": 2, "تحویل داده شده": 3 };
  return (
    <Panel title="پیگیری سفارش" icon={Truck}>
      {orders.length ? (
        <div className="space-y-4">
          {orders.map((order) => {
            const step = stepMap[order.status] ?? 1;
            return (
              <div
                key={order.id}
                className="rounded-xl border border-ink-500/10 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="font-bold text-ink-900">
                      سفارش {order.id}
                    </div>
                    <div className="text-xs text-ink-500 mt-1">
                      {order.date}
                    </div>
                  </div>
                  <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-primary-50 text-primary-700">
                    {order.status}
                  </span>
                </div>
                <div className="h-2 bg-surface rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-600 rounded-full transition-all"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-ink-500 mt-2">
                  <span>ثبت سفارش</span>
                  <span>پردازش</span>
                  <span>ارسال</span>
                  <span>تحویل</span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyOrders message="در حال حاضر سفارشی برای پیگیری وجود ندارد." />
      )}
    </Panel>
  );
}

function WishlistTab({ wishlist }) {
  const items = products.filter((p) => wishlist.includes(p.id));
  return (
    <Panel title="علاقه‌مندی‌ها" icon={Heart}>
      {items.length ? (
        <>
          <div className="space-y-3">
            {items.slice(0, 5).map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-ink-500/10 p-3"
              >
                <Link
                  to={`/products/${p.id}`}
                  className="font-semibold text-sm text-ink-900 hover:text-primary-600 line-clamp-1"
                >
                  {p.title}
                </Link>
                <span className="text-sm font-bold text-ink-700 shrink-0">
                  {formatPrice(p.price)} تومان
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/wishlist"
            className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary-600"
          >
            مشاهده همه ({items.length.toLocaleString("fa-IR")}){" "}
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </>
      ) : (
        <div className="rounded-xl bg-surface p-8 text-center">
          <Heart className="w-10 h-10 text-ink-500/40 mx-auto mb-3" />
          <p className="text-sm text-ink-500 mb-4">
            لیست علاقه‌مندی‌های شما خالی است.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-1 bg-primary-600 text-white rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-primary-700"
          >
            مشاهده محصولات <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      )}
    </Panel>
  );
}

function ProfileTab({ user, updateUser, showToast }) {
  const [form, setForm] = useState({
    name: user.name || "",
    phone: user.phone || "",
  });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 3) errs.name = "نام باید حداقل ۳ حرف باشد.";
    if (!/^09\d{9}$/.test(form.phone.trim()))
      errs.phone = "شماره موبایل معتبر نیست.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    updateUser({ name: form.name.trim(), phone: form.phone.trim() });
    showToast?.("اطلاعات حساب با موفقیت به‌روزرسانی شد.");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Panel title="ویرایش پروفایل" icon={Pencil}>
      <form onSubmit={submit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-bold text-ink-700 mb-1.5">
            نام و نام خانوادگی
          </label>
          <input
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className={`w-full rounded-xl border ${errors.name ? "border-red-400" : "border-ink-500/15"} bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-ink-700 mb-1.5">
            شماره موبایل
          </label>
          <input
            value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            dir="ltr"
            className={`w-full rounded-xl border text-right ${errors.phone ? "border-red-400" : "border-ink-500/15"} bg-surface px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl px-6 py-3 text-sm transition-colors"
        >
          {saved && <Check className="w-4 h-4" />}
          ذخیره تغییرات
        </button>
      </form>
    </Panel>
  );
}

function AddressesTab({
  addresses,
  addAddress,
  updateAddress,
  removeAddress,
  setDefaultAddress,
  showToast,
}) {
  const emptyForm = {
    title: "",
    name: "",
    phone: "",
    province: "",
    city: "",
    postalCode: "",
    address: "",
  };
  const [editingId, setEditingId] = useState(null); // null = not editing, 'new' = adding
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const startAdd = () => {
    setForm(emptyForm);
    setErrors({});
    setEditingId("new");
  };

  const startEdit = (addr) => {
    setForm(addr);
    setErrors({});
    setEditingId(addr.id);
  };

  const cancel = () => {
    setEditingId(null);
    setErrors({});
  };

  const submit = (e) => {
    e.preventDefault();
    const errs = validateAddress(form);
    setErrors(errs);
    if (Object.keys(errs).length) return;

    if (editingId === "new") {
      addAddress(form);
      showToast?.("آدرس جدید ذخیره شد.");
    } else {
      updateAddress(editingId, form);
      showToast?.("آدرس با موفقیت ویرایش شد.");
    }
    setEditingId(null);
  };

  if (editingId) {
    return (
      <Panel
        title={editingId === "new" ? "افزودن آدرس جدید" : "ویرایش آدرس"}
        icon={MapPin}
      >
        <form onSubmit={submit} className="space-y-5">
          <AddressForm form={form} errors={errors} onChange={setForm} />
          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-primary-600 hover:bg-primary-700 text-white font-bold rounded-xl px-6 py-3 text-sm transition-colors"
            >
              ذخیره آدرس
            </button>
            <button
              type="button"
              onClick={cancel}
              className="border border-ink-500/15 text-ink-700 font-bold rounded-xl px-6 py-3 text-sm"
            >
              انصراف
            </button>
          </div>
        </form>
      </Panel>
    );
  }

  return (
    <Panel
      title="آدرس‌های من"
      icon={MapPin}
      action={
        <button
          onClick={startAdd}
          className="flex items-center gap-1.5 text-sm font-bold text-primary-600"
        >
          <Plus className="w-4 h-4" /> افزودن آدرس
        </button>
      }
    >
      {addresses.length ? (
        <div className="space-y-3">
          {addresses.map((addr) => (
            <div
              key={addr.id}
              className="rounded-xl border border-ink-500/10 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-ink-900">{addr.title}</span>
                    {addr.isDefault && (
                      <span className="text-[11px] font-bold text-success bg-emerald-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" /> پیش‌فرض
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-ink-700 mt-2">
                    {addr.name} • <span dir="ltr">{addr.phone}</span>
                  </div>
                  <div className="text-sm text-ink-500 mt-1">
                    {addr.province}، {addr.city}، {addr.address}
                  </div>
                  <div className="text-xs text-ink-500 mt-1">
                    کد پستی: {addr.postalCode}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!addr.isDefault && (
                    <button
                      onClick={() => setDefaultAddress(addr.id)}
                      className="text-xs font-bold text-primary-600 hover:underline"
                    >
                      پیش‌فرض کن
                    </button>
                  )}
                  <button
                    onClick={() => startEdit(addr)}
                    aria-label="ویرایش"
                    className="w-8 h-8 rounded-lg hover:bg-surface flex items-center justify-center text-ink-500"
                  >
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => removeAddress(addr.id)}
                    aria-label="حذف"
                    className="w-8 h-8 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl bg-surface p-8 text-center">
          <MapPin className="w-10 h-10 text-ink-500/40 mx-auto mb-3" />
          <p className="text-sm text-ink-500 mb-4">هنوز آدرسی ثبت نکرده‌اید.</p>
          <button
            onClick={startAdd}
            className="inline-flex items-center gap-1 bg-primary-600 text-white rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" /> افزودن آدرس جدید
          </button>
        </div>
      )}
    </Panel>
  );
}

function StatCard({ icon: Icon, title, value }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-500/10 p-5">
      <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5" />
      </div>
      <div className="text-xs text-ink-500">{title}</div>
      <div className="text-2xl font-black text-ink-900 mt-1">{value}</div>
    </div>
  );
}

function Panel({ title, icon: Icon, children, action }) {
  return (
    <div className="bg-white rounded-2xl border border-ink-500/10 p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-primary-600" />
          <h2 className="font-black text-ink-900">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-ink-500/10 pb-3 last:border-0 last:pb-0">
      <span className="text-ink-500">{label}</span>
      <span className="font-semibold text-ink-900">{value}</span>
    </div>
  );
}

function OrderList({ orders, showAll = false }) {
  const visibleOrders = showAll ? orders : orders.slice(0, 5);
  return (
    <div className="space-y-3">
      {visibleOrders.map((order) => {
        const previewProducts = (order.items || [])
          .slice(0, 2)
          .map((item) => products.find((p) => p.id === item.id))
          .filter(Boolean);
        return (
          <div
            key={order.id}
            className="rounded-xl border border-ink-500/10 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div>
                <div className="font-bold text-ink-900">{order.id}</div>
                <div className="text-xs text-ink-500 mt-1">{order.date}</div>
              </div>
              <div className="text-left">
                <div className="font-extrabold text-ink-900">
                  {formatPrice(order.total)} تومان
                </div>
                <div className="text-xs text-success mt-1">{order.status}</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-ink-500">
              <ShoppingBag className="w-4 h-4" />
              {previewProducts.length
                ? previewProducts.map((p) => p.title).join("، ")
                : "جزئیات کالا"}
              {order.items?.length > 2 ? " و ..." : ""}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function EmptyOrders({ message = "هنوز سفارشی ثبت نکرده‌اید." }) {
  return (
    <div className="rounded-xl bg-surface p-8 text-center">
      <Package className="w-10 h-10 text-ink-500/40 mx-auto mb-3" />
      <p className="text-sm text-ink-500 mb-4">{message}</p>
      <Link
        to="/products"
        className="inline-flex items-center gap-1 bg-primary-600 text-white rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-primary-700"
      >
        مشاهده محصولات <ChevronLeft className="w-4 h-4" />
      </Link>
    </div>
  );
}
