const db = require('../config/database');
const express = require('express');
const moves = express.Router();

//Create
moves.post("/", (req, res) => {
    query = "INSERT INTO moves (move_name, type_id, move_power, move_pp, move_accuracy) ";
    query += `VALUES ('${req.body.move_name}', ${req.body.type_id}, ${req.body.move_power}, ${req.body.move_pp}, ${req.body.move_accuracy})`;
    db.query(query).then(rows => {
        if(rows.affectedRows > 0) {
            res.status(201);
            res.send("Movimiento añadido con éxito");
        }
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió un error al añadir el movimiento");
    });
});


//Read que regresa todos los elementos de la tabla
moves.get("/", (req, res) => {
    db.query("SELECT * FROM moves").then(rows => {
        res.status(200);
        res.json(rows);
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal");
    });
});


//Read que regresa los datos de un elemento por su id
moves.get("/:id([0-9]{1,3})", (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM moves WHERE move_id=${id}`;
    db.query(query).then(rows => {
        if (rows.length > 0) {
            res.status(200);
            res.json(rows);
        }
        res.status(404);
        res.send("No se encontraron los movimientos");
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal");
    });
});


//Update
moves.put("/:id([0-9]{1,3})", (req, res) => {
    const columns = Object.keys(req.body);
    const values = Object.values(req.body);
    query = `UPDATE moves SET `;
    for(let i = 0; i < columns.length; i++){
        query += `${columns[i]} = `;
        query += isNaN(values[i]) ? `'${values[i]}'` : `${values[i]}`;
        if(i + 1 < columns.length){
            query += ", ";
        } else{
            query += " ";
        }
    }
    query += `WHERE move_id = ${req.params.id}`;
    res.send(query);
});


//Delete
moves.delete("/:id([0-9]{1,3})", (req, res) =>{
    query = `DELETE FROM moves WHERE move_id = ${req.params.id}`;
    db.query(query).then(rows => {
        res.status(200);
        console.log(rows);
        res.send("Movimiento eliminado correctamente")
    }).catch(err => {
        console.log(err);
        res.status(500);
        res.send("Ocurrió algo mal");
    });
});


module.exports = moves;