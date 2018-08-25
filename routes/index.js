const router = require('koa-router')()
const home = require

module.exports = app => {
  router.get('/', require('./home').index)
  router.get('/index', require('./home').index)
  router.get('/user/signup', require('./user').signup)
  router.post('/user/signup', require('./user').signup)
  router.get('/user/login', require('./user').login)
  router.post('/user/login', require('./user').login)
  router.get('/user/logout', require('./user').logout)

  app.use(router.routes()).use(router.allowedMethods())
}
