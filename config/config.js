module.exports = {
  port: process.env.PORT || 3000,
  session: {
    key: 'koa-blog',
    maxAge: 86400000
  },
  keys: 'koa-blog',
  db: 'mongodb://localhost:27017/koa-blog'
}
