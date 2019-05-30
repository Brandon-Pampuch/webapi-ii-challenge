const db = require('../data/db'); // <<<<< updated path

const router = require('express').Router();

// middleware router.use(mw)
// for url beginning with /api/posts

// GET/POST/DELETE/PUT for posts

router.get('/', async (req, res) => {
  try {
    const posts = await db.find(req);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

router.get('/:id', async (req, res) => {
    try {
      const post = await db.findById(req.params.id);
  
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Post',
      });
    }
  });

  router.post('/', async (req, res) => {
    try {
      const post = await db.insert(req.body);
      res.status(201).json(post);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const count = await db.remove(req.params.id);
      if (count > 0) {
        res.status(200).json({ message: 'the post has be destroyed' });
      } else {
        res.status(404).json({ message: 'The post is lost' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Cannot remove post',
      });
    }
  });

  router.put('/:id', async (req, res) => {
    try {
      const post = await db.update(req.params.id, req.body);
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'The post could not be found' });
      }
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error updating the post',
      });
    }
  });
  

//COMMENTS GET/POST

  router.get('/:id/comments', async (req, res) => {
    try {
      const comments = await db.findPostComments(req.params.id);
      res.status(200).json(comments);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the comments',
      });
    }
  });

  router.post('/:id/comments', async (req, res) => {
    try {
      const post = await db.insertComment(req.body);
      res.status(201).json(post);
    } catch (error) {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the post',
      });
    }
  });


module.exports = router;