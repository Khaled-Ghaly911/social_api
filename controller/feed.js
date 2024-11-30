const { validationResult } = require('express-validator')
const Post = require('../models/post');
// const mongoose = require('mongoose')

exports.getPosts = (req, res, next) => {
    post.find()
    .then(posts => {
        res.status(200).json({
            message: 'fetched posts successfully!',
            posts: posts
        });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
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

exports.getPost = (req, res, next) => {
    const postId = req.params.postId;
    Post.findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error('Could not find post.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            message: 'Post Fetched!',
            post: post
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}