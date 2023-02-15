const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use('/images', express.static('coins pic'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get('/list/:type', function (req, res) {
    const { type } = req.params;
    let { name, category, country, metal, quality, priceT, priceF } = req.query;
    country ? country = `coincountry='${country}' and` : " ";
    metal ? metal = `composition='${metal}' and` : " ";
    quality ? quality = `quality='${quality}' and` : " ";
    switch (type) {
        case "group":
            connection.query('select * from coin where category=? and deleted=0', [category],
                (err, data) => {
                    res.json(data)
                })
            break;
        case "search":
            const yearF = parseInt(req.query.yearF)
            const yearT = parseInt(req.query.yearT)
            connection.query(`select * from coin where deleted=0 and ${country} ${metal} ${quality} price > ${priceF} and price < ${priceT} and coinyear > ${yearF} and coinyear < ${yearT}`,
                (err, data) => {
                    res.json(data)
                })
            break;
        case "withname":
            connection.query(`select * from coin where deleted=0 and coinname like '%${name}%' `,
                (err, data) => {
                    if (data.length)
                        res.json(data)
                    else {
                        connection.query('select * from coin deleted=0',
                            (err, data) => {
                                const newArr = [];
                                data.forEach(element => {
                                    if (element.about.includes(name)) {
                                        newArr.push(element)
                                    }
                                });
                                res.json(newArr)
                            })
                    }
                })
            break;
    }
})
app.get('/home', function (req, res) {
    connection.query('select * from coin where deleted=0',
        (err, data) => {
            res.json(data)
        });

})
app.get(`/editcoin/:id`, function (req, res) {
    connection.query('select * from coin where id=?', [req.params.id],
        (err, data) => {
            res.json(data)
        }
    )
})

app.post('/inputcoin', function (req, res) {
    const { id, coinname, category, coinpic, coinpic2, about, about2, coincountry, price, coinyear,
        composition, quality, weight, denomination, deleted } = req.body;
    if (id == "") {
        connection.query(`insert into coin (coinname, category, coinpic, coinpic2, about, about2, coincountry,
         price, coinyear, composition, quality, weight, denomination) values ( '${coinname}', '${category}',
          '${coinpic}', '${coinpic2}', '${about}', '${about2}', '${coincountry}', '${price}', '${coinyear}','${composition}',
           '${quality}', '${weight}', '${denomination}')`);
    }
    else {
        connection.query(`update coin set coinname= '${coinname}',category='${category}',coinpic='${coinpic}',
        coinpic2='${coinpic2}',about='${about}',about2='${about2}',coincountry='${coincountry}',price='${price}',
        coinyear='${coinyear}',composition='${composition}',quality= '${quality}',weight='${weight}',denomination='${denomination}' where id=${id}`)
    }
})
app.delete('/delete/:id', function (req, res) {
    const { id } = req.params
    connection.query(`update coin set deleted=1 where id= ${id}`)

})

app.listen(3001, function () {
    console.log("qosuldu")
})