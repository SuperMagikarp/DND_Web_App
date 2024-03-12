const express = require("express");
const path = require("path");
const mysql = require("mysql")

const app = express();


var con =  mysql.createConnection({
    host: 'localhost',
    port: 5051,
    user: 'SuperMagikarp',
    password: '',
    database:'cuantest'
}
)

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/notes/all", (req, res) => {
  res.json({ notes: [
    {
      id:"1",
      title: "SADGE",
      note: "I killed  a player today, That was bad",
      user: "Cuan",
      date: "11/04/2023"
    },
    {
      id:"2",
      title: "SADGER",
      note: "I killed another player today, That was bad",
      user: "Cuan",
      date: "11/04/2023"
    }
    ]
    })
})
app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.post('/notes/update', (req, res) => {
  console.log(req)
  
  })

app.listen(process.env.PORT || 5050, () => console.log("Server Running"));