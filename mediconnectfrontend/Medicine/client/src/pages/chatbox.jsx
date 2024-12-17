import { useState } from "react";
import axios from "axios";
import { FaSyncAlt } from "react-icons/fa"; // Font Awesome sync icon for "generate" action
import bgImage from "./ai.gif";

export default function MedicalChatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateAnswer() {
    setLoading(true);

    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDyOg5sDRvZdZ5raRUgUoYMKVxNRTT3NEw",
        method: "post",
        data: {
          contents: [{ parts: [{ text: question }] }],
        },
      });
      setAnswer(response.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center bg-cover bg-center overflow-hidden"
      style={{
          backgroundImage: `url(${bgImage})`,// Replace with your GIF or image URL
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-purple-900/40 to-pink-900/70 z-0"></div>

      {/* Header Section */}
      <header className="relative z-10 text-center mb-12 text-white">
        <h1 className="text-5xl font-bold mb-4">Get Medical Answers Instantly</h1>
        <p className="text-xl font-light">
          AI-powered responses tailored to your medical queries.
        </p>
      </header>

      {/* Input Section */}
      <section className="relative z-10 w-full max-w-2xl bg-white/80 text-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 backdrop-blur-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Ask a Question</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Write your medical query here..."
          className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 mb-6 shadow-sm"
        />
        <button
          onClick={generateAnswer}
          disabled={loading}
          className={`w-full py-3 text-lg font-semibold text-white rounded-lg shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 hover:shadow-lg"
          }`}
        >
          {loading ? (
            "Generating..."
          ) : (
            <>
              <FaSyncAlt className="mr-2" /> Generate Answer
            </>
          )}
        </button>
      </section>

      {/* Answer Section */}
      {answer && (
        <section className="relative z-10 w-full max-w-2xl bg-white/80 text-gray-800 rounded-2xl shadow-md mt-8 p-6 border border-gray-200 backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-4">AI-Powered Answer:</h2>
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {answer}
          </p>
        </section>
      )}
    </div>
  );
}
