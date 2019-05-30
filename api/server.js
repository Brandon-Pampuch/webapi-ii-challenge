const express = require('express');
const cors = require('cors');

const blogpostsrouter = require('../blogposts/blogposts-router'); 

const server = express();

server.use(express.json());
server.use(cors());

server.get('/', (req, res) => {
  res.send(`
    <h2>Web challenge II</h2>
  `);
});

server.use('/api/posts', blogpostsrouter); 

module.exports = server; 