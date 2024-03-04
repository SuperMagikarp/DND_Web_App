const express = require("express");
const path = require("path");
const mysql = require("mysql")

const app = express();


var con =  mysql.createConnection({
    host: 'localhost',
    port: 5051,
    user: 'root',
    password: '',
    database:'cuantest'
}
)
con.connect(function(err){
  if(err) throw err;
  console.log("Connected");
  var sql = "INSERT INTO people (name, age) values ('Rod', 63)"
  con.query(sql, function(err, result){
    if (err) throw err;
    console.log("1 record inserted")
  })
})


app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});
app.post('/*', (req, res) => {
    res.send('Got a POST request')
  })

app.listen(process.env.PORT || 5050, () => console.log("Server Running"));