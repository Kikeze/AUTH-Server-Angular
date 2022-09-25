// Imports de la aplicacion
require("dotenv").config({path: "vars.env"});

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/config");


// Inicio del servidor
const app = express();

dbConnection();

app.use( express.static("public") );

app.use( cors() );

app.use( express.json() );

app.use("/api/auth", require("./routes/auth"));


// Ejecucion del servidor
app.listen(process.env.PORT, () => {
    console.log(`Aplicacion escuchando en el puerto ${process.env.PORT}`);
});

