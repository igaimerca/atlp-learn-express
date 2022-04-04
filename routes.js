const express = require("express");
const Post = require("./models/Post");
const router = express.Router();

router.get("/posts", async (req, res) => {
    const posts = await Post.find();
    res.send(posts);
});

router.post("/posts", async (req, res) => {
    let { title, content } = req.body;

    const post = new Post({ title, content });
    await post.save();
    res.send(post);
});

router.get("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });
        res.send(post);
    } catch {
        res.status(404);
        res.send({ error: "Post not found!" });
    }
});

router.patch("/posts/:id", async (req, res) => {
    try {
        const post = await Post.findOne({ _id: req.params.id });

        if (req.body.title) {
            post.title = req.body.title;
        }

        if (req.body.content) {
            post.content = req.body.content;
        }

        await post.save();
        res.send(post);
    } catch {
        res.status(404);
        res.send({ error: "Post not found!" });
    }
});

router.delete("/posts/:id", async (req, res) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.status(204).send();
    } catch {
        res.status(404);
        res.send({ error: "Post not found!" });
    }
});

module.exports = router;
