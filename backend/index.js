const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors') ;
connectToMongo();


const app = express()
const port = 300;

app.use(cors())
app.use(express.json())

// Available routes
app.use("/api/auth", require("./routes/auth"))
app.use("/api/notes", require("./routes/notes"))

app.get('/', (req, res) => {
    res.send('Hello harry')
})


app.listen(port, () => {
    console.log(`bongNotes app listening at http://localhost:${port}.`)
})