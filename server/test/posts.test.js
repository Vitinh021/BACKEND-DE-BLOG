const axios = require("axios")
const postsService = require("../service/postsService")
const crypto = require("crypto")

const generate = () => {
    return crypto.randomBytes(10).toString("hex")
}

const request = function (url, method, data) {
    return axios({ url, method, data, validateStatus: false })
}

test("deve receber postagens", async () => {
    //given -> dado que
    const post1 = await postsService.savePost({ title: generate(), content: generate() })
    //when -> quando acontecer
    const response = await request("http://localhost:2000/posts", "get")
    expect(response.status).toBe(200)
    const resul = response.data
    //then -> então teremos
    expect(resul).toHaveLength(1)
    await postsService.deletePost(post1.id)
})

test("deve salvar um post", async () => {
    const post1 = { title: generate(), content: generate() }
    const response = await request("http://localhost:2000/posts", "post", post1)
    expect(response.status).toBe(201)
    const resul = response.data
    expect(resul.title).toBe(post1.title)
    expect(resul.content).toBe(post1.content)
    await postsService.deletePost(resul.id)
})

test("não deve salvar um post", async () => {
    const post1 = { title: generate(), content: generate() }
    const response1 = await request("http://localhost:2000/posts", "post", post1)
    const response2 = await request("http://localhost:2000/posts", "post", post1)
    expect(response2.status).toBe(409)
    const resul = response1.data
    await postsService.deletePost(resul.id)
})

test("deve atualizar um post", async () => {
    const post1 = await postsService.savePost({ title: generate(), content: generate() })
    post1.title = generate();
    post1.content = generate();
    const response = await request(`http://localhost:2000/posts/${post1.id}`, "put", post1)
    expect(response.status).toBe(204)
    const updatePost = await postsService.getPost(post1.id)
    expect(updatePost.title).toBe(post1.title)
    expect(updatePost.content).toBe(post1.content)
    await postsService.deletePost(post1.id)
})

test("não deve atualizar um post", async () => {
    post1 = {
        id: 1
    }
    const response = await request(`http://localhost:2000/posts/${post1.id}`, "put", post1)
    expect(response.status).toBe(404)
})

test("deve deletar um post", async () => {
    const post1 = await postsService.savePost({ title: generate(), content: generate() })
    const response = await request(`http://localhost:2000/posts/${post1.id}`, "delete")
    expect(response.status).toBe(204)
    const posts = await postsService.getPosts()
    expect(posts).toHaveLength(0)
})

