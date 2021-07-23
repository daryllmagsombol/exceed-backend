const { DataTypes } = require("sequelize")


const createPostModel = (sequelize) => {

    const Post = sequelize.define('Post', {
        title: DataTypes.TEXT,
        body: DataTypes.TEXT,
        author: DataTypes.TEXT
    })

    Post.sync().then(() => {
        console.log("posts table created")
    }).catch((err) => {
        console.error("failed to create posts table")
        console.error(err)
    })
    
    return Post
}

module.exports = {
    createPostModel
}