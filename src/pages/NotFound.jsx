import { Link } from "react-router-dom";
import { Home, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-8xl font-black text-primary-600 mb-4">404</h1>

        <h2 className="text-3xl font-bold text-ink-900 mb-4">
          صفحه‌ای که دنبال آن بودید پیدا نشد!
        </h2>

        <p className="text-ink-500 leading-8 mb-8">
          متأسفانه صفحه‌ای که دنبال آن هستید وجود ندارد
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/"
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-xl transition"
          >
            <Home className="w-5 h-5" />
            بازگشت به خانه
          </Link>

          <button
            onClick={() => history.back()}
            className="flex items-center gap-2 border border-ink-500/20 px-6 py-3 rounded-xl hover:border-gray-400 transition"
          >
            <ArrowRight className="w-5 h-5" />
            صفحه قبل
          </button>
        </div>
      </div>
    </section>
  );
}
