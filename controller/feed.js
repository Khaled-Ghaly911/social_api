const { validationResult } = require('express-validator')
const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
      posts: [
        {   
            _id: '1',
            title: 'First Post',
            content: 'This is the first post!', 
            imageUrl: 'images/home.jpg',
            creator: {
                name: 'Khaled Ghaly'
            },
            createdAt: new Date() 
        }
    ]});
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        const error = new Error('validation failed, entered data is not correct');
        error.statisCode = 422;
        throw error
    }
    const title = req.body.title;
    const content = req.body.content;
    //create post in db 
    const post = new Post({
        title: title, 
        content: content,
        imageUrl: 'images/home.jpg',
        creator: {
            name: 'Khaled Ghaly'
        },
    })
    post.save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'post created successfully!',
            post: result
        });    
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
    
}