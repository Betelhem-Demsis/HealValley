const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const patientRoute = require("./Routes/patientRoute");
const doctorRoute = require("./Routes/doctorRoute");
// const appointmentRoute = require("./Routes/appointmentRoute");
// const userRoute = require("./Routes/userRoute");
const messageRoute = require("./Routes/messageRoute");
const AppError = require("./utils/appError");

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/patient", patientRoute);
app.use("/api/doctor", doctorRoute);
app.use("/api/messages", messageRoute);
// app.use("/api/appointment", appointmentRoute);
// app.use("/api/user", userRoute);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
