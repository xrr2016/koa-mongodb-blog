const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

//注册页面
router.get('/',function(req,res,next){
  res.render('signup')
})
//用户注册
router.post('/',function(req,res,next){
  res.send(req.flash())
})

module.exports = router
