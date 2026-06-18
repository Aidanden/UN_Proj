import express from "express";
import cors from "cors";
import "./types/express";
import {config} from "./config/env";
import departmentRoute from "./routes/departmentRoute";
import studentRoute from "./routes/studentRoute";
import instructorRoute from "./routes/instructorRoute";
import courseRoute from "./routes/courseRoute";
import enrollmentRoute from "./routes/enrollmentRoute";
import authRoute from "./routes/authRoute";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api/auth", authRoute);
app.use("/api/departments", departmentRoute);
app.use("/api/students", studentRoute);
app.use("/api/instructors", instructorRoute);
app.use("/api/courses", courseRoute);
app.use("/api/enrollments", enrollmentRoute);

app.use(errorHandler);

app.listen(config.port, () => {
    console.log(`University Management System running at http://localhost:${config.port}`);
  });












