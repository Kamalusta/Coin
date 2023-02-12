const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use('/images', express.static('coins pic'));

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Kursant5443',
    database: 'conis'
})
connection.connect((err) => {
    if (!err) {
        console.log('sql qosuldu')
    }
})
// app.get('/home', function (req, res) {
//     res.send()
// })

app.get('/list/:category', function (req, res) {

    const { category } = req.params;
    connection.query('select * from coin where category=?', [category],
        (err, data) => {
            res.json(data)
        })

})








connection.query('select * from coin',
    (err, data) => {
        app.get('/home', function (req, res) {
            res.json(data)
        })
    });
// connection.query('select * from coin where category="Bullion coins"',
//     (err, data) => {
//         app.get('/home/Bullion', function (req, res) {
//             res.json(data)
//         })
//     });
// connection.query('select * from coin where category="Exclusive coins"',
//     (err, data) => {
//         app.get('/home/Exclusive', function (req, res) {
//             res.json(data)
//         })
//     });
// connection.query('select * from coin where category="Commemorative coins"',
//     (err, data) => {
//         app.get('/home/Commemorative', function (req, res) {
//             res.json(data)
//         })
//     });

app.listen(3001, function () {
    console.log("qosuldu")
})