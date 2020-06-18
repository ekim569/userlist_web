var express = require('express')
var mysqal = require('mysql')

var router = express.Router()

sql_config = {
    host:'localhost',
    user: 'root',
    password: '1234',
    database:'o2',
}
var db = mysqal.createConnection(sql_config)

router.get('/topic/add', (req, res)=>{

    var sql = 'SELECT *  FROM topic'
    db.query(sql, (err, result)=>{
        if (err) {
            console.log(err)
            res.status(500).send("Internal server error")
        }
        console.log(result)
        res.render("add" , {topics:result})
    })
   
})

router.post('/topic/add', (req, res)=>{
    var title = req.body.title
    var description = req.body.description
    var author = req.body.author
    console.log(`제목은 ${title} 설명은 ${description} 글쓴이 ${author}`)
    var sql = 'INSERT INTO topic (title, description, author) VALUES(?, ?, ?)'
    var queryData = [title, description, author]

    db.query(sql, queryData,(err,  result)=>{
        if(err){
            console.log(err)
            res.status(500).send("Internal server error")
        } 
        console.log(result)
        res.redirect("/topic/add")
    })
    
})


router.get(['/topic','/topic/:id'], (req, res)=>{
    var sql =  `SELECT *FROM topic`
    db.query(sql, (err, results)=>{
        var id = req.params.id
        if(id) {
                
            //var sql = 'SELECT *FROM topic WHERE id='+id  
            var sql = `SELECT *FROM topic WHERE id= ${id}`
            console.log(id)
            db.query(sql,(err, result)=>{
                if(err){
                    console.log(err)
                }
                console.log(result[0])
                res.render('view', {topics:results, topic:result[0]})
            })
        }    else {
        
            res.render('view', {topics:results, topic:undefined} )
        }
    })
 

})//params값

module.exports = router;