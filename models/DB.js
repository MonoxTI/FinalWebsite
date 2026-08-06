import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const { Schema } = mongoose;

/* ─── User Schema ─────────────────────────────── */
const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, select: false },
  role: {
    type: String,
    enum: ["pending", "user", "admin"],
    default: "pending",
  },
});

UserSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
  }
});

UserSchema.methods.comparePassword = async function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

UserSchema.methods.isAdmin = function () { return this.role === "admin"; };
UserSchema.methods.hasAccess = function () {
  return ["user", "admin"].includes(this.role);
};

/* ─── Appointment Schema ──────────────────────── 
   fullName / email / phoneNumber = PARENT contact details
   childName / grade / school     = CHILD (student) details
   curriculum                     = "CAPS" or "IEB"
   subjects                       = array of subjects needed
   serviceType                    = "Monthly Subscription" or "Single Lesson"
   notes                          = additional notes from the booking form
   chapters                       = legacy field, kept optional so
                                     old bookings still render correctly */
const AppointmentSchema = new Schema({
  fullName:    { type: String, required: true },   // Parent full name
  email:       { type: String, required: true, lowercase: true, trim: true }, // Parent email
  phoneNumber: { type: String, required: true },   // Parent phone number
  childName:   { type: String, required: true },   // Child / student full name
  school:      { type: String, trim: true, default: "" }, // Child's current school
  grade:       { type: String, required: true },   // Child's grade (e.g. "Grade 10")
  curriculum:  { type: String, enum: ["CAPS", "IEB", ""], default: "" },
  subjects:    { type: [String], default: [] },     // e.g. ["Mathematics", "Physical Sciences"]
  serviceType: { type: String, enum: ["Monthly Subscription", "Single Lesson", ""], default: "" },
  notes:       { type: String, trim: true, default: "" }, // Additional notes
  chapters:    { type: String, default: "" },       // legacy — optional now
}, { timestamps: true });

/* ─── Appointment Details Schema ──────────────── */
const AppointmentDetailsSchema = new Schema({
  appointmentId: { type: Schema.Types.ObjectId, ref: "Appointment", required: true },
  PaymentStatus: { type: String, enum: ["pending", "paid", "failed"], required: true },
  Performance:   { type: String, required: true },
  TransactionID: { type: String, required: true },
  AmountPaid:    { type: Number, required: true },
  invoiceNumber: { type: String, required: true, unique: true },
  Note:          { type: String, trim: true },
}, { timestamps: true });

/* ─── Safe model exports ──────────────────────── 
   The "mongoose.models.X || mongoose.model(X)" pattern
   stops Next.js from crashing when it reloads files
   during development and tries to register the same
   model twice                                      */

export const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);

export const AppointmentModel =
  mongoose.models.Appointment || mongoose.model("Appointment", AppointmentSchema);

export const AppointmentDetailsModel =
  mongoose.models.AppointmentDetails ||
  mongoose.model("AppointmentDetails", AppointmentDetailsSchema);