const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql2');

const app = express ();

app.use(cors());
app.use(bodyparser.json());




// database connecting
const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        passeword: '',
        database: 'city_management',
        port: 3306
});
// Check database

db.connect(err=>{
    if (err) {console.log(err,'dberr');}
    console.log('database connected...');
})


// Get all data
app.get('/city',(req,res)=>{
    let qr = `select * from city`;

    db.query(qr,(err,result)=>{


            if(err)
            {
                console,log(err,'errs');
            }

            if(result.length>0)
            {
                res.send({
                    message: 'All data',
                    data: result
                });
            }

    });
});

// Get single data
app.get('/city/:id' ,(req,res)=>{
    let gID = req.params.id;

    let qr = `SELECT * from city WHERE id = ${gID} `;

    db.query(qr,(err,result)=>{

        if (err) {
            console.log(err);
        }

        if (result.length>0) {
            res.send({
                message: 'Get single data',
                data: result
            });
        }
        else
        {
            res.send({
                message:'Data not found'
            });
        }
    });
});


// Create data

app.post('/city', (req,res)=>{

    console.log(req.body, 'Create data');

    let cityName = req.body.city_name;
    let cityCountry = req.body.city_country;

    let qr = `INSERT INTO city (city_name, city_country) 
                VALUES('${cityName}', '${cityCountry}')`;

    console.log(qr,'qr')
    db.query(qr,(err,result)=>{

        if(err){
            console.log(err);
        }
        console.log(result, 'result')

        res.send({
            message: 'Data inserted',
        });
    });


});


//  Update data

app.put('/city/:id', (req,res)=>{

    console.log(req.body, 'Update Data');


    let gID = req.params.id;
    let cityName = req.body.city_name;
    let cityCountry = req.body.city_country;


    let qr = ` UPDATE city SET city_name = '${cityName}', city_country = '${cityCountry}' 
                WHERE id = ${gID}`;

    db.query(qr,(err,result)=>{

        if (err) {
            console.log(err);
        }
        res.send({
            message: 'Data updated'
        });
    });

});


// Delete single data

app.delete('/city/:id',(req,res)=>{

    let gID = req.params.id;

    let qr = ` DELETE FROM city WHERE id = '${gID}' `;

    db.query(qr,(err, result)=>{
        if (err) {
            console.log(err);
        }
        res.send({
            message:' Data deleted'
        });
    });
});

















app.listen(3000,() =>{
    console.log('server running..');
});