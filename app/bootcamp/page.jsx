import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import Link from "next/link"

export const metadata = {
  title: "Bootcamp | Assembled Tutoring",
  description:
    "Intensive maths bootcamp sessions in Pretoria. Perfect for exam preparation and catching up on missed content.",
}

export default function BootcampPage() {
  return (
    <>
      <Navbar />

      <div style={{
        background: "linear-gradient(135deg, #000 0%, #0a1628 40%, #1e3a7a 100%)",
        color: "#fff",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,5rem) 4rem",
        marginTop: 64,
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "-20%", right: "-10%",
          width: "40vw", height: "40vw",
          background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
          borderRadius: "50%", pointerEvents: "none",
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700 }}>
          <div style={{
            display: "inline-block",
            background: "rgba(59,130,246,0.2)",
            border: "1px solid rgba(59,130,246,0.4)",
            color: "#60a5fa",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "0.4rem 1rem", marginBottom: "1.5rem",
            borderRadius: 4,
          }}>
            🚀 Intensive Learning
          </div>
          <h1 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900,
            fontSize: "clamp(2.5rem,7vw,5.5rem)",
            lineHeight: 0.95, textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            MATHS<br />
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontStyle: "italic", fontWeight: 400,
            }}>
              Bootcamp
            </span>
          </h1>
          <p style={{
            fontSize: "clamp(1rem,2vw,1.15rem)",
            color: "rgba(255,255,255,0.7)",
            lineHeight: 1.7, maxWidth: 540,
            marginBottom: "2.5rem",
          }}>
            Intensive exam preparation sessions designed to cover maximum content
            in minimum time. Perfect for students approaching trials or final exams.
          </p>
          <Link href="/appointments" style={{
            background: "#2563b8", color: "#fff",
            padding: "0.95rem 2.5rem",
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800, fontSize: "0.95rem",
            letterSpacing: "0.12em", textTransform: "uppercase",
            borderRadius: 4, textDecoration: "none",
            display: "inline-block",
          }}>
            BOOK BOOTCAMP →
          </Link>
        </div>
      </div>

      {/* What's included */}
      <section style={{
        background: "#fff",
        padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,6vw,5rem)",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 700, fontSize: "0.72rem",
            letterSpacing: "0.2em", textTransform: "uppercase",
            color: "#2563b8", marginBottom: "0.5rem",
          }}>
            What's Included
          </div>
          <h2 style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)",
            textTransform: "uppercase", color: "#0a1628",
            marginBottom: "2.5rem",
          }}>
            BOOTCAMP STRUCTURE
          </h2>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem", marginBottom: "3rem",
          }}>
            {[
              { icon: "⚡", title: "Intensive Sessions", desc: "3–5 hour focused sessions covering entire topics in one sitting." },
              { icon: "📋", title: "Past Papers", desc: "Work through past exam papers with detailed explanations for every question." },
              { icon: "🎯", title: "Exam Technique", desc: "Learn how to approach questions strategically to maximise marks." },
              { icon: "📱", title: "Post-Session Support", desc: "WhatsApp support for 48 hours after each bootcamp session." },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{
                background: "#f0f4ff",
                border: "1px solid #e5e7eb",
                borderTop: "4px solid #2563b8",
                padding: "1.75rem",
                borderRadius: 8,
              }}>
                <div style={{ fontSize: "1.75rem", marginBottom: "1rem" }}>{icon}</div>
                <div style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontWeight: 800, fontSize: "1rem",
                  textTransform: "uppercase", color: "#0a1628",
                  marginBottom: "0.5rem",
                }}>
                  {title}
                </div>
                <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "#6b7280" }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div style={{
            background: "linear-gradient(135deg, #000 0%, #0a1628 40%, #1d4ed8 100%)",
            color: "#fff", borderRadius: 12,
            padding: "3rem clamp(1.5rem,4vw,3rem)",
          }}>
            <h3 style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900, fontSize: "1.5rem",
              textTransform: "uppercase", marginBottom: "1.5rem",
            }}>
              Bootcamp Pricing
            </h3>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}>
              {[
                { label: "Half Day (3 hrs)", price: "R800", desc: "One paper focus" },
                { label: "Full Day (6 hrs)", price: "R1 400", desc: "Both papers covered" },
                { label: "Weekend Intensive", price: "R2 500", desc: "Sat + Sun full days" },
              ].map(({ label, price, desc }) => (
                <div key={label} style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(59,130,246,0.3)",
                  borderRadius: 8, padding: "1.5rem",
                  textAlign: "center",
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: "0.75rem",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.5)", marginBottom: "0.5rem",
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 900, fontSize: "2rem",
                    color: "#60a5fa", marginBottom: "0.25rem",
                  }}>
                    {price}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.5)" }}>
                    {desc}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: "2rem", textAlign: "center" }}>
              <Link href="/appointments" style={{
                background: "#2563b8", color: "#fff",
                padding: "0.95rem 2.5rem",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: "0.95rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                borderRadius: 4, textDecoration: "none",
                display: "inline-block",
              }}>
                RESERVE YOUR SPOT →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}