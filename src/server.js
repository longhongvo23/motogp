require('dotenv').config()

const express = require('express')
const app = express()
const configViewEngine = require('./config/viewEngine')
const webRoutes = require('./routes/web')

configViewEngine(app)

const port = process.env.PORT || 3000
const hostname = process.env.HOST_NAME

//khai bao route
app.use('/', webRoutes)


// test connection
const sql = require('mssql');

const sqlConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_NAME,
    server: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for Azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
};

(async () => {
    try {
        // Kết nối tới SQL Server
        await sql.connect(sqlConfig);

        const value = 'Italy'; // Giá trị cần tìm, đã khai báo
        const result = await sql.query`SELECT * FROM Riders WHERE Country = ${value}`;

        console.dir(result.recordset); // In ra kết quả
    } catch (err) {
        console.error('Lỗi kết nối:', err); // Sử dụng console.error để in lỗi
    }
})();

app.listen(port, hostname, () => {
    console.log(`Example app listening on port ${port}`)
})
