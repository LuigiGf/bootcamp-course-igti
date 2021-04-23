import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  throw new Error("Error message test");
});

app.post("/", async(req, res, next) => {
  try{
    throw new Error("Error message");
  }catch{
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log("Error 1");
  res.status(404).send("Ocorreu um erro interno, tente novamente mais tarde");
  next(err);
});

app.use((err, req, res, next) => {
  console.log("Error 2");
});

app.listen(3000, () =>{
  console.log("API started");
});