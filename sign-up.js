const mysql = require('mysql');
const express = require('express');
const app = express();
const path = require('path');
const dotenv = require('dotenv').config();

app.use(express.static(__dirname));

app.listen(3000, () => {
    console.log(`Example app listening on port 3000`)
})

app.get( '/', (req ,res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.get('/style.css', function(req, res) {
    res.sendFile(__dirname + "/" + "instagram-web.css");
});

app.use(express.json())
app.use(express.urlencoded({ extends: true})) //이거 써야 req.body로 입력값 받을 수 있

app.post( '/sign_up', (req ,res) => {
    req.body;
    if(req.body.mnoe.length >= 1 && req.body.fn.length >= 1 && req.body.un.length >= 1 && req.body.pw.length >= 6){
        const conn = {  // mysql 접속 설정
            host: 'user-data.cmagpshmnsos.ap-northeast-2.rds.amazonaws.com',
            port: '3306',
            user: 'admin',
            password: process.env.MYSQLPASSWORD,
            database: 'user_data'
        };
        
        var connection = mysql.createConnection(conn);
        
        connection.connect();
        
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


app.get( '/db'/*라우팅*/, (req ,res) => {
    const conn = {  // mysql 접속 설정
        host: 'user-data.cmagpshmnsos.ap-northeast-2.rds.amazonaws.com',
        port: '3306',
        user: 'admin',
        password: process.env.MYSQLPASSWORD,
        database: 'user_data'
    };

    var connection = mysql.createConnection(conn);
    
    connection.connect();
    
    let sql = "select * from user_data.sign_up_table";
    var sign_up_data = connection.query(sql, function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        console.log(results);
    });

    console.log(sign_up_data)
});

