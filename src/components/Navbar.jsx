import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/apps", label: "Apps" },
    { path: "/installation", label: "Installation" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-dark-border backdrop-blur-md bg-dark/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center glow-sm">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
                  stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="font-display font-bold text-lg text-white group-hover:text-primary-light transition-colors">
              Hero<span className="text-primary">IO</span>
            </span>
          </Link>

          {/* Nav Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary/20 text-primary-light"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Contribution Button */}
          
         <a   href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors glow-sm"
          >
            Contribution
          </a>

        </nav>
      </div>
    </header>
  );
}