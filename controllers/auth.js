const mysql = require('mysql');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const async = require('hbs/lib/async');
const { response } = require('express');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

module.exports.register = (req, res) => {
    console.log(req.body);

    const { name, email, password, passwordConfirm } = req.body;
    db.query('SELECT EMAIL FROM USERS WHERE email=?', [email], async (err, results) => {
        if (err) {
            console.log(err);
        }
        if (results.length > 0) {
            return res.render('register', {
                message: 'That email is already in use'
            })
        } else if (password !== passwordConfirm) {
            return res.render('register', {
                message: 'Password do not match'
            })
        }

        // let hashedPassword = await bcrypt.hash(password, 8);
        // console.log(hashedPassword);

        // res.send("testing");
        db.query('INSERT INTO USERS SET ?', { NAME: name, EMAIL: email, PASSWORD: password }, (err, results) => {
            if (err) {
                console.log(err);
            } else {
                console.log(results);
                return res.render('register', {
                    message: 'User registered'
                })
            }
        })
    });

}
module.exports.login = (req, res) => {
    //console.log(req.body);

    const { email, password } = req.body;

    db.query("SELECT * FROM USERS WHERE EMAIL=?", [email], (err, rs) => {
        if (err) return console.log(err);
        if (rs.length === 0) return res.render('login',{ message: "No user found" });
        rs.forEach(ele => {
            if (email === ele.EMAIL) {
                if (password === ele.PASSWORD) {
                    return res.render('index',{ message: "Login Successfull" });
                } else {
                    return res.render('login',{ message: "Invalid password" });
                }
            }
        });
    })
}