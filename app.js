const express = require("express");
const mysql = require('mysql');

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wilayah_indonesia'
});

connection.connect((err) => {
    if (err) {
        console.log('error connecting: ' + err.stack);
        return;
    }
    console.log('Database Connect');
});

app.get("/", function (req, res) { 
    connection.query(
        'SELECT * FROM wilayah_provinsi',
        (error, results) => {
            if(error){
                console.log(error);
            }else{
                res.render('index', { items: results });
            }
        }
    );
})

app.post('/kabupaten', function (req,res){
    var id=  req.body.provinsi;
    var sql=`SELECT id,nama FROM wilayah_kabupaten WHERE provinsi_id = ${id}`;
    connection.query(sql,function(err, result) {
        if (err){
            console.log(err);
        }else{
            result.forEach((item) => {
                res.write(`<option value="${item.id}">${item.nama}</option>`);
            });
            res.end();
        }
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server Running in 3000");
})