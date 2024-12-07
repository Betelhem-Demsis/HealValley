const catchAsync = require("../utils/catchasync");
const Doctor = require("../Models/doctorModel");
const APIFeatures = require("../utils/features");

exports.getAllDoctors = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Doctor.find(filter), req.query)
    .filter()
    .sort()
    .search()
    .limit()
    .paginate();

  const doctors = await features.query;

  res.status(200).json({
    status: "success",
    results: doctors.length,
    data: {
      doctors,
    },
  });
});

exports.getDoctor = catchAsync(async (req, res, next) => {
  const doctor = await Doctor.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: {
      doctor,
    },
  });
});

exports.createDoctor = catchAsync(async (req, res) => {
  const newdoctor = await Doctor.create(req.body);
  res.status(200).json({
    status: "success",
    data: {
      newdoctor,
    },
  });
});

exports.updateDoctor = catchAsync(async (req, res) => {
  const doctor = await findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json({
    status: "success",
    data: {
      doctor,
    },
  });
});

exports.deleteDoctor = catchAsync(async (req, res) => {
  await Doctor.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
