const express = require("express")
const mongoose = require("mongoose");
const { getResponseObject } = require("./helpers/supporter");
const app = express()

//mongo_connection
mongoose.connect('mongodb://localhost:27017/sample_project', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection
db.on('error' , (error) => {
    console.log(error)
})

db.once('open' , () =>{
    console.log("mongodb database connected successfully")
})

app.use(express.json())

//route_initialization
const userRouter = require("./routes/user")

app.use('/user' , userRouter)

//error handler
app.use((err, req, res, next) => {
    const response = getResponseObject();
    const status = err.status || 500;
    response.status = "error";
    response.message = err.message || "Internal Server Error";
    response.errorCode = 500
    res.status(status).json(response);
  });

//servert port assigning
const port = 8000
app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
})