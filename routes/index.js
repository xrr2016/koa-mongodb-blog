const router = require('koa-router')()
const home = require

module.exports = app => {
  router.get('/', require('./home').index)
  router.get('/user/signup', require('./user').signup)
  router.post('/user/signup', require('./user').signup)

  app.use(router.routes()).use(router.allowedMethods())
}
