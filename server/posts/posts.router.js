const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const { default: axios } = require('axios');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const posts = await fetchPosts();

    const postsWithImages = await Promise.all(posts.map(async (post) => {
      try {
        const { data: images } = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);

        return {
          ...post,
          images: images.map(image => ({
            url: image.url,
          })),
        };
      } catch (imageError) {
        console.error(`Error fetching images for post ${post.id}:`, imageError);
        return {
          ...post,
          images: [],
        };
      }
    }));

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
