const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const swaggerUi = require("swagger-ui-express");
const openapi = require("./docs/openapi.js")
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapi));

app.get("/api/saludo", (req, res) => {
  res.json({ mensaje: "Hola desde mi API" });
});

//Primer ejercicio
app.get("/api/yo", (req, res) => {
  res.json({nombre: "ximena lozada escobar", carrera: "Ing. de software"})
})

//Segundo ejercicio
app.get("/api/edad/:anio", (req, res) => {
  const anioActual = new Date().getFullYear(); //2026
  const anio = parseInt(req.params.anio); //2007

  if(!Number.isInteger(anio) || anio < 1900 || anio > anioActual){
    return res.status(400).json({ error: "Año invalido"});
  }
    res.json({ anionacimiento: anio, edad: anioActual - anio});
});

app.listen(PORT, () => console.log("API lista"));
