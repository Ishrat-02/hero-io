import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell
} from "recharts";
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
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg key={s} width="16" height="16" viewBox="0 0 24 24"
          fill={s <= Math.round(rating) ? "#F59E0B" : "none"}
          stroke="#F59E0B" strokeWidth="2">
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
    </div>
  );
}

// ── Custom Tooltip for chart ──────────────────────────────
function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border px-3 py-2 rounded-lg text-sm">
        <p className="text-gray-400">{payload[0].payload.name}</p>
        <p className="text-white font-semibold">
          {payload[0].value.toLocaleString()} reviews
        </p>
      </div>
    );
  }
  return null;
}

// ── Stat Box ─────────────────────────────────────────────
function StatBox({ label, value }) {
  return (
    <div className="bg-dark-card border border-dark-border rounded-2xl p-4 text-center">
      <div className="font-display font-bold text-xl text-white">{value}</div>
      <div className="text-gray-400 text-xs mt-1">{label}</div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────
export default function AppDetails() {
  const { id } = useParams();
  const app = apps.find((a) => a.id === parseInt(id));

  // Check localStorage on load
  const [installed, setInstalled] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("installedApps") || "[]");
    return saved.some((a) => a.id === parseInt(id));
  });

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // App not found
  if (!app) {
    return (
      <div className="page-enter min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="text-7xl mb-6">😿</div>
        <h2 className="font-display font-bold text-2xl text-white mb-3">
          App Not Found
        </h2>
        <p className="text-gray-400 mb-6">
          This app doesn't exist or may have been removed.
        </p>
        <Link to="/apps"
          className="px-6 py-3 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-colors">
          ← Back to Apps
        </Link>
      </div>
    );
  }

  // Install handler
  function handleInstall() {
    if (installed) return;

    const saved = JSON.parse(localStorage.getItem("installedApps") || "[]");
    saved.push(app);
    localStorage.setItem("installedApps", JSON.stringify(saved));
    setInstalled(true);

    toast.success(`${app.title} installed successfully! 🎉`, {
      icon: "✅",
    });
  }

  // Chart colors — highlight 5 star
  const chartColors = ["#4B5563", "#6B7280", "#8B5CF6", "#A78BFA", "#7C3AED"];

  return (
    <div className="page-enter">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-primary-light transition-colors">Home</Link>
          <span>/</span>
          <Link to="/apps" className="hover:text-primary-light transition-colors">Apps</Link>
          <span>/</span>
          <span className="text-white">{app.title}</span>
        </div>

        {/* ── App Info Section ── */}
        <div className="bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row gap-8 items-start">

            {/* Left — image */}
            <div className="flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-32 h-32 rounded-3xl overflow-hidden bg-dark-border flex items-center justify-center glow">
                <img src={app.image} alt={app.title}
                  className="w-full h-full object-contain p-3"
                  onError={(e) => {
                    e.target.src = `https://placehold.co/128x128/1A1A2E/7C3AED?text=${app.title[0]}`;
                  }} />
              </div>
            </div>

            {/* Right — details */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="font-display font-bold text-3xl text-white mb-1">
                {app.title}
              </h1>
              <p className="text-gray-400 text-sm mb-3">{app.companyName}</p>

              <div className="flex items-center gap-2 justify-center sm:justify-start mb-6">
                <StarRating rating={app.ratingAvg} />
                <span className="text-white font-semibold">{app.ratingAvg}</span>
                <span className="text-gray-500 text-sm">
                  ({app.reviews.toLocaleString()} reviews)
                </span>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <StatBox label="Downloads" value={formatDownloads(app.downloads)} />
                <StatBox label="Reviews"   value={formatDownloads(app.reviews)} />
                <StatBox label="Size"      value={app.size + " MB"} />
              </div>

              {/* Install Button */}
              <button
                onClick={handleInstall}
                disabled={installed}
                className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all ${
                  installed
                    ? "bg-dark-border text-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary-dark glow cursor-pointer"
                }`}
              >
                {installed ? "✓ Installed" : "Install"}
              </button>
            </div>

          </div>
        </div>

        {/* ── Review Chart + Description side by side on desktop ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* Review Chart */}
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl text-white mb-6">
              Ratings & Reviews
            </h2>

            {/* Average big number */}
            <div className="flex items-center gap-4 mb-6">
              <div className="font-display font-extrabold text-5xl text-white">
                {app.ratingAvg}
              </div>
              <div>
                <StarRating rating={app.ratingAvg} />
                <p className="text-gray-400 text-xs mt-1">
                  {app.reviews.toLocaleString()} ratings
                </p>
              </div>
            </div>

            {/* Recharts Bar Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <BarChart
                data={app.ratings}
                margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2D2D4E" vertical={false} />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#9CA3AF", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => v >= 1000 ? (v/1000).toFixed(0)+"K" : v}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(124,58,237,0.1)" }} />
                <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                  {app.ratings.map((_, i) => (
                    <Cell key={i} fill={chartColors[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Description */}
          <div className="bg-dark-card border border-dark-border rounded-3xl p-6 sm:p-8">
            <h2 className="font-display font-bold text-xl text-white mb-4">
              About this App
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              {app.description}
            </p>

            {/* Extra details */}
            <div className="space-y-3 border-t border-dark-border pt-6">
              {[
                { label: "Developer",       value: app.companyName },
                { label: "Size",            value: app.size + " MB" },
                { label: "Rating",          value: app.ratingAvg + " / 5" },
                { label: "Total Downloads", value: formatDownloads(app.downloads) },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">{row.label}</span>
                  <span className="text-white text-sm font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}