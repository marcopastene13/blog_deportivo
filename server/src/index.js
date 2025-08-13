// server/src/index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { sequelize, User, Post, Comment } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API Blog Deportivo funcionando 🚀');
});

// Obtener todos los posts con autor y comentarios
app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Comment, include: [{ model: User, attributes: ['id', 'username'] }] }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener posts:', error);
    res.status(500).json({ message: 'Error al obtener posts' });
  }
});

// Crear un nuevo post
app.post('/api/posts', async (req, res) => {
  try {
    const { title, content, category, userId } = req.body;

    if (!title || !content || !userId) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const newPost = await Post.create({
      title,
      content,
      category,
      userId
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error al crear post:', error);
    res.status(500).json({ message: 'Error interno al crear post' });
  }
});

// Crear un nuevo comentario
app.post('/api/comments', async (req, res) => {
  try {
    const { content, userId, postId } = req.body;

    if (!content || !userId || !postId) {
      return res.status(400).json({ message: 'Faltan datos requeridos' });
    }

    const newComment = await Comment.create({
      content,
      userId,
      postId
    });

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error al crear comentario:', error);
    res.status(500).json({ message: 'Error interno al crear comentario' });
  }
});

// Sincronizar base y arrancar servidor
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tablas sincronizadas');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Error sincronizando tablas:', err);
  });
