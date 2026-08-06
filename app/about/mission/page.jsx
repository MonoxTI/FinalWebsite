import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export const metadata = {
  title: "Our Mission | Assembled Tutoring",
  description:
    "Our mission at Assembled Tutoring is Psychological Transformation — removing the mental blocks that make Mathematics feel impossible.",
}

const PILLARS = [
  {
    title: "Psychological Transformation",
    body: "The barrier encountered in learning is often not a lack of \"logic,\" but a psychological block. Our aim commences with addressing the Cognitive, Affective, and Metacognitive layers of learning. We use this technique to psychologically infiltrate & remove the thought(s) that certain subjects are unattainable (e.g., \"Mathematics is hard\"). Once the learner's psychological thoughts are realigned, constant engagement with the work is required.",
  },
  {
    title: "Monthly Engagement",
    body: "Mathematics requires memory — the ability to hold multiple pieces of information (like a formula, a carry-over digit, and a negative sign) all at once. Thus, for better interaction, we offer monthly subscriptions. We have noted in the past that the more interaction with the work, the easier it is for their minds to absorb fundamental underlying principles.",
  },
  {
    title: "Cognitive Offloading",
    body: "We use cognitive offloading to 'offload' the mental agony into intermediate steps that are constantly practised, and free up the 'mental script' for complex problem-solving.",
  },
  {
    title: "Psychometric Testing",
    body: "To assess whether the learner is to the standard of their grade, by identifying their loopholes from past grades, to ensure underlying principles are understood. We cannot move forward without addressing previous loopholes — a loopholed foundation collapses the next phase.",
  },
]

export default function MissionPage() {
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
          Our Philosophy
        </div>
        <h1 style={{
          fontWeight: 900,
          fontSize: "clamp(1.8rem,6vw,5.5rem)",
          lineHeight: 0.95, textTransform: "uppercase",
        }}>
           MISSION
        </h1>
      </div>

      <section style={{
        background: "#fff",
        padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,6vw,5rem)",
      }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {PILLARS.map(({ title, body }) => (
            <div key={title} style={{ marginBottom: "2.5rem" }}>
              <h2 style={{
                fontWeight: 800,
                fontSize: "clamp(1.1rem,2.5vw,1.5rem)",
                textTransform: "uppercase",
                color: "#0a1628", marginBottom: "0.75rem",
              }}>
                {title}
              </h2>
              <p style={{
                fontSize: "clamp(0.95rem,1.5vw,1.05rem)",
                lineHeight: 1.8, color: "#374151",
                textAlign: "justify",
              }}>
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  )
}
