var express = require('express')
var path = require('path')
var app = express()

app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded())
app.use(express.json())

app.get('/hello', (request, response)=>{
    console.log(request)
    response.render('hello.ejs')
})

var port = 8000;

app.listen(port, ()=>{
    console.log(`Server is Running at http://localhost:8080`)

})