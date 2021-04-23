import express from "express";
import { studentModel } from "../models/studentModel.js";

const app = express();

//create
app.post("/student", async (req, res) => {
  try {
    const student = new studentModel(req.body);
    await student.save();
    res.send(student);
  } catch (err) {
    res.status(500).res.send(err);
  }
});

//retrieve
app.get("/student", async (req, res) => {
  try {
    const student = await studentModel.find({});
    res.send(student);
  } catch (err) {
    res.status(500).res.send(err);
  }
});

//UPDATE
app.patch("student/:id", async (req, res) => {
  try {
    const student = await studentModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body
    );
    res.send(student);
  } catch (err) {
    res.status(500).res.send(err);
  }
});

//DELETE
app.delete("/student/:id", async (req, res) => {
  try {
    const student = await studentModel.findByIdAndDelete({
      _id: req.params.id,
    });
    if (!student) {
      res.status(404).send("Documento não encontrado na colecao");
    } else {
      res.send(student);
    }
  } catch (err) {
    res.status(500).res.send(err);
  }
});
export { app as studentsRouter };
