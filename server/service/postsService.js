const postData = require("../data/postsData")

exports.getPosts = () => {
    return postData.getPosts()
}

exports.getPost = async (id) => {
    const post = await postData.getPost(id)
    if (!post) {
        throw new Error("post não encontrado")
    } else {
        return post
    }
}

exports.savePost = async (post) => {
    const existingPost = await postData.getPostByTitle(post.title)
    if (existingPost) {
        throw new Error("post já existe")
    } else {
        return postData.savePost(post)
    }
}

exports.deletePost = (id) => {
    return postData.deletePost(id)
}

exports.updatePost = async (id, post) => {
    await exports.getPost(id)
    return postData.updatePost(id, post)
}
