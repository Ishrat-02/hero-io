import { Link } from "react-router-dom";
import apps from "../data/apps";

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

function AppCard({ app }) {
  return (
    <Link to={`/apps/${app.id}`}
      className="app-card bg-dark-card border border-dark-border rounded-2xl p-4 flex flex-col items-center text-center gap-3 cursor-pointer">
      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-dark-border flex items-center justify-center">
        <img src={app.image} alt={app.title}
          className="w-full h-full object-contain p-1"
          onError={(e) => {
            e.target.src = `https://placehold.co/64x64/1A1A2E/7C3AED?text=${app.title[0]}`;
          }} />
      </div>
      <div>
        <h3 className="font-display font-semibold text-white text-sm">{app.title}</h3>
        <p className="text-gray-500 text-xs mt-0.5">{formatDownloads(app.downloads)} downloads</p>
      </div>
      <div className="flex items-center gap-1">
        <StarRating rating={app.ratingAvg} />
        <span className="text-xs text-gray-400">{app.ratingAvg}</span>
      </div>
    </Link>
  );
}

function StatCard({ icon, value, label }) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-6 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-2xl flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-display font-bold text-2xl text-white">{value}</div>
        <div className="text-gray-400 text-sm">{label}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const topApps = apps.slice(0, 8);
  const totalDownloads = apps.reduce((sum, a) => sum + a.downloads, 0);
  const totalReviews   = apps.reduce((sum, a) => sum + a.reviews, 0);

  return (
    <div className="page-enter">

      {/* ── Banner ── */}
      <section className="bg-mesh min-h-[520px] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary-light text-xs font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-light animate-pulse"></span>
              #1 App Discovery Platform
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
              Discover the{" "}
              <span className="gradient-text">Best Apps</span>{" "}
              for You
            </h1>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              Explore thousands of top-rated apps handpicked for every need.
              From productivity to entertainment — find your next favorite app.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://apps.apple.com" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-white text-dark font-semibold hover:bg-gray-100 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                App Store
              </a>
              <a href="https://play.google.com" target="_blank" rel="noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors glow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.37.6 1.23 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z"/>
                </svg>
                Play Store
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard icon="⬇️" value={formatDownloads(totalDownloads)} label="Total Downloads" />
          <StatCard icon="⭐" value={apps.length + "+"} label="Top Rated Apps" />
          <StatCard icon="💬" value={formatDownloads(totalReviews)} label="User Reviews" />
        </div>
      </section>

      {/* ── Top Apps ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
              Top Apps
            </h2>
            <p className="text-gray-400 text-sm mt-1">Most downloaded apps this week</p>
          </div>
          <Link to="/apps"
            className="px-4 py-2 rounded-lg border border-primary/40 text-primary-light text-sm font-medium hover:bg-primary/10 transition-colors">
            Show All →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {topApps.map((app) => (
            <AppCard key={app.id} app={app} />
          ))}
        </div>
      </section>

    </div>
  );
}