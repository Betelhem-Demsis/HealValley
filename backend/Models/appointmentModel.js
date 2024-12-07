const mongoose = require("mongoose");
const moment = require("moment");

const appointmentSchema = new mongoose.Schema({
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  appointmentDate: {
    type: Date,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    default: "Scheduled",
  },
  notes: {
    type: String,
  },
  zoomMeeting: {
    signature: String,
    meetingNumber: String,
    passWord: String,
    sdkKey: String,
    userName: String,
    userEmail: String,
    role: Number,
  },
  startedAt: {
    type: Date,
  },
  endAt: {
    type: Date,
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);
module.exports = Appointment;
