const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const showdown = require('showdown')
const converter = new showdown.Converter()
const fs = require('fs').promises
const aglio = require('aglio')

app.use(bodyParser.urlencoded({ extended: false })) 
app.use(bodyParser.json())

app.get('/', (request, response) => {
    fs.readFile('./markdown.md').then((text) => {
        aglio.render(text.toString(), {
            themeVariables: 'default'
        }, (err, html, warnings) => {
            response.send(html)
        })
    })
})

app.listen(8080)