import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="page-enter min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
      <div className="text-8xl mb-6">🔍</div>
      <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-gray-400 text-lg mb-8 max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/"
        className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors glow">
        ← Back to Home
      </Link>
    </div>
  );
};