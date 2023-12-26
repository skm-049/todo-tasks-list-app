const router = require("express").Router(); 
const Todos = require("../models/todos.model.js");

router.route("/").get((req, res) => {
    Todos.find()
        .then(arr => res.json(arr))
        .catch(err=> res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {

    const title = req.body.title;
    const newTitle = new Todos({title});
    
    newTitle.save()
        .then(()=>res.json("Todo added to the database successfully"))
        .catch(err=>res.status(400).json("Error : " + err));
});

router.route("/find/:id").get((req, res) => {
    Todos.findById(req.params.id)
        .then(obj => res.json(obj))
        .catch(err=> res.status(400).json("Error: " + err));
});

router.route("/delete/:id").delete((req, res)=>{
    Todos.findByIdAndDelete(req.params.id)
        .then(()=>res.json("Todo Deleted successfully"))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").put((req, res) => {
    Todos.updateOne({"_id": req.params.id}, {$set : {"title": req.body.title}})
        .then(()=>res.json("Todo Updated Succesfully"))
        .catch(err=> res.status(400).json("Error: " + err));
});

//  FOR UPDATE USE THE ABOVE METHOD OR THE BELOW METHOD

/*
router.route("/update/:id").put((req, res) => {
    Todos.findOneAndUpdate({"_id": req.params.id}, {$set : {"title": req.body.title}})
        .then(()=>res.json("Todo Updated Succesfully"))
        .catch(err=> res.status(400).json("Error: " + err));
});
*/

router.route("/deleteAll").post((req, res)=>{
    Todos.deleteMany({})
        .then(()=> res.json("Deleted all successfully.")) 
        .catch(err=>res.status(400).json("Error: " + err));
});


module.exports = router;