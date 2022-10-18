const database = require("../infra/database")

exports.getPosts = () => {
    return database.query("SELECT * FROM blog.posts")
}

exports.getPost = (id) => {
    return database.oneOrNone("SELECT * FROM blog.posts WHERE id = $1", [id])
}

exports.getPostByTitle = (title) => {
    return database.oneOrNone("SELECT * FROM blog.posts WHERE title = $1", [title])
}

exports.savePost = (post) => {
    return database.one("INSERT INTO blog.posts(title, content) VALUES ($1, $2) RETURNING *", [post.title, post.content])

}

exports.deletePost = (id) => {
    return database.none("DELETE FROM blog.posts WHERE id = $1", [id])
}

exports.updatePost = (id, post) => {
    return database.none("UPDATE blog.posts SET title = $1, content = $2 WHERE id = $3", [post.title, post.content, id])
}