// index.js
const express = require('express')
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 80 ;

/* CONNECTING TO MONGODB */
const URI = process.env.atlasDBUrl

const connectDB =async () => {
    try{
        await mongoose.connect(URI, {});
        console.log("MongoDB Connected...");
}
    catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();

/*      CORS         */

app.use(cors({credentials:this.true,}));

/*  INITIALIZE MIDDLEWARE    */

app.use( express.json( { extended : false } ) );

app.get('/', (req, res) => {
  res.status(200).json('Welcome, app is working well');
})

/*      IMPORT AND USE THE ROUTERS      */
const todosRouter = require("./routes/todos.js");
app.use("/api", todosRouter);

app.listen(PORT, () => {
  console.log(`Server running at PORT: ${PORT}`);
});

// Export the Express API
module.exports = app