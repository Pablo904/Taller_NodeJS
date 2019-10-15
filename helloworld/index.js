const express = require('express');
const app = express();
const pokedex = require('./pokedex.json');

app.get("/", (req, res) =>{
    res.send("Bienvenido a mi pokédex");
});

app.get("/pokemon"),(req, res) =>{
    res.send(pokedex.pokemon);
};

app.get("/pokemon/:id"),(req, res) =>{
    const id = req.params.id;
    if(id > 0 && id <= 151){
        res.json(pokedex.pokemon[req.params.id - 1]);
    }else{
        res.send("No hay algún pokemon con esa id en la base de datos.");
    }
};

app.listen(3000, () => {
    console.log("Server is running...");
});
