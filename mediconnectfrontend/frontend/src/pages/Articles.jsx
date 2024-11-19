import React, { useState } from 'react';
import articleImage from '../assets/article_image.png'; // Import your static image here

const Articles = () => {
  // State to store article details
  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // Function to handle posting an article
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

  // Function to handle likes and dislikes
  const handleLike = (id) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, likes: article.likes + 1 } : article
    ));
  };

  const handleDislike = (id) => {
    setArticles(articles.map(article => 
      article.id === id ? { ...article, dislikes: article.dislikes + 1 } : article
    ));
  };

  // Get top articles based on the number of likes
  const topArticles = articles
    .filter(article => article.likes > 0) // Only show articles with likes
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3); // Limit to top 3 articles

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Page Title */}
      <h2 className="text-3xl font-bold text-center text-gray-600 mb-8">Health Articles</h2>

      {/* Form and Image Container */}
      <div className="flex flex-col md:flex-row items-center bg-gray-100 p-6 rounded-lg mb-12 shadow-lg gap-8">
        {/* Image Section */}
        <div className="w-full md:w-1/2">
          <img src={articleImage} alt="Health Articles" className="rounded-lg object-cover w-full h-56 md:h-full" />
        </div>

        {/* Article Form */}
        <div className="w-full md:w-1/2">
          <h3 className="text-2xl font-semibold text-gray-600 mb-6">Write an Article</h3>

          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article Title" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />

          <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Article Content" rows="5" className="w-full p-3 mb-4 border border-gray-300 rounded-lg"></textarea>

          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author Name" className="w-full p-3 mb-4 border border-gray-300 rounded-lg" />

          <button onClick={handlePostArticle} className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary transition w-full">Post Article</button>
        </div>
      </div>


      {/* Articles List */}
      <div className="space-y-8 mb-16">
        {articles.length === 0 ? (
          <p className="text-center text-gray-500">No articles posted yet.</p>
        ) : (
          articles.map((article) => (
            <div key={article.id} className="p-6 border border-gray-200 rounded-lg shadow-lg">
              <h4 className="text-xl font-bold text-gray-800 mb-2">{article.title}</h4>
              <p className="text-gray-600 mb-4">{article.content}</p>
              <p className="text-sm text-gray-500 mb-4">
                Posted by <span className="font-medium">{article.author}</span> on {article.date}
              </p>
              <div className=" cursor-pointer flex items-center gap-4">
                <buttonc onClick={() => handleLike(article.id)} className="flex items-center text-green-500 hover:text-green-700 transition">
                  👍 {article.likes}
                </buttonc>
                <button onClick={() => handleDislike(article.id)} className="flex items-center text-red-500 hover:text-red-700 transition">
                  👎 {article.dislikes}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Top Articles Section */}
      {topArticles.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Top Articles</h3>
          <div className="space-y-6">
            {topArticles.map((article) => (
              <div key={article.id} className="p-4 border border-gray-200 rounded-lg shadow-lg">
                <h4 className="text-lg font-bold text-gray-800">{article.title}</h4>
                <p className="text-gray-600 mb-2">{article.content}</p>
                <p className="text-sm text-gray-500">
                  Posted by <span className="font-medium">{article.author}</span> on {article.date}
                </p>
                <p className="text-sm text-gray-500">👍 {article.likes} Likes</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Articles;



