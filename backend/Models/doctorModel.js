const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  specialization: { type: String, required: true },
  email: { type: String, required: true },
  contactInfo: {
    phone: { type: String },
    address: { type: String },
  },
  qualifications: [{ type: String }],
  Hospital: {
    type: String,
    required: true,
  },
  payPerHour: {
    type: String,
    required: true,
  },
  experience: { type: Number },
  patients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
  currentAppointments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
  ],
  password: {
    type: String,
    required: [true, "password is required"],
    minlength: 8,
    select: false,
  },
  confirmPassword: {
    type: String,
    required: [true, "please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "passwords are not the same",
    },
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { type: Date, default: Date.now },
});

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
