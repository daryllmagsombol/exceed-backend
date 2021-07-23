const router = require('express').Router()
const sql = require('../database')
const PostRouter = require('./posts.route')

const { createPostModel } = require('../models/post.model')

const Post = createPostModel(sql)
const postRouter = new PostRouter(Post)

router.use('/posts', postRouter.getRouter())

module.exports = router