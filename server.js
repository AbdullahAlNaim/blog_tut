const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article');
const articleRouter = require('./routes/articles');

//this is a library to be able to use method delete
const methodOverride = require('method-override');
const app = express();
const port = 8080;


mongoose.connect('mongodb://127.0.0.1/blog');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
//this is the line that lets us use override method within ejs
app.use(methodOverride('_method'));

app.get('/', async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter);

app.listen(port, () => {
    console.log(`running server on port ${port}`)
});