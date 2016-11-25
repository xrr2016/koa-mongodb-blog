const express = require('express')
const router = express.Router()

const checkNotLogin = require('../middlewares/check').checkNotLogin

//注册页面
router.get('/',checkNotLogin,function(req,res,next){
  res.send(req.flash())
})
//用户注册
router.post('/',checkNotLogin,function(req,res,next){
  res.send(req.flash())
})

module.exports = router
