const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var md5 = require('md5');
const jwt = require('jsonwebtoken');

app.use(express.json());

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors());
app.options('*', cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 
  next();
});

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "notes",
    multipleStatements: true
});

setInterval(function () {
    db.query('SELECT 1');
}, 2000);

app.get('/', (req, res) => {  res.send('<h1>Welcome to Sabicom Notes Backend!</h1>');});

app.get("/notes/:email", (req, res) => {
    var email = req.params.email;
    db.query("SELECT * FROM notes where email = ?", [email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/notes-all", (req, res) => {
    db.query("SELECT * FROM notes", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/notes/:id", (req,res)=>{
    const id =  req.params.id;
    db.query("SELECT * FROM notes WHERE id = ?", [id],(err,result)=>{
        if (err) {
            console.log(err);
        } else { 
            res.send(result);
        }
    });
});

app.post("/create-note", (req,res)=>{

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 

    const title = req.body.title;
    const note = req.body.note;
    const keywords = req.body.keywords;
    const email = req.body.email;

    db.query("SET FOREIGN_KEY_CHECKS = 0");
    db.query("INSERT INTO notes SET title=?, note=?, keywords=?, email=?", [title, note, keywords, email], (err,result)=>{
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

app.post("/edit-note", (req,res)=>{

	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); 

    const id = req.body.id;
    const title = req.body.title;
    const note = req.body.note;
    const keywords = req.body.keywords;

		    db.query("SET FOREIGN_KEY_CHECKS = 0");
		    db.query("UPDATE notes SET title=?, note=?, keywords=? WHERE id=?", [title, note, keywords, id], (err,result)=>{
		        if (err) throw err;
		        res.end(JSON.stringify(result));
		    });

});

app.delete("/delete-note", (req,res)=>{
    const id =  req.body.id;
    db.query("SET FOREIGN_KEY_CHECKS = 0");
    db.query("DELETE FROM notes WHERE id = ?", [id],(err,result)=>{
        if (err) throw err;
        res.end('Record has been deleted!');
    });
});

app.get("/users", (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.get("/users/:email", (req, res) => {
    var email = req.params.email;
    db.query("SELECT * FROM users where email = ?", [email], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.put('/update-user', function(request, response) {

    var email = request.body.email;
    var password = md5(request.body.password);
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var role = request.body.role;
    var id = request.body.id;


    db.query('UPDATE users SET email=?, password=?, first_name=?, last_name=?, role=? WHERE id=?', [email, password, first_name, last_name, role, id], function(err, result) {
    if(err){
        response.send(err);
    }else{
        response.send('Success edit!');
    }
    });
});

app.delete("/delete-user", (req,res)=>{
    const id =  req.body.id;
    db.query("SET FOREIGN_KEY_CHECKS = 0");
    db.query("DELETE FROM accounts_user WHERE id = ?", [id],(err,result)=>{
        if (err) throw err;
        res.end(JSON.stringify(result));
    });
});

app.post('/login', function(request, response){
    const { email, password } = request.body
    const sql = 'SELECT * FROM users WHERE email = ' + mysql.escape(email)
    db.query(sql, (err, result) => {
      if (err) {
        response.status(500).send(err.message)
      } else if (!result.length) {
        response.status(401).send("Incorrect email")
      } else {
          if(md5(password) === result[0].password){
            const payload = { email }
            const token = jwt.sign(payload, 'somethingSecretBro5', { expiresIn: '30m' })
            response.cookie('token', token, { httpOnly: true })
            response.status(200).send({"token": token, "role": result[0].role, "email": result[0].email});
          }else{
            response.status(403).send("Incorrect password")
          }
      }
    })
})

app.post('/register', function(request, response) {

    var  email   = request.body.email;
    var password = md5(request.body.password);

    var first_name = request.body.first_name;
    var last_name = request.body.last_name;
    var role = 'normal';

      const values = [[email, password, first_name, last_name, role]];
      db.query('INSERT INTO users (email, password, first_name, last_name, role) VALUES ?', [values], (err, result) => {
        if (err) {
            response.status(409).send('Email already exists')
            console.log(err);
        } else {
            response.status(200).send("Successfully registered! Please login");
        }
      })
})

app.listen(3001, function(){
  console.log("Express server listening on port %d", this.address().port);
});
