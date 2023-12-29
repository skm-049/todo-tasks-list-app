const router = require("express").Router();
const Todos = require("../models/todos.model.js");

router.route("/").get((req, res) => { 
    Todos.find()
        .then(arr => res.json(arr) )
        .catch(err => res.status(400).json("Error: " + err))
        
 } );

 module.exports = router;