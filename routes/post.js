const express = require('express');
const Post = require('../model/post');
const router = express.Router();



router.post('/post/save',(req,res)=>{
    let newPost = new Post(req.body);

    newPost.save((err) => {
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Posts saved successfully",
            status: "Success"
        });
    });
});

module.exports = router