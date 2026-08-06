"use client"
import { useState } from "react"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const GRADES = [
  "Grade 4", "Grade 5", "Grade 6", "Grade 7",
  "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12",
]

const CURRICULA = ["CAPS", "IEB"]

const SUBJECTS = [
  "Mathematics",
  "Mathematical Literacy",
  "Physical Sciences",
  "Life Sciences",
  "Accounting",
  "English",
  "Afrikaans",
  "Geography",
]

const SERVICE_TYPES = [
  { value: "Monthly Subscription", desc: "2 hrs/week — ongoing weekly sessions" },
  { value: "Single Lesson", desc: "Once-off, book a single 2 hr session" },
]

const INITIAL_FORM = {
  fullName: "",
  email: "",
  phoneNumber: "",
  childName: "",
  school: "",
  grade: "",
  curriculum: "",
  subjects: [],
  serviceType: "",
  notes: "",
}

export default function AppointmentsPage() {
  const [form, setForm] = useState(INITIAL_FORM)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }))

  const toggleSubject = (subject) => {
    setForm((p) => ({
      ...p,
      subjects: p.subjects.includes(subject)
        ? p.subjects.filter((s) => s !== subject)
        : [...p.subjects, subject],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage(null)

    if (form.subjects.length === 0) {
      setMessage({ type: "error", text: "Please select at least one subject" })
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        setMessage({ type: "error", text: data.message || "Booking failed" })
        return
      }

      setMessage({ type: "success", text: "Appointment booked successfully ✅" })
      setForm(INITIAL_FORM)
    } catch {
      setMessage({ type: "error", text: "Server error. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1.5px solid #d1d5db",
    borderRadius: 6,
    fontSize: "0.9rem",
    fontFamily: "'Barlow', sans-serif",
    color: "#111",
    background: "#fff",
    outline: "none",
  }

  const labelStyle = {
    display: "block",
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 700,
    fontSize: "0.72rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#6b7280",
    marginBottom: "0.4rem",
  }

  const sectionLabelStyle = {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: "0.85rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "#1d4ed8",
    marginBottom: "0.9rem",
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #e5e7eb",
  }

  const chipStyle = (active) => ({
    display: "flex", alignItems: "center", gap: "0.5rem",
    padding: "0.6rem 0.9rem",
    border: `1.5px solid ${active ? "#1e3a7a" : "#d1d5db"}`,
    background: active ? "#eff6ff" : "#fff",
    borderRadius: 6,
    cursor: "pointer",
    fontSize: "0.85rem",
    color: active ? "#1e3a7a" : "#374151",
    fontWeight: active ? 700 : 500,
    transition: "all 0.15s",
    userSelect: "none",
  })

  return (
    <>
      <Navbar />

      {/* Page header */}
      <div style={{
        background: "linear-gradient(135deg, #000 0%, #0a1628 40%, #1e3a7a 100%)",
        color: "#fff",
        padding: "clamp(4rem,8vw,6rem) clamp(1.5rem,6vw,5rem) 3rem",
        marginTop: 64,
      }}>
        <h1 style={{
          fontWeight: 900, fontSize: "clamp(1.8rem,6vw,4.5rem)",
          lineHeight: 0.95, letterSpacing: "-0.02em",
        }}>
          BOOK A SESSION
        </h1>
      </div>

      <main style={{
        background: "#f0f4ff",
        minHeight: "60vh",
        padding: "3rem clamp(1rem,4vw,2rem)",
        fontFamily: "'Barlow', sans-serif",
      }}>
        <div style={{
          maxWidth: 600,
          margin: "0 auto",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          padding: "2.5rem clamp(1.25rem,4vw,2.5rem)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
        }}>
          <h2 style={{
            fontWeight: 900, fontSize: "1.3rem",
            textTransform: "uppercase",
            color: "#0a1628", marginBottom: "2rem",
          }}>
            Appointment Details
          </h2>

          {/* Status message */}
          {message && (
            <div style={{
              background: message.type === "success" ? "#f0fdf4" : "#fef2f2",
              border: `1px solid ${message.type === "success" ? "#bbf7d0" : "#fecaca"}`,
              color: message.type === "success" ? "#15803d" : "#b91c1c",
              padding: "0.85rem 1rem",
              borderRadius: 6, fontSize: "0.875rem",
              marginBottom: "1.5rem", textAlign: "center",
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

            {/* Parent details */}
            <div>
              <div style={sectionLabelStyle}>Parent Details</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={labelStyle}>Parent Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    placeholder="Parent / guardian's full name"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Parent Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Parent Phone Number</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    placeholder="e.g. 084 727 7408"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Child details */}
            <div>
              <div style={sectionLabelStyle}>Child Details</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
                <div>
                  <label style={labelStyle}>Child Full Name</label>
                  <input
                    type="text"
                    name="childName"
                    value={form.childName}
                    onChange={handleChange}
                    placeholder="Child's full name"
                    required
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>School</label>
                  <input
                    type="text"
                    name="school"
                    value={form.school}
                    onChange={handleChange}
                    placeholder="Child's current school"
                    required
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Grade */}
            <div>
              <div style={sectionLabelStyle}>Grade</div>
              <select
                name="grade"
                value={form.grade}
                onChange={handleChange}
                required
                style={{ ...inputStyle, appearance: "none" }}
              >
                <option value="">Select the child's grade</option>
                {GRADES.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            {/* Curriculum */}
            <div>
              <div style={sectionLabelStyle}>Curriculum</div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {CURRICULA.map((c) => (
                  <label key={c} style={chipStyle(form.curriculum === c)}>
                    <input
                      type="radio"
                      name="curriculum"
                      value={c}
                      checked={form.curriculum === c}
                      onChange={handleChange}
                      required
                      style={{ margin: 0 }}
                    />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            {/* Subjects needed */}
            <div>
              <div style={sectionLabelStyle}>Subjects Needed</div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                gap: "0.6rem",
              }}>
                {SUBJECTS.map((subject) => (
                  <label key={subject} style={chipStyle(form.subjects.includes(subject))}>
                    <input
                      type="checkbox"
                      checked={form.subjects.includes(subject)}
                      onChange={() => toggleSubject(subject)}
                      style={{ margin: 0 }}
                    />
                    {subject}
                  </label>
                ))}
              </div>
              {form.subjects.length === 0 && (
                <p style={{ fontSize: "0.78rem", color: "#9ca3af", marginTop: "0.5rem" }}>
                  Select at least one subject
                </p>
              )}
            </div>

            {/* Service type */}
            <div>
              <div style={sectionLabelStyle}>Service</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {SERVICE_TYPES.map(({ value, desc }) => (
                  <label
                    key={value}
                    style={{
                      display: "flex", alignItems: "flex-start", gap: "0.75rem",
                      padding: "0.85rem 1rem",
                      border: `1.5px solid ${form.serviceType === value ? "#1e3a7a" : "#d1d5db"}`,
                      background: form.serviceType === value ? "#eff6ff" : "#fff",
                      borderRadius: 6, cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <input
                      type="radio"
                      name="serviceType"
                      value={value}
                      checked={form.serviceType === value}
                      onChange={handleChange}
                      required
                      style={{ marginTop: 3 }}
                    />
                    <div>
                      <div style={{
                        fontFamily: "'Barlow Condensed', sans-serif",
                        fontWeight: 700, fontSize: "0.9rem",
                        color: form.serviceType === value ? "#1e3a7a" : "#111",
                      }}>
                        {value}
                      </div>
                      <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: 2 }}>
                        {desc}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Additional notes */}
            <div>
              <div style={sectionLabelStyle}>Additional Notes</div>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Anything else we should know? (availability, special requirements...)"
                rows={4}
                maxLength={500}
                style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
              />
              <p style={{ fontSize: "0.75rem", color: "#9ca3af", textAlign: "right", marginTop: "0.3rem" }}>
                {form.notes.length}/500
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? "#93c5fd" : "#1e3a7a",
                color: "#fff", border: "none",
                padding: "0.95rem",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 800, fontSize: "0.95rem",
                letterSpacing: "0.12em", textTransform: "uppercase",
                borderRadius: 6,
                cursor: loading ? "not-allowed" : "pointer",
                transition: "background 0.2s",
                marginTop: "0.5rem",
              }}
            >
              {loading ? "BOOKING..." : "CONFIRM BOOKING →"}
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </>
  )
}