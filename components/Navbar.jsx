"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { logout } from "@/lib/useAuth"

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [user, setUser] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const aboutRef = useRef(null)

  useEffect(() => {
    const read = () => {
      const str = localStorage.getItem("user")
      setUser(str ? JSON.parse(str) : null)
    }
    read()
    window.addEventListener("storage", read)
    return () => window.removeEventListener("storage", read)
  }, [])

  useEffect(() => {
    const str = localStorage.getItem("user")
    setUser(str ? JSON.parse(str) : null)
  }, [pathname])

  // ── Close About dropdown when clicking outside ──────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ── Close menus on route change ─────────────────────
  useEffect(() => {
    setMenuOpen(false)
    setAboutOpen(false)
  }, [pathname])

  const handleLogout = () => {
    setMenuOpen(false)
    logout(router)
  }

  const isActive = (href) => pathname === href
  const isAboutActive = pathname === "/about/mission" || pathname === "/about/founder"

  const linkStyle = (href) => ({
    padding: "0.5rem 0.85rem",
    borderRadius: 6,
    background: isActive(href) ? "rgba(255,255,255,0.15)" : "transparent",
    color: "#fff",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 600,
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
    textDecoration: "none",
    display: "inline-block",
    whiteSpace: "nowrap",
  })

  // Links shown flat on desktop, either side of the About dropdown
  const NAV_ITEMS = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    //{ href: "/bootcamp", label: " Bootcamp", highlight: true },
    { href: "/appointments", label: "Book a Session" },
    { href: "/contact", label: "Contact" },
  ]

  const ABOUT_ITEMS = [
    { href: "/about/mission", label: "Mission", },
    //{ href: "/about/founder", label: "Founder", },
  ]

  return (
    <>
      {/* Breakpoint: below 900px → hamburger + collapsible menu.
          900px and above → flat links + an About dropdown, no hamburger. */}
      <style>{`
        .nav-desktop-links { display: none; }
        .nav-hamburger-btn { display: inline-flex; }
        .nav-mobile-menu { display: flex; }
        @media (min-width: 900px) {
          .nav-desktop-links { display: flex !important; }
          .nav-hamburger-btn { display: none !important; }
          .nav-mobile-menu { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 999,
        background: "linear-gradient(90deg, #000 0%, #0a1628 50%, #1d4ed8 100%)",
        borderBottom: "2px solid rgba(255,255,255,0.2)",
        padding: "0 clamp(1rem,4vw,3rem)",
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontFamily: "'Barlow', sans-serif",
      }}>

        {/* Logo */}
        <Link href="/" style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900, fontSize: "1.3rem",
          color: "#fff", letterSpacing: "0.05em",
          textDecoration: "none", whiteSpace: "nowrap",
        }}>
          ASSEMBLED<span style={{ color: "#3b82f6" }}>.</span>
        </Link>

        {/* Desktop / laptop — flat links + one About dropdown */}
        <div className="nav-desktop-links" style={{
          alignItems: "center",
          gap: "0.25rem", flexWrap: "wrap",
        }}>
          {/* Home */}
          <Link href="/" style={linkStyle("/")}>Home</Link>

          {/* About dropdown */}
          <div ref={aboutRef} style={{ position: "relative" }}>
            <button
              onClick={() => setAboutOpen((o) => !o)}
              style={{
                ...linkStyle("/about"),
                display: "flex", alignItems: "center", gap: "0.35rem",
                background: (isAboutActive || aboutOpen)
                  ? "rgba(255,255,255,0.15)"
                  : "transparent",
              }}
            >
              About
              <span style={{
                fontSize: "0.6rem",
                transform: aboutOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.2s",
                display: "inline-block",
              }}>
                ▼
              </span>
            </button>

            {aboutOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 0.5rem)",
                left: 0, minWidth: 200,
                background: "#0a1628",
                border: "1px solid rgba(59,130,246,0.3)",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                zIndex: 1000,
              }}>
                {ABOUT_ITEMS.map(({ href, label, icon, desc }, i) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setAboutOpen(false)}
                    style={{
                      display: "flex", alignItems: "center", gap: "0.75rem",
                      padding: "0.85rem 1.25rem",
                      color: "#fff", textDecoration: "none",
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 600, fontSize: "0.85rem",
                      letterSpacing: "0.08em", textTransform: "uppercase",
                      borderBottom: i === 0 ? "1px solid rgba(59,130,246,0.15)" : "none",
                      transition: "background 0.15s",
                      background: isActive(href) ? "rgba(59,130,246,0.2)" : "transparent",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.15)"}
                    onMouseLeave={e => e.currentTarget.style.background = isActive(href) ? "rgba(59,130,246,0.2)" : "transparent"}
                  >
                    <span style={{ fontSize: "1rem" }}>{icon}</span>
                    <div>
                      <div>{label}</div>
                      <div style={{
                        fontSize: "0.7rem", color: "rgba(255,255,255,0.45)",
                        fontWeight: 400, letterSpacing: "0.04em",
                        textTransform: "none", marginTop: 2,
                      }}>
                        {desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Remaining flat links */}
          {NAV_ITEMS.filter(i => i.href !== "/").map(({ href, label, highlight }) => (
            <Link
              key={href}
              href={href}
              style={highlight ? {
                ...linkStyle(href),
                background: isActive(href) ? "rgba(59,130,246,0.3)" : "rgba(59,130,246,0.15)",
                border: "1px solid rgba(59,130,246,0.4)",
                borderRadius: 6,
              } : linkStyle(href)}
            >
              {label}
            </Link>
          ))}

          {user && user.role !== "pending" && (
            <>
              <Link
                href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/tutor"}
                style={{
                  ...linkStyle("/dashboard"),
                  background: "rgba(255,255,255,0.9)",
                  color: "#1e3a7a", fontWeight: 700,
                }}
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} style={linkStyle("")}>
                Logout
              </button>
            </>
          )}

          {user?.role === "pending" && (
            <>
              <span style={{
                color: "#fbbf24",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "0.8rem",
                letterSpacing: "0.1em", padding: "0 0.5rem",
              }}>
                 PENDING
              </span>
              <button onClick={handleLogout} style={linkStyle("")}>Logout</button>
            </>
          )}
        </div>

        {/* Mobile / small screens — hamburger toggles the menu below */}
        <button
          className="nav-hamburger-btn"
          onClick={() => setMenuOpen((o) => !o)}
          style={{
            background: "none", border: "none",
            color: "#fff", cursor: "pointer", padding: "0.5rem",
            fontSize: "1.25rem", alignItems: "center", justifyContent: "center",
          }}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile dropdown menu — only ever shown on small screens */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 998,
          background: "#0a1628",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem 1.5rem",
          flexDirection: "column", gap: "0.25rem",
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
        }}>
          {NAV_ITEMS.map(({ href, label }) => (
            <Link
              key={href} href={href}
              onClick={() => setMenuOpen(false)}
              style={{
                ...linkStyle(href),
                display: "block", width: "100%",
                padding: "0.75rem 1rem",
              }}
            >
              {label}
            </Link>
          ))}

          {/* About section in mobile — flat list under a heading */}
          <div style={{
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: "0.5rem", marginTop: "0.25rem",
          }}>
            <div style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700, fontSize: "0.7rem",
              letterSpacing: "0.15em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.4)",
              padding: "0.5rem 1rem",
            }}>
              About
            </div>
            {ABOUT_ITEMS.map(({ href, label, icon }) => (
              <Link
                key={href} href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  ...linkStyle(href),
                  display: "block", width: "100%",
                  padding: "0.65rem 1rem",
                }}
              >
                {icon} {label}
              </Link>
            ))}
          </div>

          {user && user.role !== "pending" && (
            <>
              <Link
                href={user.role === "admin" ? "/dashboard/admin" : "/dashboard/tutor"}
                onClick={() => setMenuOpen(false)}
                style={{
                  ...linkStyle(""),
                  display: "block", width: "100%",
                  background: "rgba(255,255,255,0.15)",
                  padding: "0.75rem 1rem",
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  ...linkStyle(""),
                  width: "100%", textAlign: "left",
                  padding: "0.75rem 1rem",
                }}
              >
                Logout
              </button>
            </>
          )}

          {user?.role === "pending" && (
            <>
              <span style={{
                color: "#fbbf24",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "0.8rem",
                letterSpacing: "0.1em", padding: "0.75rem 1rem", display: "block",
              }}>
                ⏳ PENDING APPROVAL
              </span>
              <button
                onClick={handleLogout}
                style={{
                  ...linkStyle(""),
                  width: "100%", textAlign: "left",
                  padding: "0.75rem 1rem",
                }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </>
  )
}