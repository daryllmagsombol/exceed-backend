const router = require('express').Router()

module.exports = class PostRouter{

    constructor(Post){
        this.Post = Post
    }

    getRouter(){

        //CREATE
        router.post('/', async (req, res) => {

            const errors = []
            const data = req.body
            if(!data.title) errors.push("Title is required.")
            if(!data.body) errors.push("Body is required.")
            if(!data.author) errors.push("Author is required")

            if(errors.length > 0)return res.status(400).json({ message: "Validation Errors", errors })

            const post = this.Post.build(data)
            const savedPost = await post.save()

            return res.send(savedPost)
        })

        //READ
        router.get('/', async (req, res) => {
            return res.send(await this.Post.findAll())
        })

        //READ
        router.get('/:id', async (req, res) => {

            const id = req.params.id
            const post = await this.Post.findOne({ where: { id } })
            if(!post)return res.status(404).json({message: "Post Not Found!"})

            return res.send(post)
        })

        //UPDATE
        router.patch('/:id', async (req, res) => {

            const id = req.params.id
            const post = await this.Post.findOne({ where: { id } })
            if(!post)return res.status(404).json({message: "Post Not Found!"})

            const data = req.body
            if(data.title) post.title = data.title
            if(data.body) post.body = data.body
            if(data.author) post.author = data.author

            const updatedPost = await post.save()
            return res.send(updatedPost)
        })

        //DELETE
        router.delete('/:id', async (req, res) => {

            const id = req.params.id
            const post = await this.Post.findOne({ where: { id } })
            if(!post)return res.status(404).json({message: "Post Not Found!"})

            await post.destroy()

            return res.send({ message: "Post has been deleted!"})
        })

        return router
    }
    
}