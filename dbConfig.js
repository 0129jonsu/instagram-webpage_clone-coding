var dbConfig = {  // mysql 접속 설정
    host: 'user-data.cmagpshmnsos.ap-northeast-2.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: process.env.MYSQLPASSWORD,
    database: 'user_data'
};

module.exports = dbConfig;