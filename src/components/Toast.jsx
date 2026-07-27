import { CheckCircle2, XCircle, X } from "lucide-react";
import { useShop } from "../context/ShopContext";
export default function Toast() {
  const { toast, closeToast } = useShop();
  if (!toast) return null;
  const ok = toast.type !== "error";
  const Icon = ok ? CheckCircle2 : XCircle;
  return (
    <div
      className="fixed top-5 left-5 z-[120] w-[min(92vw,380px)] rounded-2xl border border-ink-500/10 bg-white shadow-soft p-4 flex items-start gap-3 toast-in"
      role="status"
    >
      <Icon
        className={`w-5 h-5 shrink-0 ${ok ? "text-success" : "text-red-500"}`}
      />
      <p className="text-sm font-semibold text-ink-900 leading-6 flex-1">
        {toast.message}
      </p>
      <button onClick={closeToast} aria-label="بستن">
        <X className="w-4 h-4 text-ink-500" />
      </button>
    </div>
  );
}
