const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

/*  creating app with express  */
const app = express();

/*   setting up port  */
const PORT = process.env.PORT || 80;


/*   connect database  */

const uri = process.env.atlasDBUrl;
// const uri = process.env.localDBUrl;
const connectDB = async () => {
    try{ 
        await mongoose.connect(uri, {
         
           
        });
        console.log('MongoDB connected...')
    }
    catch(error) {
        console.log(error.message);
        process.exit(1);
    }
 };
connectDB();


/*  cors  */
app.use(cors({origin:"https://todo-tasks-list-app.vercel.app/", methods:["POST", "GET", "PUT", "DELETE"], credentials:true,}));

/*   initialize middleware  */
app.use(express.json({ extended: false }));

/*  to check the server responce  */
app.get("/", (req, res) => res.send("Server up and running"));

/*  import and use the texts router  */
const todosRouter = require("./routes/todos.js");
app.use("/api", todosRouter);

/*  listening at the given port  */
app.listen(PORT, () => {
    console.log(`server is running on PORT: ${PORT}`);
});
