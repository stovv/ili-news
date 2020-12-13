const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send(`HELLO!`)
})

app.listen(process.env.SITEMAP_GENERATOR_PORT, () => {
    console.log(`Sitemap Generator at http://localhost:${process.env.SITEMAP_GENERATOR_PORT}`)
})
