const app = require("express")();

const PORT = process.env.port || 3000;

app.get("/", (req, res) => {
  res.send("Bienvenido a la API de lies clone");
});

app.listen(PORT, (req, res) => {
  console.log("API funcionando en el puerto " + PORT);
});
