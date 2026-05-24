import { connectDB } from "@/lib/mongodb"
import { UserModel } from "@/models/DB"
import { getAuthUser, unauthorized, forbidden } from "@/lib/auth"

export async function PATCH(req, { params }) {
  const user = await getAuthUser(req)
  if (!user) return unauthorized()
  if (!user.isAdmin()) return forbidden("Admin access required")

  // ── Await params before using ────────────────────
  const { id } = await params
  const { action } = await req.json()

  if (!["approve", "revoke"].includes(action)) {
    return Response.json(
      { success: false, message: "Action must be approve or revoke" },
      { status: 400 }
    )
  }

  await connectDB()

  const target = await UserModel.findByIdAndUpdate(
    id,                                              // ← use id, not params.id
    { role: action === "approve" ? "user" : "pending" },
    { new: true }
  )

  if (!target) {
    return Response.json(
      { success: false, message: "User not found" },
      { status: 404 }
    )
  }

  return Response.json({
    success: true,
    message: `User ${action}d successfully`,
    data: target,
  })
}