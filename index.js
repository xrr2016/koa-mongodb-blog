const Koa = require('koa')
const mongoose = require('mongoose')
const path = require('path')
const serve = require('koa-static')
const views = require('koa-views')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')

const router = require('./routes')
const config = require('./config/config')

const app = new Koa()
const port = 3000 || process.env.PORT

mongoose.connect(
  config.db,
  {
    useNewUrlParser: true
  }
)
mongoose.Promise = global.Promise

app.use(
  views(path.join(__dirname, 'views'), {
    map: { html: 'nunjucks' }
  })
)
app.use(
  session(
    {
      key: config.session.key,
      maxAge: config.session.maxAge
    },
    app
  )
)
app.use(bodyParser())
app.use(serve(path.join(__dirname, 'public')))

router(app)

app.listen(port, () => {
  console.log(`app running on ${port}.`)
})
