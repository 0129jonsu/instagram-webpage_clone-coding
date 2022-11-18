var mysql = require('mysql')
const express = require('express');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const path = require('path');
const dotenv = require('dotenv').config();
const crypto = require('crypto');

const dbConfig = require('./dbConfig');
const { errors } = require('puppeteer');
const { mainModule } = require('process');

const app = express();
app.use(express.static(__dirname));
app.use(express.json())
app.use(express.urlencoded({extends: true})) //이거 써야 req.body로 입력값 받을 수 있

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})

app.get( '/', (req ,res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "instagram-web.css");
});

var dbOptions = {
    host : dbConfig.host,
    port : dbConfig.port,
    user : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database
};

var connection = mysql.createConnection(dbOptions);
connection.connect();

var sessionStore = new MySQLStore(dbOptions);

app.use(session({
    secret:'my key',
    resave:false,
    saveUninitialized:true,
    store:sessionStore,
}))

app.post('/sign_up', (req ,res) => {
    req.body;
    if(req.body.mnoe.length >= 1 && req.body.fn.length >= 1 && req.body.un.length >= 1 && req.body.pw.length >= 6){
        
        
        let sql = "insert into user_data.sign_up_table set ?";
        let data = {user_numorem : req.body.mnoe, user_name : req.body.fn, user_id : req.body.un, user_pw : req.body.pw};
        connection.query(sql, data, function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            console.log(results);
        });
    }  
});



app.post( '/sign_in', (req ,res) => {
    const id = req.body.sign_in_id; //id
    const pw = req.body.sign_in_pw; //pw
    let sql_check_id = "select * from user_data.sign_up_table where user_id = ?";
    let sql_check_pw = "select * from user_data.sign_up_table where user_pw = ?";
    connection.query(sql_check_id, id , function (err, results, fields){
        if(results.length && results[0].user_id === id){ // check id
            connection.query(sql_check_pw, pw, function (err, results, fields){
                if(err){
                    throw err;
                }
                if(results.length && results[0].user_id === id && results[0].user_pw === pw){ // check pw
                    req.session.uid=results[0].user_id;
                    req.session.upw=results[0].user_pw;
                    req.session.isLogined=true;
                    req.session.save(function(){
                        console.log(req.session);
                    });
                    return res.redirect("main.html");
                }
                else {
                    res.write("<script>alert('pw false')</script>");
                }
            })
        }
        else{
            res.write("<script>alert('id false')</script>");
        }
    })
    return res.redirect("index.html");
});




app.get( '/db'/*라우팅*/, (req ,res) => {
    let sql = "select * from user_data.sign_up_table";
    var sign_up_data = connection.query(sql, function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });

    console.log(sign_up_data)
});