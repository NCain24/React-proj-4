const { sequelize } = require('./util/database');
const { Post } = require('./models/post');
const { User } = require('./models/user');

const express = require('express');
const cors = require('cors');

require('dotenv').config();
const { SERVER_PORT } = process.env;

const app = express();

app.use(express.json());
app.use(cors());

User.hasMany(Post);
Post.belongsTo(User);

const {
  getAllPosts,
  getCurrentUserPosts,
  addPost,
  editPost,
  deletePost,
} = require('./controllers/posts');
const { register, login } = require('./controllers/auth');
const { isAuthenticated } = require('./middleware/isAuthenticated');

app.post('/register', register);
app.post('/login', login);

app.get('/posts', getAllPosts);

app.get('/userposts/:userId', getCurrentUserPosts);
app.post('/posts', isAuthenticated, addPost);
app.put('/posts/:id', isAuthenticated, editPost);
app.delete('/posts/:id', isAuthenticated, deletePost);

sequelize
  .sync()
  .then(() => {
    app.listen(SERVER_PORT, () => console.log(`Running on ${SERVER_PORT}`));
  })
  .catch((err) => console.log(err));
