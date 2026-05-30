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

  // ── Close dropdown when clicking outside ────────────
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // ── Close mobile menu on route change ───────────────
  useEffect(() => {
    setMenuOpen(false)
    setAboutOpen(false)
  }, [pathname])

  const handleLogout = () => {
    setMenuOpen(false)
    logout(router)
  }

  const isActive = (href) => pathname === href

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

  return (
    <>
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

        {/* Desktop links */}
        <div style={{
          display: "flex", alignItems: "center",
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
                background: (isActive("/about/mission") || isActive("/about/founder") || aboutOpen)
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

            {/* Dropdown menu */}
            {aboutOpen && (
              <div style={{
                position: "absolute", top: "calc(100% + 0.5rem)",
                left: 0, minWidth: 180,
                background: "#0a1628",
                border: "1px solid rgba(59,130,246,0.3)",
                borderRadius: 8,
                overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
                zIndex: 1000,
              }}>
                <Link
                  href="/about/mission"
                  onClick={() => setAboutOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.85rem 1.25rem",
                    color: "#fff", textDecoration: "none",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600, fontSize: "0.85rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    borderBottom: "1px solid rgba(59,130,246,0.15)",
                    transition: "background 0.15s",
                    background: isActive("/about/mission")
                      ? "rgba(59,130,246,0.2)"
                      : "transparent",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = isActive("/about/mission") ? "rgba(59,130,246,0.2)" : "transparent"}
                >
                  <span style={{ fontSize: "1rem" }}>🎯</span>
                  <div>
                    <div>Mission</div>
                    <div style={{
                      fontSize: "0.7rem", color: "rgba(255,255,255,0.45)",
                      fontWeight: 400, letterSpacing: "0.04em",
                      textTransform: "none", marginTop: 2,
                    }}>
                      Our philosophy & approach
                    </div>
                  </div>
                </Link>

                <Link
                  href="/about/founder"
                  onClick={() => setAboutOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: "0.75rem",
                    padding: "0.85rem 1.25rem",
                    color: "#fff", textDecoration: "none",
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 600, fontSize: "0.85rem",
                    letterSpacing: "0.08em", textTransform: "uppercase",
                    transition: "background 0.15s",
                    background: isActive("/about/founder")
                      ? "rgba(59,130,246,0.2)"
                      : "transparent",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = isActive("/about/founder") ? "rgba(59,130,246,0.2)" : "transparent"}
                >
                  <span style={{ fontSize: "1rem" }}>👩‍🎓</span>
                  <div>
                    <div>Founder</div>
                    <div style={{
                      fontSize: "0.7rem", color: "rgba(255,255,255,0.45)",
                      fontWeight: 400, letterSpacing: "0.04em",
                      textTransform: "none", marginTop: 2,
                    }}>
                      Meet the team
                    </div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Services */}
          <Link href="/services" style={linkStyle("/services")}>Services</Link>

          {/* Bootcamp */}
          <Link href="/bootcamp" style={{
            ...linkStyle("/bootcamp"),
            background: isActive("/bootcamp")
              ? "rgba(59,130,246,0.3)"
              : "rgba(59,130,246,0.15)",
            border: "1px solid rgba(59,130,246,0.4)",
            borderRadius: 6,
          }}>
            🚀 Bootcamp
          </Link>

          {/* Appointments */}
          <Link href="/appointments" style={linkStyle("/appointments")}>
            Book a Session
          </Link>

          {/* Contact */}
          <Link href="/contact" style={linkStyle("/contact")}>Contact</Link>

          {/* Logged in + approved */}
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

          {/* Pending */}
          {user?.role === "pending" && (
            <>
              <span style={{
                color: "#fbbf24",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700, fontSize: "0.8rem",
                letterSpacing: "0.1em", padding: "0 0.5rem",
              }}>
                ⏳ PENDING
              </span>
              <button onClick={handleLogout} style={linkStyle("")}>Logout</button>
            </>
          )}

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              background: "none", border: "none",
              color: "#fff", cursor: "pointer", padding: "0.5rem",
              fontSize: "1.25rem",
            }}
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 998,
          background: "#0a1628",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem 1.5rem",
          display: "flex", flexDirection: "column", gap: "0.25rem",
          maxHeight: "calc(100vh - 64px)",
          overflowY: "auto",
        }}>
          {[
            { href: "/", label: "Home" },
            { href: "/services", label: "Services" },
            { href: "/bootcamp", label: "🚀 Bootcamp" },
            { href: "/appointments", label: "Book a Session" },
            { href: "/contact", label: "Contact" },
          ].map(({ href, label }) => (
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

          {/* About section in mobile */}
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
            {[
              { href: "/about/mission", label: "🎯 Mission" },
              { href: "/about/founder", label: "👩‍🎓 Founder" },
            ].map(({ href, label }) => (
              <Link
                key={href} href={href}
                onClick={() => setMenuOpen(false)}
                style={{
                  ...linkStyle(href),
                  display: "block", width: "100%",
                  padding: "0.65rem 1rem",
                }}
              >
                {label}
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
        </div>
      )}
    </>
  )
}