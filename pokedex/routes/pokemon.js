//const pokedex = require('../pokedex.json');
const db = require('../config/database');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) =>{
    //res.send(pokedex.pokemon);
    //res.status(200).json(pokedex);
    db.query("SELECT * FROM pokemon").then(rows=>{
        res.status(200);
        res.json(rows);
    }).catch(err =>{
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal");
    });
});

router.post("/", (req, res) =>{
    //res.send(pokedex.pokemon);
    query = "INSERT INTO (pok_name, pok_height, pok_weight, pok_base_experience) ";
    query += `VALUES('${req.body.pok_name}', ${req.body.pok_height}, ${req.body.pok_weight}, ${req.body.pok_base_experience});`
    db.query(query).then(rows => {
        if(rows.affectedRows > 0){
            res.status(201);
            res.send("Pokemon añadido con exito");
        }
    }).catch(err =>{
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal");
    })
    res.json(req.body);
});

//Buscar pokemon por id
router.get("/id/:id", (req, res) =>{
    const id = req.params.id;
    db.query(`SELECT * FROM pokemon WHERE pok_id = '+${id}'`).then(rows => {
        if(rows.length>0){
            res.status(200);
            res.json(rows);   
        }
        res.status(404);
        res.send("No se encontró el pokemon");
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal")
    });

    /*if(id > 0 && id <= 151){
        res.json(pokedex.pokemon[id - 1]);
        console.log(pokedex.pokemon[id]);
    }else{
        res.send("No hay algún pokemon con esa id en la base de datos.");
    }*/
});

//Buscar pokemon por nombre
router.get("/name/:name", (req, res) =>{
    const name = req.params.name;
    //query =  "SELECT * FROM pokemon WHERE pok_name = '" + name + "'";
    db.query(`SELECT * FROM pokemon WHERE pok_name = '${name}`).then(rows => {
        if(rows.length>0){
            res.status(200);
            res.json(rows);   
        }
        res.status(404);
        res.send("No se encontró el pokemon");
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal")
    });
    /*let poke = pokedex.pokemon;
    if (typeof name === 'string'){
        for (let i = 0; i < poke.length; i++){
            if (poke[i]['name'] == name){
                res.json(poke[i]);
            }
        }
    }*/
});

//Buscar pokemon aleatorio
router.get("/random/", (req, res) =>{
    //const ran = Math.floor(Math.random() * 151) + 1;
    const id = Math.floor(Math.random() * 722) + 1;
    db.query("SELECT * FROM pokemon WHERE pok_id = "+id).then(rows => {
        if(rows.length>0){
            res.status(200);
            res.json(rows);   
        }
        res.status(404);
        res.send("No se encontró el pokemon");
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal")
    });
    //res.json(pokedex.pokemon[ran - 1]);
});

//Mostrar imagen de un pokemon por su id
/*router.get("/image/:id", (req, res) =>{
    const id = req.params.id;
    if(id > 0 && id <= 151){
        let img = (pokedex.pokemon[id - 1].img);
        res.send("<img src="+img+">");
        console.log(pokedex.pokemon[id]);
    }else{
        res.send("No hay algún pokemon con esa id en la base de datos.");
    }
});*/

//router.get("pokemonx/id/:id([0-9]{1,3})", (req, res) =>{}); //RegEx
/*router.get("/pokemon/id/:id", (req, res) =>{
    const id = req.params.id;
    if(IsNaN(id)){
        next(); //Manda a la siguiente función
    }else{
        res.json(pokedex.pokemon[id - 1]);
    }
});*/

module.exports = router;