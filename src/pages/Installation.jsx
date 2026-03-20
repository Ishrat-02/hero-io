import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

// ── Helpers ──────────────────────────────────────────────
function formatDownloads(n) {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B+";
  if (n >= 1_000_000)     return (n / 1_000_000).toFixed(1) + "M+";
  if (n >= 1_000)         return (n / 1_000).toFixed(0) + "K+";
  return n.toString();
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="13" height="13" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B" strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

// ── Installed App Card ────────────────────────────────────
function InstalledCard({ app, onUninstall }) {
  return (
    <div className="app-card bg-dark-card border border-dark-border rounded-2xl p-5 flex items-center gap-4">

      {/* App image */}
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-dark-border flex items-center justify-center flex-shrink-0">
        <img src={app.image} alt={app.title}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            e.target.src = `https://placehold.co/64x64/1A1A2E/7C3AED?text=${app.title[0]}`;
          }} />
      </div>

      {/* App info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-display font-semibold text-white text-sm truncate">
          {app.title}
        </h3>
        <p className="text-gray-500 text-xs mt-0.5 truncate">{app.companyName}</p>
        <div className="flex items-center gap-2 mt-1.5">
          <StarRating rating={app.ratingAvg} />
          <span className="text-gray-400 text-xs">{app.ratingAvg}</span>
          <span className="text-gray-600 text-xs">•</span>
          <span className="text-gray-500 text-xs">{formatDownloads(app.downloads)} downloads</span>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 flex-shrink-0">
        <Link to={`/apps/${app.id}`}
          className="px-3 py-1.5 rounded-lg border border-primary/40 text-primary-light text-xs font-medium hover:bg-primary/10 transition-colors text-center">
          Details
        </Link>
        <button
          onClick={() => onUninstall(app)}
          className="px-3 py-1.5 rounded-lg border border-red-500/40 text-red-400 text-xs font-medium hover:bg-red-500/10 transition-colors cursor-pointer">
          Uninstall
        </button>
      </div>

    </div>
  );
}

// ── Page ─────────────────────────────────────────────────
export default function Installation() {
  const [installedApps, setInstalledApps] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("installedApps") || "[]");
    setInstalledApps(saved);
  }, []);

  // Uninstall handler
  function handleUninstall(app) {
    const updated = installedApps.filter((a) => a.id !== app.id);
    setInstalledApps(updated);
    localStorage.setItem("installedApps", JSON.stringify(updated));

    toast.error(`${app.title} has been uninstalled.`, {
      icon: "🗑️",
    });
  }

  return (
    <div className="page-enter">

      {/* ── Title Section ── */}
      <section className="bg-mesh py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse"></span>
            My Library
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            My <span className="gradient-text">Installation</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            All your installed apps in one place. Manage and uninstall anytime.
          </p>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-20">

        {/* Empty state */}
        {installedApps.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-primary/20 flex items-center justify-center text-5xl mb-6">
              📭
            </div>
            <h3 className="font-display font-bold text-2xl text-white mb-3">
              No Apps Installed
            </h3>
            <p className="text-gray-400 text-sm mb-8 max-w-sm">
              You haven't installed any apps yet. Browse our collection and install your favorites!
            </p>
            <Link to="/apps"
              className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors glow">
              Browse Apps →
            </Link>
          </div>
        )}

        {/* Installed apps */}
        {installedApps.length > 0 && (
          <>
            {/* Count bar */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-400 text-sm">
                <span className="text-white font-semibold">{installedApps.length}</span>
                {" "}app{installedApps.length !== 1 ? "s" : ""} installed
              </p>
              <Link to="/apps"
                className="text-primary-light text-sm hover:underline">
                + Install More
              </Link>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {installedApps.map((app) => (
                <InstalledCard
                  key={app.id}
                  app={app}
                  onUninstall={handleUninstall}
                />
              ))}
            </div>
          </>
        )}

      </section>

    </div>
  );
}