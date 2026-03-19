import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-dark-border bg-dark-card mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="font-display font-bold text-lg text-white">
                Hero<span className="text-primary">IO</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Discover, explore, and install the best apps from our curated collection.
              Your one-stop app discovery platform.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/apps", label: "All Apps" },
                { to: "/installation", label: "My Installation" },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-gray-400 text-sm hover:text-primary-light transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Store Buttons */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Download</h4>
            <div className="space-y-3">
              <a href="https://apps.apple.com" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-border hover:bg-primary/20 transition-colors group">
                <span className="text-lg">🍎</span>
                <div>
                  <div className="text-xs text-gray-500">Download on the</div>
                  <div className="text-sm font-medium text-white group-hover:text-primary-light">App Store</div>
                </div>
              </a>
              <a href="https://play.google.com" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-dark-border hover:bg-primary/20 transition-colors group">
                <span className="text-lg">▶️</span>
                <div>
                  <div className="text-xs text-gray-500">Get it on</div>
                  <div className="text-sm font-medium text-white group-hover:text-primary-light">Play Store</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-dark-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-sm">© 2025 HeroIO. All rights reserved.</p>
          <p className="text-gray-600 text-xs">Made with 💜 for Assignment 03</p>
        </div>
      </div>
    </footer>
  );
}
