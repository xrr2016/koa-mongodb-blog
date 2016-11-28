const path = require('path')
const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const config = require('config-lite')
const routes = require('./routes')
const pkg = require('./package')

const app = express()

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

//静态文件
app.use(express.static(path.join(__dirname,'public')))
//session
app.use(session({
  name:config.session.key,
  secret:config.session.secret,
  cookie:{
    maxAge:config.session.maxAge
  },
  store:new MongoStore({
    url:config.mongodb
  })
}))
//显示通知
app.use(flash())
app.use(require('express-formidable')({
  uploadDir:path.join(__dirname,'public/img'),
  keepExtensions:true
}))

app.locals.blog = {
  title : pkg.name,
  description:pkg.description
}

app.use(function(req,res,next){
  res.locals.user = req.session.user
  res.locals.success = req.flash('success').toString()
  res.locals.error = req.flash('error').toString()
  next()
})

routes(app)

//错误处理
app.use(function(err,req,res,next){
  console.log(err.stack)
  res.status(500).send("Something Broke!!!")
})

app.listen(config.port,function(){
  console.log(`${pkg.name} Listening on port ${config.port}`)
})
