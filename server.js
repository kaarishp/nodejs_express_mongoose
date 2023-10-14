const express = require("express")
const employeesRoutes = require("./routes/employee")
const usersRoutes = require("./routes/user")
const mongoose = require('mongoose')

const app = express()

const SERVER_PORT = 3001

app.use(express.json())
app.use(express.urlencoded())
const DB_CONNECTION_STRING = "mongodb+srv://dbking:hrlX3Ms1xg0ZOEz3@cluster0.qggx7lx.mongodb.net/comp3123_assigment1?retryWrites=true&w=majority"

mongoose.connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})


app.use("/api/v1/emp", employeesRoutes)
app.use("/api/v1/user", usersRoutes)

app.route("/")
    .get((req, res) => {
        res.send("<h1>Assignment1 - Kaarish Parameswaran</h1>")
    })

app.listen(SERVER_PORT, () =>{
    console.log(`Server running at http://localhost:${SERVER_PORT}/`)
})