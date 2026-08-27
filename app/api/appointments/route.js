import { connectDB } from "@/lib/mongodb";
import { AppointmentModel } from "@/models/DB";
import { getAuthUser, unauthorized, forbidden } from "@/lib/auth";
import { sendEmail } from "@/lib/email";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_GRADES = [
  "Grade 4", "Grade 5", "Grade 6", "Grade 7",
  "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12",
];

const VALID_CURRICULA = ["CAPS", "IEB"];
const VALID_SERVICE_TYPES = ["Monthly Subscription", "Single Lesson"];

/* ─── POST /api/appointments ─────────────────── 
   Public — anyone can book. Form captures:
     - Parent details (fullName, email, phoneNumber)
     - Child details (childName, school)
     - Grade
     - Curriculum (CAPS / IEB)
     - Subjects needed
     - Service type (Monthly Subscription / Single Lesson)
     - Additional notes (optional)                */
export async function POST(req) {
  try {
    const {
      fullName, email, phoneNumber,
      childName, school, grade,
      curriculum, subjects, serviceType, notes,
    } = await req.json();

    if (
      !fullName?.trim() || !email?.trim() || !phoneNumber ||
      !childName?.trim() || !school?.trim() || !grade?.trim() ||
      !curriculum?.trim() || !serviceType?.trim() ||
      !Array.isArray(subjects) || subjects.length === 0
    ) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Invalid email format" },
        { status: 400 }
      );
    }

    const phoneClean = String(phoneNumber).replace(/\D/g, "");
    if (phoneClean.length < 9 || phoneClean.length > 15) {
      return Response.json(
        { success: false, message: "Invalid phone number" },
        { status: 400 }
      );
    }

    if (!VALID_GRADES.includes(grade.trim())) {
      return Response.json(
        { success: false, message: "Invalid grade selected" },
        { status: 400 }
      );
    }

    if (!VALID_CURRICULA.includes(curriculum.trim())) {
      return Response.json(
        { success: false, message: "Invalid curriculum selected" },
        { status: 400 }
      );
    }

    if (!VALID_SERVICE_TYPES.includes(serviceType.trim())) {
      return Response.json(
        { success: false, message: "Invalid service type selected" },
        { status: 400 }
      );
    }

    await connectDB();

    const appointment = await AppointmentModel.create({
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneClean,
      childName: childName.trim(),
      school: school.trim(),
      grade: grade.trim(),
      curriculum: curriculum.trim(),
      subjects: subjects.map((s) => s.trim()).filter(Boolean),
      serviceType: serviceType.trim(),
      notes: notes?.trim() || "",
    });

    // ── Notify admin that a new booking has come in ──────
    // Non-blocking: booking still succeeds even if the email fails to send.
    const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;
    if (adminEmail) {
      try {
        await sendEmail({
          to: adminEmail,
          subject: `New Booking — ${childName.trim()} (${grade.trim()})`,
          html: `
            <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#333">
              <h2 style="color:#1d4ed8">📅 New Appointment Booked</h2>
              <table style="width:100%;border-collapse:collapse">
                <tr><td><strong>Parent Name:</strong></td><td>${fullName.trim()}</td></tr>
                <tr><td><strong>Parent Email:</strong></td><td>${email.trim()}</td></tr>
                <tr><td><strong>Parent Phone:</strong></td><td>${phoneClean}</td></tr>
                <tr><td><strong>Child Name:</strong></td><td>${childName.trim()}</td></tr>
                <tr><td><strong>School:</strong></td><td>${school.trim()}</td></tr>
                <tr><td><strong>Grade:</strong></td><td>${grade.trim()}</td></tr>
                <tr><td><strong>Curriculum:</strong></td><td>${curriculum.trim()}</td></tr>
                <tr><td><strong>Subjects:</strong></td><td>${subjects.join(", ")}</td></tr>
                <tr><td><strong>Service:</strong></td><td>${serviceType.trim()}</td></tr>
                <tr><td><strong>Notes:</strong></td><td>${notes?.trim() || "—"}</td></tr>
              </table>
              <p style="margin-top:1rem">Log in to the tutor dashboard to view full details.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Admin notification email failed:", emailError.message);
      }
    }
    try {
  await sendEmail({
    to: email.trim().toLowerCase(),
    subject: "Appointment request received",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#333">
        <h2>Thank you for your booking request</h2>
        <p>Hi ${fullName.trim()},</p>
        <p>We received your appointment request for ${childName.trim()}.</p>
        <p>Our team will review the details and contact you shortly.</p>
        <p>Regards,<br>Assembled Tutoring</p>
      </div>
    `,
  });
} catch (error) {
  console.error("Parent confirmation email failed:", error.message);
}

    return Response.json(
      { success: true, message: "Appointment created", data: appointment },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}

/* ─── GET /api/appointments ──────────────────── 
   Protected — only logged-in users with access  */
export async function GET(req) {
  const user = await getAuthUser(req)
  if (!user) return unauthorized()
  if (!user.hasAccess()) return forbidden("Account pending approval")

  await connectDB()

  const appointments = await AppointmentModel.find().sort({ createdAt: -1 })

  // ── Must be a flat array under data ─────────────────
  return Response.json({
    success: true,
    data: appointments,   // ← flat array, not nested
  })
}

/* ── DELETE /api/appointments ────────────────────
   Admin only — deletes every appointment          */
export async function DELETE(req) {
  const user = await getAuthUser(req)
  if (!user) return unauthorized()

  // ── Only admins can delete everything ───────────
  if (!user.isAdmin()) {
    return forbidden("Admin access required")
  }

  await connectDB()

  await AppointmentModel.deleteMany({})

  return Response.json({
    success: true,
    message: "All appointments deleted",
  })
}