import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import articleImage from '../assets/article_image.png'; // Import your static image here

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // Default articles to populate initially if nothing is in localStorage
  const defaultArticles = [
    {
      id: Date.now() - 1,
      title: 'The Importance of a Balanced Diet',
      content: 'A balanced diet is essential for maintaining good health and well-being. It provides the body with the necessary nutrients it needs to function correctly.',
      author: 'Jane Doe',
      date: '2024-11-25',
      likes: 10,
      dislikes: 2,
    },
    {
      id: Date.now() - 2,
      title: 'The Benefits of Regular Exercise',
      content: 'Regular exercise has numerous benefits, including improving heart health, boosting energy levels, and reducing stress. It’s crucial for maintaining a healthy lifestyle.',
      author: 'John Smith',
      date: '2024-11-24',
      likes: 15,
      dislikes: 1,
    },
    {
      id: Date.now() - 3,
      title: 'Mental Health and Well-being',
      content: 'Mental health is just as important as physical health. Taking care of your mental well-being through self-care, therapy, or meditation is essential.',
      author: 'Sarah Lee',
      date: '2024-11-23',
      likes: 8,
      dislikes: 0,
    },
  ];

  // Load articles from localStorage or use defaultArticles
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem('articles'));
    if (storedArticles) {
      setArticles(storedArticles);
    } else {
      setArticles(defaultArticles); // Set default articles if none exist in localStorage
      localStorage.setItem('articles', JSON.stringify(defaultArticles)); // Store them in localStorage
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('articles', JSON.stringify(articles));
  }, [articles]);

  const handlePostArticle = () => {
    if (title && content && author) {
      const newArticle = {
        id: Date.now(),
        title,
        content,
        author,
        date: new Date().toLocaleDateString(),
        likes: 0,
        dislikes: 0,
      };

      setArticles([newArticle, ...articles]);
      setTitle('');
      setContent('');
      setAuthor('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleLike = (id) => {
    setArticles(articles.map((article) =>
      article.id === id ? { ...article, likes: article.likes + 1 } : article
    ));
  };

  const handleDislike = (id) => {
    setArticles(articles.map((article) =>
      article.id === id ? { ...article, dislikes: article.dislikes + 1 } : article
    ));
  };

  const handleDelete = (id) => {
    const updatedArticles = articles.filter(article => article.id !== id);
    setArticles(updatedArticles);
  };

  const topArticles = articles
    .filter(article => article.likes > 0)
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-600 mb-8">Health Articles</h2>

      <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg mb-12 shadow-lg gap-8">
        <div className="w-full md:w-1/2">
          <img src={articleImage} alt="Health Articles" className="rounded-lg object-cover w-full h-56 md:h-full" />
        </div>

        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-semibold text-gray-600 mb-6">Write an Article</h3>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Article Title"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Article Content"
            rows="5"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          ></textarea>

          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Author Name"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          />

          <button
            onClick={handlePostArticle}
            className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary transition w-full"
          >
            Post Article
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles posted yet.</p>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="p-6 border border-gray-200 rounded-lg shadow-lg">
              {/* Wrap the title and content with Link */}
              <Link to={`/article/${article.id}`} className="block mb-4">
                <h4 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h4>
                <p className="text-gray-600 mb-4">{article.content}</p>
                <p className="text-sm text-gray-500 mb-4">
                  Posted by <span className="font-medium">{article.author}</span> on {article.date}
                </p>
              </Link>

              {/* Like/Dislike buttons (without Link wrapping them) */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(article.id)}
                  className="flex items-center text-green-500 hover:text-green-700 transition"
                >
                  👍 {article.likes}
                </button>
                <button
                  onClick={() => handleDislike(article.id)}
                  className="flex items-center text-red-500 hover:text-red-700 transition"
                >
                  👎 {article.dislikes}
                </button>
                <button
                  onClick={() => handleDelete(article.id)}
                  className="flex items-center text-gray-500 hover:text-gray-700 transition"
                >
                  🗑 Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {topArticles.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Top Articles</h3>
          <div className="space-y-6">
            {topArticles.map((article) => (
              <div key={article.id} className="p-4 border border-gray-200 rounded-lg shadow-lg">
                <Link to={`/article/${article.id}`}>
                  <h4 className="text-lg font-bold text-gray-800">{article.title}</h4>
                  <p className="text-gray-600 mb-2">{article.content}</p>
                  <p className="text-sm text-gray-500">
                    Posted by <span className="font-medium">{article.author}</span> on {article.date}
                  </p>
                  <p className="text-sm text-gray-500">👍 {article.likes} Likes</p>
                </Link>
                <div className="flex items-center gap-4 mt-4">
                  <button
                    onClick={() => handleLike(article.id)}
                    className="flex items-center text-green-500 hover:text-green-700 transition"
                  >
                    👍 {article.likes}
                  </button>
                  <button
                    onClick={() => handleDislike(article.id)}
                    className="flex items-center text-red-500 hover:text-red-700 transition"
                  >
                    👎 {article.dislikes}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;