const express = require('express')
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const app = new express()
const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost.js')

app.set('view engine','ejs')
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true})


app.listen(4000, () => {
    console.log('App listening on port 4000')
})

app.get('/', async (req,res)=>{
    //res.sendFile(path.resolve('\public', 'index.html'))
    const blogposts = await BlogPost.find({})
    res.render('index', {
        blogposts
    });
})

app.get('/contact', (req,res)=>{
    //res.sendFile(path.resolve('\public', 'contact.html'))
    res.render('contact');
})

app.get('/about', (req,res)=>{
    //res.sendFile(path.resolve('\public', 'about.html'))
    res.render('about');
})

app.get('/post/:id', async (req,res)=>{
    //res.sendFile(path.resolve('\public', 'post.html'))
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    });
})

app.get('/posts/new', (req,res)=>{
    res.render('create')
})

// async version for better readability
app.post('/posts/store', async (req,res)=>{
    await BlogPost.create(req.body)
    res.redirect('/')
})
    
    