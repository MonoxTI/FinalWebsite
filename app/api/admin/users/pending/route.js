import { connectDB } from "@/lib/mongodb"
import { UserModel } from "@/models/DB"
import { getAuthUser, unauthorized, forbidden } from "@/lib/auth"

/* ─── GET /api/admin/users/pending ───────────────
   Admin only — lists every account awaiting approval */
export async function GET(req) {
  const user = await getAuthUser(req)
  if (!user) return unauthorized()
  if (!user.isAdmin()) return forbidden("Admin access required")

  await connectDB()

  const pendingUsers = await UserModel.find({ role: "pending" }).sort({ _id: -1 })

  return Response.json({
    success: true,
    data: pendingUsers,
  })
}