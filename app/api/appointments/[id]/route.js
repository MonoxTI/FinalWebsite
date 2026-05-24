import { connectDB } from "@/lib/mongodb"
import { AppointmentModel, AppointmentDetailsModel } from "@/models/DB"
import { getAuthUser, unauthorized, forbidden } from "@/lib/auth"
import { sendEmail } from "@/lib/email"
import { randomUUID } from "crypto"

/* ── GET /api/appointments/:id ───────────────────── */
export async function GET(req, { params }) {
  // ── Await params before using ────────────────────
  const { id } = await params

  const user = await getAuthUser(req)
  if (!user) return unauthorized()
  if (!user.hasAccess()) return forbidden("Account pending approval")

  await connectDB()

  const appointment = await AppointmentModel.findById(id).lean()
  if (!appointment) {
    return Response.json(
      { success: false, message: "Appointment not found" },
      { status: 404 }
    )
  }

  const paymentDetails = await AppointmentDetailsModel.findOne({
    appointmentId: appointment._id,
  }).lean()

  return Response.json({
    success: true,
    data: {
      appointment: {
        id: appointment._id.toString(),
        fullName: appointment.fullName,
        email: appointment.email,
        phoneNumber: appointment.phoneNumber,
        chapters: appointment.chapters || "",
        createdAt: appointment.createdAt,
      },
      paymentDetails: paymentDetails
        ? {
            paymentStatus: paymentDetails.PaymentStatus,
            amountPaid: paymentDetails.AmountPaid,
            transactionId: paymentDetails.TransactionID,
            invoiceNumber: paymentDetails.invoiceNumber,
            note: paymentDetails.Note,
          }
        : null,
    },
  })
}

/* ── PATCH /api/appointments/:id ─────────────────── */
export async function PATCH(req, { params }) {
  const { id } = await params

  const user = await getAuthUser(req)
  if (!user) return unauthorized()
  if (!user.hasAccess()) return forbidden("Account pending approval")

  const { PaymentStatus, AmountPaid, Note } = await req.json()

  const normalizedStatus = PaymentStatus?.toLowerCase().trim() || "unpaid"
  const validStatuses = ["unpaid", "partial", "paid"]

  if (!validStatuses.includes(normalizedStatus)) {
    return Response.json(
      { success: false, message: `Status must be: ${validStatuses.join(", ")}` },
      { status: 400 }
    )
  }

  const amount = normalizedStatus !== "unpaid" ? parseFloat(AmountPaid) : null
  if (normalizedStatus !== "unpaid" && (!AmountPaid || isNaN(amount) || amount <= 0)) {
    return Response.json(
      { success: false, message: "Valid amount required for partial or paid status" },
      { status: 400 }
    )
  }

  await connectDB()

  const appointment = await AppointmentModel.findById(id)
  if (!appointment) {
    return Response.json(
      { success: false, message: "Appointment not found" },
      { status: 404 }
    )
  }

  let paymentDetails = await AppointmentDetailsModel.findOne({
    appointmentId: appointment._id,
  })

  const previousStatus = paymentDetails?.PaymentStatus?.toLowerCase() || "unpaid"
  const becamePaid = normalizedStatus === "paid" && previousStatus !== "paid"

  const transactionId = becamePaid
    ? `TXN-${Date.now()}-${randomUUID().slice(0, 6).toUpperCase()}`
    : paymentDetails?.TransactionID || null

  const invoiceNumber = becamePaid
    ? `INV-${new Date().getFullYear()}-${randomUUID().slice(0, 8).toUpperCase()}`
    : paymentDetails?.invoiceNumber || null

  const updateData = {
    PaymentStatus: normalizedStatus,
    AmountPaid: amount,
    Note: Note?.trim() || "",
    TransactionID: transactionId,
    invoiceNumber,
    Performance: "Payment Updated",
  }

  if (paymentDetails) {
    Object.assign(paymentDetails, updateData)
    await paymentDetails.save()
  } else {
    paymentDetails = await AppointmentDetailsModel.create({
      appointmentId: appointment._id,
      ...updateData,
    })
  }

  if (becamePaid && appointment.email) {
    try {
      await sendEmail({
        to: appointment.email,
        subject: `Invoice ${invoiceNumber} - Payment Confirmed`,
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#333">
            <h2 style="color:#16a34a">✅ Payment Received</h2>
            <p>Hello <strong>${appointment.fullName}</strong>,</p>
            <p>We have received your payment.</p>
            <table style="width:100%">
              <tr><td><strong>Invoice:</strong></td><td>${invoiceNumber}</td></tr>
              <tr><td><strong>Transaction ID:</strong></td><td>${transactionId}</td></tr>
              <tr><td><strong>Amount:</strong></td><td>R${amount.toFixed(2)}</td></tr>
              <tr><td><strong>Date:</strong></td><td>${new Date().toLocaleDateString()}</td></tr>
            </table>
          </div>
        `,
      })
    } catch (emailError) {
      console.error("Invoice email failed:", emailError.message)
    }
  }

  return Response.json({
    success: true,
    message: "Payment updated successfully",
    data: {
      paymentStatus: normalizedStatus,
      amountPaid: amount?.toFixed(2) || null,
      transactionId,
      invoiceNumber,
      becamePaid,
    },
  })
}

/* ── DELETE /api/appointments/:id ────────────────── */
export async function DELETE(req, { params }) {
  const { id } = await params

  const user = await getAuthUser(req)
  if (!user) return unauthorized()
  if (!user.hasAccess()) return forbidden("Account pending approval")

  await connectDB()

  const appointment = await AppointmentModel.findByIdAndDelete(id)
  if (!appointment) {
    return Response.json(
      { success: false, message: "Appointment not found" },
      { status: 404 }
    )
  }

  await AppointmentDetailsModel.deleteOne({ appointmentId: id })

  return Response.json({
    success: true,
    message: "Appointment deleted successfully",
  })
}