const catchAsync = require("../utils/catchasync");
const Appointment = require("../Models/appointmentModel");
const Doctor = require("../Models/doctorModel");
const Patient = require("../Models/patientModel");
const Feature = require("../utils/features");
const crypto = require("crypto");
const { getToken, createZoomMeeting } = require("../Meeting/zoomUtils");
const AppError = require("../utils/appError");

exports.getAllAppointments = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.query.status && req.query.status !== "all") {
    filter.status = req.query.status;
  }

  const features = new Feature(Appointment.find(filter), req.query)
    .filter()
    .sort()
    .search()
    .limit()
    .paginate();

  const appointments = await features.query;

  res.status(200).json({
    status: "success",
    results: appointments.length,
    data: {
      appointments,
    },
  });
});

exports.getAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findById(req.params.id);
  if (!appointment) {
    return next(new AppError("No appointment found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      appointment,
    },
  });
});

exports.updateAppointment = catchAsync(async (req, res, next) => {
  const appointment = await Appointment.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!appointment) {
    return next(new AppError("No appointment found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      appointment,
    },
  });
});

exports.createAppointment = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.body.doctor);
  const patient = await Patient.findById(req.body.patient);

  if (!doctor || !patient) {
    return next(new AppError("Doctor or Patient not found", 404));
  }

  const ZOOM_ACCOUNT_ID = process.env.ZOOM_ACCOUNT_ID;
  const ZOOM_CLIENT_ID = process.env.ZOOM_CLIENT_ID;
  const ZOOM_CLIENT_SECRET = process.env.ZOOM_CLIENT_SECRET;

  const accessToken = await getToken(
    ZOOM_ACCOUNT_ID,
    ZOOM_CLIENT_ID,
    ZOOM_CLIENT_SECRET
  );

  if (!accessToken) {
    return next(new AppError("Failed to generate Zoom access token", 500));
  }

  const zoomMeetingData = {
    topic: `Appointment with Dr. ${doctor.name}`,
    type: 2,
    start_time: req.body.dateTime,
    duration: 30,
    timezone: "UTC",
    settings: {
      join_before_host: true,
      participant_video: true,
      host_video: true,
      mute_upon_entry: true,
    },
  };

  const zoomMeeting = await createZoomMeeting(zoomMeetingData, accessToken);

  if (!zoomMeeting) {
    return next(new AppError("Failed to create Zoom meeting", 500));
  }

  const appointmentData = {
    ...req.body,
    zoomMeeting: {
      meetingId: zoomMeeting.id,
      meetingLink: zoomMeeting.join_url,
      password: zoomMeeting.password,
    },
  };

  const newAppointment = await Appointment.create(appointmentData);

  if (req.body.patient) {
    patient.currentAppointments.push(newAppointment._id);
    await patient.save();
  }

  if (req.body.doctor) {
    doctor.currentAppointments.push(newAppointment._id);
    await doctor.save();
  }

  res.status(200).json({
    status: "success",
    data: {
      newAppointment,
    },
  });
});

exports.deleteAppointment = catchAsync(async (req, res) => {
  await Appointment.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getZoomSignature = catchAsync(async (req, res) => {
  const { meetingNumber, role } = req.body;

  if (!meetingNumber || role === undefined) {
    return next(new AppError("Meeting number and role are required", 400));
  }

  const timestamp = new Date().getTime() - 30000;
  const msg = Buffer.from(
    ZOOM_SDK_KEY + meetingNumber + timestamp + role
  ).toString("base64");
  const hash = crypto
    .createHmac("sha256", ZOOM_SDK_SECRET)
    .update(msg)
    .digest("base64");
  const signature = Buffer.from(
    `${ZOOM_SDK_KEY}.${meetingNumber}.${timestamp}.${role}.${hash}`
  ).toString("base64");

  res.status(200).json({
    status: "success",
    data: {
      signature,
    },
  });
});

exports.getMeetingDetails = catchAsync(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (!appointment) {
    return next(new AppError("No appointment found with that ID", 404));
  }

  const role = 0;

  res.status(200).json({
    status: "success",
    data: {
      sdkKey: ZOOM_SDK_KEY,
      meetingNumber: appointment.zoomMeeting.meetingNumber,
      passWord: appointment.zoomMeeting.passWord,
      userName: appointment.zoomMeeting.userName,
      userEmail: appointment.zoomMeeting.userEmail,
      role: role,
    },
  });
});
