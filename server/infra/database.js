const pgp = require("pg-promise")()
const bd = pgp({
    user: "postgres",
    password: "123",
    host: "localhost",
    port: 5432,
    database: "blog"
})

module.exports = bd