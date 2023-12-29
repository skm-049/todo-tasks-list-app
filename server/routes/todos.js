const router = require("express").Router();
const Todos = require("../models/todos.model.js");

/*  ROUTE TO GET ALL TODOS FROM MONGODB ON LOAD */
router.route("/").get((req, res) => { 
    Todos.find()
        .then(arr => res.json(arr) )
        .catch(err => res.status(400).json("Error: " + err))
        
 } );

/*  ROUTE TO ADD A TODO TO THE MONGODB DATABASE */
router.route("/add").post((req, res) => {
    const title = req.body.title;
    const newTitle = new Todos({title});

    newTitle.save()
        .then(()=>res.json("Todo has been added") )
        .catch(err=>res.status(400).json("Error: " + err))
} );


/*  ROUTE TO FIND A TODO BY ITS ID FROM DATABASE */
router.route("/find/:id").get((req, res) => {
    Todos.findById(req.params.id)
        .then(obj => res.json(obj))
        .catch(err => res.status(400).json("Error: " + err))
} );


/*  ROUTE TO DELETE A TODO BY ITS ID FROM DATABASE */
router.route("/delete/:id").delete((req, res) => {
    Todos.findByIdAndDelete(req.params.id)
        .then(()=> res.json("Todo has been deleted"))
        .catch(err => res.status(400).json("Error: " + err))
} );


/*  ROUTE TO UPDATE A TODO BY ITS ID TO THE DATABASE */

router.route("/update/:id").put((req, res) => {
    Todos.updateOne({"_id": req.params.id}, {$set: {"title":req.body.title }})
        .then(()=>{res.json("Todo has been updated")})
        .catch(err => res.status(400).json("Error: " + err))
} );



/*  ROUTE TO UPDATE A TODO WITH ANOTHER METHOD BY ITS ID TO THE DATABASE */
/*
router.route("/update/:id").put((req, res) => {
    Todos.findOneAndUpdate({"_id": req.params.id}, {$set : {"title": req.body.title}})
    .then(()=>res.json("Todo has been updated"))
    .catch(err=> res.json(400).json("Error: " + err))
} );
*/


/*  ROUTE TO DELETE ALL THE TODOS FROM THE DATABASE */
router.route("/deleteAll").post((req, res) => {
    Todos.deleteMany({})
        .then(()=>{res.json("All todos have been removed")})
        .catch(err => res.status(400).json("Error: " + err))
});


 module.exports = router;