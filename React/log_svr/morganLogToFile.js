var express = require('express')
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
var bodyParser = require('body-parser')

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'sensor_data.log'), { flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.post('/', function(req, res) {
  console.log('req.body=', req.body)
  accessLogStream.write(JSON.stringify(req.body))
  res.send('posted stuff dude')
})

const port = 8080
app.listen(port, console.log(`Listening on port ${port}!`))
