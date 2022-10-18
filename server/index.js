const express = require("express")
const app = express()

app.use(express.json())
app.use("/", require("./routes/postsRoute"))
app.use((error, req, res, next) => {
    if (error.message === "post já existe") {
        return res.status(409).send(e.message)
    }
    if (error.message === "post não encontrado") {
        return res.status(404).send(e.message)
    }
    res.status(500).send(error.message)
})

app.listen("2000", (req, res) => {
    console.log("Ouvindo")
})