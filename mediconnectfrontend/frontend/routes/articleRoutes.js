import express from 'express';
import Article from '../models/Article.js';

const router = express.Router();

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Post a new article
router.post('/', async (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const newArticle = new Article({
    title,
    content,
    author,
    date: new Date().toLocaleDateString(),
  });

  try {
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: 'Failed to save article' });
  }
});

// Like an article
router.put('/:id/like', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, { $inc: { likes: 1 } }, { new: true });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: 'Failed to like article' });
  }
});

// Dislike an article
router.put('/:id/dislike', async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, { $inc: { dislikes: 1 } }, { new: true });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: 'Failed to dislike article' });
  }
});

// Get top 3 articles
router.get('/top', async (req, res) => {
  try {
    const topArticles = await Article.find({ likes: { $gt: 0 } }).sort({ likes: -1 }).limit(3);
    res.json(topArticles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch top articles' });
  }
});

export default router;
