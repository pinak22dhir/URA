import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ArticleDetail = () => {
  const { id } = useParams(); // Get the article id from the URL
  const [article, setArticle] = useState(null);

  // Fetch the article data from localStorage or your database
  useEffect(() => {
    const storedArticles = JSON.parse(localStorage.getItem("articles"));
    if (storedArticles) {
      const foundArticle = storedArticles.find(
        (article) => article.id.toString() === id
      );
      setArticle(foundArticle);
    }
  }, [id]);

  // Handle loading or not found states
  if (!article) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-gray-600">
          {!JSON.parse(localStorage.getItem("articles"))
            ? "No articles found."
            : "Loading article..."}
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-300 min-h-screen flex justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-xl p-6 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">{article.title}</h1>
        <p className="text-sm text-gray-600 mb-6">
          <span className="font-medium text-indigo-600">{article.author}</span>{" "}
          | {article.date}
        </p>
        <div className="text-gray-700 text-lg leading-relaxed space-y-4">
          <p>{article.content}</p>
        </div>
        <div className="mt-8 text-center">
          <a
            href="/articles"
            className="text-indigo-600 hover:underline text-lg font-medium"
          >
            ← Back to Articles
          </a>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
