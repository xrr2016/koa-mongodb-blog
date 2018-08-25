const { UserModel } = require('../models/index')

module.exports = {
  async signup(ctx, next) {
    if (ctx.method === 'GET') {
      await ctx.render('signup', {
        title: '注册'
      })
      return
    }

    let { name, email, password } = ctx.request.body

    password = bcrypt.hash(password, salt)

    const newUser = { name, email, password }
  }
}
