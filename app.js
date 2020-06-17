var express = require('express')
var path = require('path')
var mysqal = require('mysql')
var app = express()

sql_config = {
    host:'localhost',
    user: 'root',
    password: '1234',
    database:'o2',
}
var db = mysqal.createConnection(sql_config)
db.connect()


app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/hello', (request, response)=>{
    var name = "hansol"

    //console.log(request)
    response.render('hello', {data:name})
})
app.get('/data', (req, res)=>{
    var sql = 'SELECT *  FROM topic'
    db.query(sql , (err , result)=>{
        if(err) {
            console.log(err)
        } else {
            console.log(result[0].description)
           //res.send(`${result[1].author} 수업은 ${result[1].title}`)
           res.render('data', {data:result})
        }
        
    })
})

var port = 8000;

app.listen(port, ()=>{
    console.log(`Server is Running at http://localhost:${port}`)

})