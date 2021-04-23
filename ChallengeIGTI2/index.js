import express from "express";
const app = express();
app.use(express.json());
app.use("/students", studentsRouter);

import studentsRouter from "./routes/students.js";

//winston use starts
import winston from "winston";
const { combine, timestamp, label, printf } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

global.logger = winston.createLogger({
  level: "silly",
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "grade-students-api.log" }),
  ],
  format: combine(
    label({ label: "grade-students-api" }),
    timestamp(),
    myFormat
  ),
});
//winston use finish

app.listen(3000, async () => {
  try {
    logger.info("API started");
  } catch (err) {
    logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
  }
});
