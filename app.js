const MONGO_URI="mongodb://localhost:27017"

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const app = express()

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(MONGO_URI).then(()=>console.log("Mongoose database connected")).catch(err=>console.log(err));

const blogSchema = {
    title: String,
    content: String,
}

const Blog = mongoose.model("Blog", blogSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/api/articles', async (req, res) => {
    try{
        const blog = await Blog.find({});
        res.send(blog);
    }catch (err){
         res.send(err);
    }
});

app.get('/api/articles/{id}', async (req, res) => {
      try{
      const blog = Blog.find({ title: req.params.id });
       res.send(blog);
      } catch(err){
        res.send(err);
      }
    });


app.post('/api/articles', async (req, res) => {
    const title = req.body.title;
    const content = req.body.content;

    const blog = new Blog({
        title: title,
        content: content
    })

    try {
        await blog.save();
        res.send('blog added!');
    } catch (err) {
        res.send(err);
    }
});

app.delete('/api/articles/{id}', async (req, res) => {
    const title = req.body.title;

    try {
        await Blog.deleteOne({ title: title });
        res.send("blog deleted!");
    } catch (err) {
        res.send(err);
    }
});

app.put(' /api/articles/{id}', async (req, res) => {
    const { title, newTitle, newContent } = req.body;

    try {
        const updatedBlog = await Blog.findOneAndUpdate(
            { title: title }, 
            { title: newTitle, content: newContent }, 
            { new: true } 
        );

        res.send(updatedBlog);
    } catch (err) {
        res.send(err);
    }
});

app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});
