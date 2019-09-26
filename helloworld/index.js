const express = require('express');
const app = express();

let arr = [];
let pers = {};

/*app.get("/", (req, res) =>{
    res.send("Hola mundo");
});*/

app.listen(3000, () => {
    console.log("Server is running...");
});

/*app.get("/:id", (req, res) =>{
    console.log(req.params.id);
    arr.push(req.params.id);
    console.log(arr);
});*/

app.get("/:nombre/:edad", (req, res) =>{
    console.log(req.params.nombre);
    pers = {
        "Nombre": req.params.nombre,
        "Edad": req.params.edad 
    };
    console.log(pers);
});