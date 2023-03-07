import mysql from "mysql"

export const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password:"Marcelo1",
    database:"crud"
})