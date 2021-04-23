import express from "express";

const app = express();
app.use(express.json());

//all
app.all("/testAll", (req, res) => {
  res.send(req.method);
});

//caracteres especiais
//o interrogacao ignora a ultima letra do url ou seja test
app.get("/teste?", (req, res) => {
  res.send(req.method);
});

//o caracter anterior pode ser repitido infinitamente
app.get("/biz+", (req, res) => {
  res.send(req.method);
});

//voce pode colocar qualquer coisa entre o one e o blue que o metodo sera requisitado
app.get("/one*blue", (req, res) => {
  res.send(req.method);
});

//o parenteses utiliza tudo dentro dele como unidade por exemplo se for ? tudo dentro do parenteses eh opcional
app.post("/test(ing)?", (req, res) => {
  console.log(req.body);
  res.send(req.method);
});

//red sera padronizado
app.get(/.*Red$/, (req, res) => {
  res.send("/.*Red$/");
});

//parametros na rota
app.get("/testeParam/:id/:a?", (req, res) => {
  res.send(req.params.id + " " + req.params.a);
});

//parametros via query
app.get("/testQuery", (req, res) => {
  res.send(req.query);
});

//next
app.get("/testMultipleHandlers", (req, res, next) => {
  console.log("Callback 1");
  next();
}, (req, res) => {
  console.log("Callback 2");
  res.end();
});

//next com array
const callback1 = (req, res, next) => {
  console.log("Callback 1");
  next();
};

function callback2(req, res, next){
  console.log("Callback 2");
  next();
};

const callback3 = (req, res) => {
  console.log("Callback 3");
  res.end();
};

app.get("/testMultipleHandlersArray", [callback1, callback2, callback3]);

//route
app.route("/testRoute")
.get((req, res) => {
  res.send("/testRoute GET")
})
.post((req, res) =>{
  res.send("/testRoute POST")
})
.delete((req, res) => {
  res.send("/testRoute DELETE")
});

app.listen(3000, () => {
  console.log("API Started");
});