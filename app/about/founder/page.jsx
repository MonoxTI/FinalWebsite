import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Our Founder | Assembled Tutoring",
  description:
    "Meet the founder of Assembled Tutoring — BCom Law and LLB graduate from the University of Pretoria.",
}

export default function FounderPage() {
  return (
    <>
      <Navbar />

      <div style={{
        background: "linear-gradient(135deg, #000 0%, #0a1628 40%, #1e3a7a 100%)",
        color: "#fff",
        padding: "clamp(5rem,10vw,8rem) clamp(1.5rem,6vw,5rem) 4rem",
        marginTop: 64,
      }}>
        <div style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700, fontSize: "0.72rem",
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: "#3b82f6", marginBottom: "0.75rem",
        }}>
          Meet the Team
        </div>
        <h1 style={{
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 900,
          fontSize: "clamp(2.5rem,7vw,5.5rem)",
          lineHeight: 0.95, textTransform: "uppercase",
        }}>
          ABOUT<br />
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: "italic", fontWeight: 400,
          }}>
            Founder
          </span>
        </h1>
      </div>

      <section style={{
        background: "#fff",
        padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,6vw,5rem)",
      }}>
        <div style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "4rem", alignItems: "start",
        }}>
          <div>
            <p style={{
              fontSize: "clamp(0.95rem,1.5vw,1.1rem)",
              lineHeight: 1.8, color: "#374151",
              marginBottom: "1.5rem",
            }}>
              A proud alumna of Pretoria High School for Girls, a BCom Law and LLB
              graduate from the University of Pretoria. She aspires to become an
              Advocate of the Republic, driven by her passion for justice and
              commitment to guiding the youth beyond the courtroom — offering career
              mentorship and transforming the belief that mathematics is complicated.
            </p>
            <p style={{
              fontSize: "clamp(0.95rem,1.5vw,1.1rem)",
              lineHeight: 1.8, color: "#374151",
            }}>
              She strongly upholds the ethos of rewiring, instilling confidence and
              unlocking the capability of any learner, especially those deemed
              inattentive.
            </p>

            <blockquote style={{
              marginTop: "2rem",
              borderLeft: "4px solid #2563b8",
              paddingLeft: "1.5rem",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "#1d4ed8",
              lineHeight: 1.7,
            }}>
              "Mathematics is a language that requires understanding the fundamentals
              & the underlying basics of all its topics."
            </blockquote>
          </div>

          <div style={{
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: "1.5rem",
          }}>
            <div style={{
              width: "100%", maxWidth: 340,
              background: "linear-gradient(135deg, #0a1628, #1d4ed8)",
              borderRadius: 12, padding: 4,
            }}>
              <img
                src="/images/pic1.png"
                alt="Founder of Assembled Tutoring"
                style={{
                  width: "100%", height: "auto",
                  objectFit: "cover", borderRadius: 10,
                  display: "block",
                }}
              />
            </div>

            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr",
              gap: "1rem", width: "100%", maxWidth: 340,
            }}>
              {[
                { label: "Qualification", value: "BCom Law + LLB" },
                { label: "University", value: "University of Pretoria" },
                { label: "School", value: "Pretoria High School for Girls" },
                { label: "Based in", value: "Pretoria, Gauteng" },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background: "#f0f4ff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 6, padding: "0.85rem",
                }}>
                  <div style={{
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700, fontSize: "0.65rem",
                    letterSpacing: "0.12em", textTransform: "uppercase",
                    color: "#6b7280", marginBottom: "0.25rem",
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontSize: "0.82rem", fontWeight: 600,
                    color: "#0a1628", lineHeight: 1.4,
                  }}>
                    {value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}