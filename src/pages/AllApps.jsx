import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import apps from "../data/apps";

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
        <svg key={s} width="12" height="12" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B" strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

// ── App Card ─────────────────────────────────────────────
function AppCard({ app }) {
  return (
    <Link to={`/apps/${app.id}`}
      className="app-card bg-dark-card border border-dark-border rounded-2xl p-4 flex flex-col items-center text-center gap-3">
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-dark-border flex items-center justify-center">
        <img src={app.image} alt={app.title}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            e.target.src = `https://placehold.co/64x64/1A1A2E/7C3AED?text=${app.title[0]}`;
          }} />
      </div>
      <div>
        <h3 className="font-display font-semibold text-white text-sm">{app.title}</h3>
        <p className="text-gray-500 text-xs mt-0.5">{app.companyName}</p>
      </div>
      <div className="flex items-center gap-1">
        <StarRating rating={app.ratingAvg} />
        <span className="text-xs text-gray-400">{app.ratingAvg}</span>
      </div>
      <div className="text-xs text-gray-500">
        {formatDownloads(app.downloads)} downloads
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────
export default function AllApps() {
  const [search, setSearch]   = useState("");
  const [sort, setSort]       = useState("default");
  const [loading, setLoading] = useState(false);

  // Live search with simulated loading
  function handleSearch(e) {
    setLoading(true);
    setSearch(e.target.value);
    setTimeout(() => setLoading(false), 400);
  }

  // Filter + sort
  const filtered = useMemo(() => {
    let result = apps.filter((app) =>
      app.title.toLowerCase().includes(search.toLowerCase())
    );
    if (sort === "high-low") {
      result = [...result].sort((a, b) => b.downloads - a.downloads);
    } else if (sort === "low-high") {
      result = [...result].sort((a, b) => a.downloads - b.downloads);
    }
    return result;
  }, [search, sort]);

  return (
    <div className="page-enter">

      {/* ── Title Section ── */}
      <section className="bg-mesh py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse"></span>
            Browse All
          </div>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-4">
            All <span className="gradient-text">Apps</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Browse our complete collection of top-rated apps across every category.
          </p>
        </div>
      </section>

      {/* ── Search & Sort Bar ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">

          {/* Total count */}
          <p className="text-gray-400 text-sm">
            Showing{" "}
            <span className="text-white font-semibold">{filtered.length}</span>
            {" "}of{" "}
            <span className="text-white font-semibold">{apps.length}</span>
            {" "}apps
          </p>

          <div className="flex items-center gap-3 w-full sm:w-auto">

            {/* Search */}
            <div className="relative flex-1 sm:w-72">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search apps..."
                value={search}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-dark-card border border-dark-border text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary/60 transition-colors"
              />
              {/* Loading spinner inside search */}
              {loading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            {/* Sort dropdown */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-dark-card border border-dark-border text-white text-sm focus:outline-none focus:border-primary/60 transition-colors cursor-pointer"
            >
              <option value="default">Sort by</option>
              <option value="high-low">Downloads: High → Low</option>
              <option value="low-high">Downloads: Low → High</option>
            </select>

          </div>
        </div>
      </section>

      {/* ── Apps Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">

        {/* No results */}
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-xl text-white mb-2">
              No App Found
            </h3>
            <p className="text-gray-400 text-sm">
              No apps match "<span className="text-primary-light">{search}</span>".
              Try a different name.
            </p>
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filtered.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        )}

      </section>

    </div>
  );
}