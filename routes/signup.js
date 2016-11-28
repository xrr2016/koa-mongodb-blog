const express = require('express')
const router = express.Router()
const path = require('path')
const sha1 = require('sha1')

const UserModel = require('../models/users')
const checkNotLogin = require('../middlewares/check').checkNotLogin

//注册页面 get
router.get('/',checkNotLogin,function(req,res,next){
  res.render('signup')
})
//用户注册 post
router.post('/',checkNotLogin,function(req,res,next){
    let name = req.fields.name,
        gender = req.fields.gender,
        bio = req.fields.bio,
        avatar = req.fields.avatar.apth.split(path.sep).pop(),
        password = req.fields.password

        try{
          if(!(name.length >= 1 && name.length < 10)){
            throw new Error('名字在1至10个字符之内')
          }
          if(['m','f','x'].indexOf(gender) === -1){
            throw new Error('性别只能是m,f或x')
          }
          if(!(bio.length >= 1 bio.length <= 30)){
            throw new Error('个人简介请限制在1至30个字符之内')
          }
          if(!req.files.avatar.name){
            throw new Error('缺少头像')
          }
          if(password.length < 6){
            throw new Error('密码要大于6个字符')
          }
        }catch(e){
          req.flash('error',e.message)
          return res.redirect('/signup')
        }

        password = sha1(password)

        let user = {
          name:name,
          password:password,
          gender:gender,
          bio:bio,
          avatar:avatar
        }

        UserModel.create(user)
                 .then(function(result){
                   user = result.ops[0]
                   delete user.password
                   req.session.user = user
                   req.flash('success','注册成功')
                   return res.redirect('/posts')
                 })
                 .catch(function(e){
                   if(e.message.match('E1100 duplicate key')){
                     req.flash('error','用户名被占用')
                     return res.redirect('/signup')
                   }
                   next(e)
                 })
})

module.exports = router
