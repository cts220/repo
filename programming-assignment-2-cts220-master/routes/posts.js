//Charles Sengor cts220
//details in readme

const express = require('express');
const Post = require('../models/Post.js');
const router = express.Router();

/* GET home page. */
router.get('/', async function(req, res, next) {
  //if there is a search query, handle that (didn't have enough time to implement)
  if (Object.keys(req.query).length !== 0)
  {
    var result = [];
    //var posts =
    res.send(req.query)
  }
  
  //else display all posts

  //retrieve all posts and send them as the response
  try {
    var result = await Post.find().exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }

});

router.post('/', async function (req, res, next) {
  var post = new Post(req.body);
  await post.save((err) => {
  if (err) { return next(err); }
      
  //else send 200
  //res.send('Created post ' + post.id)
  res.status(200).send('Created post ' + post.id);
  }); 
  //console.log("post");
})

router.get('/:id/', async function (req, res, next) {
  try {
    var result = await Post.findById(req.params.id).exec();
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.put('/:id/', async function (req, res, next) {
  try {
    var result = await Post.findById(req.params.id).exec();
    /*if (result == null) //if there is no post with the given id, make a new post
    {
      var post = new Post(req.body);
      await post.save((err) => {
        if (err) { return next(err); }
        res.send('Created post ' + post.id)
        //res.status(200).send();
        }); 
    }*/
    result.set(req.body);
    var savedResult = await result.save();
    res.send(savedResult);
  } catch (error) {
    res.status(500).send(error);
  }
 
})

router.delete('/:id/', async function (req, res, next) {
    try {
      var result = await Post.deleteOne({
        _id: req.params.id
      }).exec();
      res.send('Deleted ' + req.params.id)
    } catch (error) {
      res.status(404).send(error);
    }
})

router.post('/:id/comments', async function (req, res, next) {
  try {
    //navigate to the post that the comment belongs to  
    var postOfComment = await Post.findById(req.params.id).exec();
    var result = postOfComment.comments;
    //add the comment to the comments of the post
    result.push(req.body);
    //save the post
    var savedResult = await postOfComment.save();
    res.send(savedResult) 

  } catch (error) {
    res.status(500).send(error);
  }

})

router.get('/:id/comments', async function (req, res, next) {
  try {
    var postOfComment = await Post.findById(req.params.id).exec();
    var result = postOfComment.comments;
    res.send(result)
  } catch (error) {
    res.status(404).send(error);
  }
})

router.get('/:id/comments/:comment_id', async function (req, res, next) {
  try {
   var postOfComment = await Post.findById(req.params.id).exec();

   var result = postOfComment.comments;
   var retval = result.find(function(element){
     //res.send(element.id)
     return element.id == req.params.comment_id
   });
   res.send(retval)
  /* var i = 0;
   for (var key in result)
   {
     if (result.id.equals(req.params.comment_id))
     {result2 = result[i]}
     else{
     i++
     }
   }
    //res.send(req.params.comment_id)*/
  } catch (error) {
    res.status(404).send(error);
  }
})

router.put('/:id/comments/:comment_id', async function (req, res, next) { 
  try {
    var postOfComment = await Post.findById(req.params.id).exec();
    var result = postOfComment.comments;
    var retval = result.find(function(element){
      return element.id == req.params.comment_id
    });
    retval.set(req.body);
    //var savedResult = await retval.save(); //doesn't work because it's an array
    var savedResult = await postOfComment.save();
    res.send(savedResult);
  } catch (error) {
    res.status(500).send(error);
  }
})

router.delete('/:id/comments/:comment_id', async function (req, res, next) {    
    try {

      //var result = await Post.comments.deleteOne({
        //_id: req.params.id
      //}).exec();

      var postOfComment = await Post.findById(req.params.id).exec();
      var result = postOfComment.comments;
      //var i = result.indexOf(req.params.comment_id);
      //var i = result.id.indexOf(req.params.comment_id);

      var retval = result.indexOf(function(element){
        return element.id == req.params.comment_id
      })
      result.splice(retval, 1);
      var savedResult = postOfComment.save();
      res.send(savedResult)
      //res.send(result)
      //var retval = result.find(function(element){
       // return element.id == req.params.comment_id
      //});
      //var pos = result.map(function(e) { return comment_id; }).indexOf(req.params.id.comment_id);
      //retval.set()
     //var savedResult = await postOfComment.save();
      //res.send(i)

      //res.send('Deleted ' + req.params.id)
    } catch (error) {
      res.status(404).send(error);
    }
    
})

/*router.get('/?search:search_Query'), async function (req, res, next) { //not needed
  res.send("hi")
  //req.query.searhQuery
}*/
//router.get('/:id/comments/search=:searchQuery')
module.exports = router;
