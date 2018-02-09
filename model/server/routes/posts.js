import express from 'express';
import passport from 'passport';
import { Post, 
        addPost, 
        fetchPostsByUserId, 
        fetchRecentPostsByUserId,
        addNewComment,
        getCommentsByPostId,
        updateLikeStatus } from '../models/post';

const router = express.Router();

router.post('/submit', (req, res) => {

    const {content, postedBy} = req.body;
    const newPost = Post({
        content,
        postedBy: {
            id: postedBy
        }
    });

    addPost(newPost, (err, post) => {
        if(err){
            res.status(403).json({success: false, errors: err});
        }else{

            res.status(200).json({post, success: true, errors: null});
        }
    }) 
});

 router.get(`/initial`, passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userId = req.user._id;
    fetchPostsByUserId(userId, (err, posts) => {
        if(err){
            res.status(500).json({msg: "error"});
        }else{
            const initialPosts = posts.tempPosts;
            res.json({initialPosts});
        }
    });
 }); 

  router.get(`/recent/latestPost`, passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userId = req.user._id;
    const latestPost = req.query.date;

      fetchRecentPostsByUserId(userId, latestPost, (err, posts) => {
        if(err){
            res.status(500).json({msg: "error"});
        }else{
            const recentPosts = posts.tempPosts;
            res.status(200).json({recentPosts});
        }
    });  
 }); 

 router.post('/comment/submit', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    const userCommenting = req.user._id.toString();
    const commentData = {postId: req.body.postId, text: req.body.text, liked: req.body.liked}
    
     addNewComment(commentData, userCommenting, (err, postCommented) => {
        if(err){
            res.status(500).json({msg:"error"})
        }else{
            res.status(200).json({postCommented: postCommented.tempPosts[0]})
        }
     });

 });


 router.get('/comment/fetch/:postId', (req, res, next) => {
    const { postId } = req.params

    getCommentsByPostId(postId, (err, result) => {
        if(err){
            res.status(500).json({msg: "error"})
        }else{
            const comments = result[0].tempComments;
             res.status(200).json({comments})
        }
    });
 });

 router.post('/like/submit', passport.authenticate('jwt', {session: false}), (req, res, next) => {
     const userId = req.user._id;
     let postId;
     let liked;
     if(req.body.postId.substring(0, 4) == 'true'){
         postId = req.body.postId.substring(5);
         liked = true
     }else{
         
         postId = req.body.postId;
         liked = false
     }

     updateLikeStatus(postId, userId, liked, (err, post) => {
         if(err){
             res.status(500).json({msg: "error"})
         }else{
             const updatedPost = post[0].tempPosts[0];
              res.status(200).json({updatedPost}) 
         }
     })
 })

export default router;