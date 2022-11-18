var mysql = require('mysql')
const express = require('express');
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const path = require('path');
const dotenv = require('dotenv').config();
const crypto = require('crypto');

const dbConfig = require('./dbConfig');

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
    var connection = mysql.createConnection(conn);
    connection.connect();
    let sql_check_id = "select * from user_data.sign_up_table where user_id = ?";
    let check_id = {user_id : req.body.sign_in_id};
    var sign_in_check_id = connection.query(sql_check_id, check_id , function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });
    //console.log(sign_in_check_id._results);

    let sql_check_pw = "select * from user_data.sign_up_table where user_pw = ?";
    let check_pw = {user_pw : req.body.sign_in_pw};
    var sign_in_check_pw = connection.query(sql_check_pw, check_pw , function (err, results, fields) {
        if (err) {
            console.log(err);
        }
    });
    //console.log(sign_in_check_pw._results);
    console.log(req.body.sign_in_id)
    console.log(req.body.sign_in_pw)

    //console.log(req.body.sign_in_id, req.body.sign_in_pw)
    if(sign_in_check_id._results == "" || sign_in_check_pw._results == "") {
        res.write("<script>alert('id or pw wrong')</script>");
        console.log('틀림');
        console.log(sign_in_check_id)
        console.log(sign_in_check_pw)
    }
    else {
        res.write("<script>alert('login success!')</script>");
        console.log('맞음');
    }
    //[ [] ]
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