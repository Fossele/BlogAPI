const MONGO_URI = "mongodb://localhost:27017/blogDB";

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// DB connection
mongoose.connect(MONGO_URI)
  .then(() => console.log("Mongoose connected"))
  .catch(err => console.log(err));

// Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    category: String,
    tags: [String],
    date: { type: Date, default: Date.now }
});

const Blog = mongoose.model("Blog", blogSchema);


// ================= ROUTES =================

// CREATE ARTICLE
app.post('/api/articles', async (req, res) => {
    try {
        const { title, content, author, category, tags } = req.body;

        if (!title || !content || !author) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        const blog = new Blog({ title, content, author, category, tags });

        await blog.save();

        res.status(201).json({
            message: "Article created",
            id: blog._id
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET ALL / FILTER ARTICLES
app.get('/api/articles', async (req, res) => {
    try {
        const { category, author, date } = req.query;

        let filter = {};

        if (category) filter.category = category;
        if (author) filter.author = author;
        if (date) filter.date = new Date(date);

        const blogs = await Blog.find(filter);

        res.status(200).json(blogs);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// GET SINGLE ARTICLE
app.get('/api/articles/:id', async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json(blog);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// UPDATE ARTICLE
app.put('/api/articles/:id', async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content, category, tags },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({
            message: "Article updated",
            article: updatedBlog
        });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// DELETE ARTICLE
app.delete('/api/articles/:id', async (req, res) => {
    try {
        const deleted = await Blog.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: "Article not found" });
        }

        res.status(200).json({ message: "Article deleted" });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// SEARCH ARTICLES
app.get('/api/articles/search', async (req, res) => {
    try {
        const { query } = req.query;

        const results = await Blog.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        });

        res.status(200).json(results);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// SERVER
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});