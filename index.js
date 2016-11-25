const path = require('path')
const express = require('express')
const app = express()
//路由
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')


app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

//错误处理
app.use(function(err,req,res,next){
  console.log(err.stack)
  res.status(500).send("Something Broke!!!")
})


app.use('/',indexRouter)
app.use('/users/',userRouter)



app.listen(3000)
