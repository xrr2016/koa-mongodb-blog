const validator = require('validator')

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

    if (validator.isEmpty(name)) {
      ctx.status = 400
      ctx.body = { msg: 'Can no set empty username.' }
      return
    }

    if (validator.isEmpty(email)) {
      ctx.status = 400
      ctx.body = { msg: 'Can no set empty email.' }
      return
    }

    if (!validator.isEmail(email)) {
      ctx.status = 400
      ctx.body = { msg: 'Email is no validate.' }
      return
    }

    if (validator.isEmpty(password)) {
      ctx.response.status = 400
      ctx.body = { msg: 'Can no set empty password.' }
      return
    }

    const user = await UserModel.findOne({ email })

    if (user) {
      ctx.body = '用户已存在'
      return
    }

    password = await UserModel.generateHash(password)

    const newUser = { name, email, password }
    const result = await UserModel.create(newUser)

    ctx.status = 302
    ctx.redirect('/')
  },
  async login(ctx, next) {
    if (ctx.method === 'GET') {
      await ctx.render('login', {
        title: '登录'
      })
      return
    }

    const { name, password } = ctx.request.body

    if (validator.isEmpty(name)) {
      ctx.status = 400
      ctx.body = { msg: 'Can no set empty username.' }
      return
    }

    if (validator.isEmpty(password)) {
      ctx.status = 400
      ctx.body = { msg: 'Can no set empty password.' }
      return
    }

    const user = await UserModel.findOne({ name })
    const isMatch = await UserModel.comparePassword(password, user.password)

    if (user && (await isMatch)) {
      ctx.session.user = {
        _id: user._id,
        name: user.name,
        isAdmin: user.isAdmin,
        email: user.email
      }
      ctx.redirect('/index')
    } else {
      ctx.body = '用户名或密码错误'
    }
  },
  async logout(ctx, next) {
    ctx.session = null
    ctx.redirect('/')
  }
}
