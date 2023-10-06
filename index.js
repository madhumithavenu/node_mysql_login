const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv');
dotenv.config({ path: './.env'});
const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})
db.connect((err)=>{
    if(err){
        console.log();
    }else{
        console.log("MySQL Connected");
    }
})

app.get("/", (req,res)=>{
    res.send("<h1>Home Page</h1>")
})

app.listen(5000, ()=>{
    console.log("Server Started on port 5000");
})