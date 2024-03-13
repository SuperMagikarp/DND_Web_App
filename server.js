import path from "path"
import { fileURLToPath } from "url"
import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"

dotenv.config()
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

var con =  mysql.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function getNotes(){
  const [rows] = await con.query("SELECT * FROM notes")
  return rows
}

app.use("/static", express.static(path.resolve(__dirname, "frontend", "static")));

app.get("/notes/all", async (req, res) => {
  const notes = await getNotes()
  res.send({notes: notes})
})

app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "index.html"));
});

app.post('/notes/update', (req, res) => {
  console.log(req)  
})

app.listen(process.env.PORT, () => console.log("Server Running"));