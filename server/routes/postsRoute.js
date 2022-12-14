const express = require("express")
const router = express.Router();
const postsService = require("../service/postsService")

router.get("/posts", async (req, res, next) => {
    try {
        const posts = await postsService.getPosts()
        res.status(200).json(posts)
    } catch (e) {
        next(e)
    }
})

router.post("/posts", async (req, res, next) => {
    const post = req.body
    try {
        const newPost = await postsService.savePost(post)
        res.status(201).json(newPost)
    } catch (e) {
        next(e)
    }
})

router.put("/posts/:id", async (req, res, next) => {
    try {
        await postsService.updatePost(req.params.id, req.body)
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

router.delete("/posts/:id", async (req, res, next) => {
    try {
        await postsService.deletePost(req.params.id)
        res.status(204).end()
    } catch (e) {
        next(e)
    }
})

module.exports = router