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

app.get('/list/:type', function (req, res) {
    const { type } = req.params;
    let { name, category, country, metal, quality, priceT, priceF } = req.query;
    country ? country = `coincountry='${country}' and` : " ";
    metal ? metal = `composition='${metal}' and` : " ";
    quality ? quality = `quality='${quality}' and` : " ";
    switch (type) {
        case "group":
            connection.query('select * from coin where category=?', [category],
                (err, data) => {
                    res.json(data)
                })
            break;
        case "search":
            console.log(country, metal, quality)
            const yearF = parseInt(req.query.yearF)
            const yearT = parseInt(req.query.yearT)
            connection.query(`select * from coin where ${country} ${metal} ${quality} price > ${priceF} and price < ${priceT} and coinyear > ${yearF} and coinyear < ${yearT}`,
                (err, data) => {
                    res.json(data)
                    if (err) {
                        console.log(err)
                    }
                })
            break;
        case "withname":
            const newArr = [];
            connection.query(`select * from coin where coinname like '%${name}%'`,
                (err, data) => {
                    newArr.push(data[0])
                })

            connection.query('select * from coin',
                (err, data) => {
                    data.forEach(element => {
                        if (element.about.includes(name)) {
                            newArr.push(element)
                        }
                    });
                    res.json(newArr)
                })
            break;
    }

    console.log('birinci' + req.params.type)
    console.log(req.query)
})

connection.query('select * from coin',
    (err, data) => {
        app.get('/home', function (req, res) {
            res.json(data)
        })
    });

app.listen(3001, function () {
    console.log("qosuldu")
})