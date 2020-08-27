var express = require('express')
var fs = require('fs')
var bodyParser = require('body-parser')
var app = express()
var util = require('util')

// create a write stream (in append mode)
var log_file = fs.createWriteStream('./sensor_data.log', { flags: 'a' })
var log_stdout = process.stdout

console.log = function(d) {
  try {
    // only write valid json to the log file
    JSON.parse(d)
    log_file.write(util.format(d) + ',\n')
  } catch (err) {
    let e = d + ' is NOT valid JSON, err=' + err
    log_stdout.write(util.format(e) + '\n')
  }
  log_stdout.write(util.format(d) + '\n')
}
 
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('hello, world!')
})

app.post('/', function(req, res) {
  console.log(JSON.stringify(req.body))
  //accessLogStream.write(JSON.stringify(req.body))
  res.send('posted stuff dude')
})

const port = 8080
app.listen(port, console.log(`Listening on port ${port}!`))
