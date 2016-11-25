const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

//登录页面
router.get('/',checkNotLogin,function(req,res,next){
  res.send(req.flash())
})
//用户登录
router.post('/',checkNotLogin,function(req,res,next){
  res.send(req.flash())
})

module.exports = router
