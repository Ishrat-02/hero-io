import { Link, useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="page-enter min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-20">

      {/* Big 404 */}
      <div className="relative mb-8">
        <div className="font-display font-extrabold text-[160px] sm:text-[200px] leading-none text-dark-card select-none">
          404
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="font-display font-extrabold text-[160px] sm:text-[200px] leading-none gradient-text opacity-20 select-none blur-sm">
            404
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-6xl animate-bounce">🔌</span>
        </div>
      </div>

      <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
        Page Not Found
      </h1>
      <p className="text-gray-400 text-lg mb-10 max-w-md">
        Oops! Looks like this page got lost in the app store.
        Let's get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-xl border border-dark-border text-gray-300 font-semibold hover:bg-dark-card transition-colors">
          ← Go Back
        </button>
        <Link to="/"
          className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors glow">
          🏠 Back to Home
        </Link>
      </div>

    </div>
  );
}