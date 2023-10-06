const express = require('express');
const app = express();

app.get("/", (req,res)=>{
    res.send("<h1>Home Page</h1>")
})

app.listen(5000, ()=>{
    console.log("Server Started on port 5000");
})