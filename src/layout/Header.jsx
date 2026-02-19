import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS, SITE_CONFIG } from "../data/constants";
import { cn } from "../utils/cn";
import Logo from "../components/Logo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-light-50/90 backdrop-blur-md border-b border-light-200">
      <nav className="container-custom">
        <div className="flex items-center justify-between h-14">
          {/* Logo / Name */}
          <Link
            to="/"
            className="flex items-center gap-3 text-sm font-semibold text-dark-700 hover:text-accent transition-colors"
          >
            <Logo className="w-10 h-10" />
            <span className="hidden sm:inline tracking-tight text-base">
              {SITE_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "text-sm px-3 py-1.5 rounded-lg transition-all duration-200",
                    isActive
                      ? "text-accent bg-accent/5 font-medium"
                      : "text-zinc-600 hover:text-dark-700 hover:bg-light-100",
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="theme-toggle"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "md:hidden overflow-hidden transition-all duration-300 ease-out",
            isMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0",
          )}
        >
          <div className="py-4 border-t border-light-200">
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.href}
                  to={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-sm transition-all px-3 py-2 rounded-lg",
                      isActive
                        ? "text-accent bg-accent/5 font-medium"
                        : "text-zinc-600 hover:text-dark-700 hover:bg-light-100",
                    )
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
