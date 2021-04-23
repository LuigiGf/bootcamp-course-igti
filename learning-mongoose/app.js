import express from "express";
import { studentsRouter } from "./routes/studentsRouter.js";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.qgspv.mongodb.net/grades?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log("Erro ao conectar no MongoDB");
  }
})();

const app = express();
app.use(express.json());
app.use(studentsRouter);

app.listen(3000, () => console.log("API iniciada"));
