import express from "express";
const router = express.Router();

import { promises as fs } from "fs";
const { readFile, writeFile } = fs;

router.get("/", async (req, res, next) => {
  try {
    res.send(JSON.parse(await readFile(`grades.json`)));
  } catch (err) {
    next(err);
  }
});
router.post("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile(`grades.json`));
    const date = new Date();
    let grade = req.body;

    grade = {
      id: data.nextId,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: date.toLocaleString(),
    };

    data.grades.push(grade);
    data.nextId++;
    await writeFile("grades.json", JSON.stringify(data, null, 2));

    res.send(data);
    res.end();
  } catch (err) {
    next(err);
  }
});

router.put("/", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const date = new Date();
    let grade = req.body;

    const index = data.grades.findIndex((a) => a.id === grade.id);

    if (index === -1) {
      console.log("User not found");
      res.end();
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type;
    data.grades[index].value = grade.value;
    data.grades[index].timestamp = date.toLocaleString();

    await writeFile("grades.json", JSON.stringify(data, null, 2));

    res.send(data);
    res.end();
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const ID = parseInt(req.params.id);
    if (data.grades.findIndex((a) => a.id === ID)) {
      console.log("Id not found");
    } else {
      data.grades = data.grades.filter(
        (grade) => grade.id !== parseInt(req.params.id)
      );
      await writeFile("grades.json", JSON.stringify(data, null, 2));
      res.send(data);
    }
    res.end();
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", async (req, res, next) => {
  const data = JSON.parse(await readFile("grades.json"));
  data.grades = data.grades.filter(
    (grade) => grade.id === parseInt(req.params.id)
  );
  res.send(data.grades);
  next(err);
});

router.get("/grade/total", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    let total = 0;
    data.grades.forEach((grade) => {
      if (
        grade.student === req.body.student &&
        grade.subject === req.body.subject
      ) {
        total += parseInt(grade.value);
      }
    });
    res.send(total.toString());
    res.end();
  } catch (err) {
    next(err);
  }
});

router.get("/grade/media", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    let total = 0;
    let index = 0;
    data.grades.forEach((grade) => {
      if (grade.type === req.body.type && grade.subject === req.body.subject) {
        total += parseInt(grade.value);
        index++;
      }
    });
    total /= index;
    res.send(total.toString());
    res.end();
  } catch (err) {
    next(err);
  }
});

router.get("/grade/top3", async (req, res, next) => {
  try {
    const data = JSON.parse(await readFile("grades.json"));
    const arr = [];
    const arrTop = [];
    data.grades.forEach((grade) => {
      if (grade.type === req.body.type && grade.subject === req.body.subject) {
        arr.push(grade);
      }
    });
    arr.sort((a, b) => b.value - a.value);
    if (arr.length < 3) {
      res.send(arr);
    } else {
      for (let i = 0; i < 3; i++) {
        arrTop.push(arr[i]);
      }
      res.send(arrTop);
    }
    res.end();
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  logger.error(err);
  res.status(400).send({ error: err.message });
});

export default router;
