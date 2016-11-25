const express = require('express')
const router = express.Router()

const checkLogin  = require('../middlewares/check').checkLogin

//flash消息
router.get('/',function(req,res,next){
  res.send(req.flash())
})
//发表一篇文章
router.post('/',checkLogin,function(req,res,next){
  res.send(req.flash())
})
//发表文页面
router.get('/create',checkLogin,function(req,res,next){
  res.send(req.flash())
})
//单个文章页面
router.get('/:postId',function(req,res,next){
  res.send(req.flash())
})
//更新文章页面
router.get('/:postId/edit',checkLogin,function(req,res,next){
  res.send(req.flash())
})
//删除一篇文章
router.post('/:postId/remove',checkLogin,function(req,res,next){
  res.send(req.flash())
})
//创建一条留言
router.post('/:postId/comment',function(req,res,next){
  res.send(req.flash())
})
//删除一条留言
router.get('/:postId/comment/:commentId/remove',checkLogin,function(req,res,next){
  res.send(req.flash())
})

module.exports = router
