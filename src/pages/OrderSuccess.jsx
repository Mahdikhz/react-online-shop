import { Link, useLocation, useParams } from "react-router-dom";
import { Check, Package, Truck, UserRound } from "lucide-react";
const f = (n) => n.toLocaleString("fa-IR");
export default function OrderSuccess() {
  const { id } = useParams();
  const { state } = useLocation();
  const o = state?.order;
  if (!o)
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <Package className="w-14 h-14 mx-auto text-primary-600" />
        <h1 className="text-2xl font-black mt-4">سفارش {id} ثبت شده است</h1>
        <p className="text-ink-500 mt-2">
          جزئیات سفارش را از پنل کاربری ببینید.
        </p>
        <Link
          to="/account"
          className="inline-flex mt-6 bg-primary-600 text-white rounded-xl px-5 py-3 font-bold"
        >
          پنل کاربری
        </Link>
      </div>
    );
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="bg-white rounded-3xl border border-ink-500/10 p-6 md:p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-success flex items-center justify-center mx-auto">
          <Check />
        </div>
        <h1 className="text-2xl md:text-3xl font-black mt-5">
          سفارش با موفقیت ثبت شد 🎉
        </h1>
        <p className="text-ink-500 mt-2">
          شماره سفارش: <b className="text-ink-900">{o.id}</b>
        </p>
        <div className="grid sm:grid-cols-3 gap-3 mt-8 text-right">
          <div className="rounded-xl bg-surface p-4">
            <Package className="text-primary-600 mb-2" />
            <div className="text-xs text-ink-500">وضعیت</div>
            <b>{o.status}</b>
          </div>
          <div className="rounded-xl bg-surface p-4">
            <Truck className="text-primary-600 mb-2" />
            <div className="text-xs text-ink-500">ارسال</div>
            <b>{o.shippingMethod}</b>
          </div>
          <div className="rounded-xl bg-surface p-4">
            <UserRound className="text-primary-600 mb-2" />
            <div className="text-xs text-ink-500">مبلغ نهایی</div>
            <b>{f(o.total)} تومان</b>
          </div>
        </div>
        <div className="text-right mt-8">
          <h2 className="font-black mb-3">آدرس ارسال</h2>
          <div className="rounded-xl border border-ink-500/10 p-4 text-sm">
            {o.address.province}، {o.address.city}، {o.address.address}
            <br />
            کد پستی: {o.address.postalCode}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link
            to="/account"
            className="flex-1 bg-primary-600 text-white rounded-xl py-3 font-bold"
          >
            مشاهده سفارش‌ها
          </Link>
          <Link
            to="/products"
            className="flex-1 border border-primary-200 text-primary-600 rounded-xl py-3 font-bold"
          >
            ادامه خرید
          </Link>
        </div>
      </div>
    </div>
  );
}
