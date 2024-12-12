import { useState } from "react";
import axios from "axios";
import { FaSyncAlt } from "react-icons/fa"; // Font Awesome sync icon for "generate" action

export default function MedicalChatbot() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(""); // State to manage error messages

  async function generateAnswer() {
    setLoading(true); // Set loading to true when the answer is being generated
    setError(""); // Reset error state before making the request

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

      // Check if error response contains a message
      if (error.response) {
        // Server responded with an error
        setError(`Error: ${error.response.data.error.message}`);
      } else if (error.request) {
        // Request was made but no response received
        setError("No response from server. Please check your internet connection.");
      } else {
        // Something else went wrong
        setError("Something went wrong. Please try again.");
      }

      setAnswer(""); // Clear the answer in case of an error
    } finally {
      setLoading(false); // Set loading to false after the answer is generated or on error
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center bg-cover bg-center transition-all duration-700 ease-in-out"
      style={{
        backgroundImage: "linear-gradient(to right, #6a11cb, #2575fc)", // Gradient background
      }}
    >
      {/* Header Section */}
      <header className="w-full text-center py-12 px-4 text-white transition-all duration-500 ease-in-out transform hover:scale-105">
        <h1 className="text-4xl font-extrabold hover:text-black transition-all duration-300">
          Get Medical Answers Instantly
        </h1>
        <p className="text-lg mt-4 hover:text-black transition-all duration-300">
          AI-powered responses tailored to your medical queries.
        </p>
      </header>

      {/* Input Section */}
      <section className="w-full max-w-2xl bg-white shadow-xl rounded-2xl border border-gray-200 p-8 flex flex-col items-center opacity-90 hover:opacity-100 transition-all duration-300">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Write your medical query here..."
          className="w-full px-6 py-4 text-lg bg-gray-100 rounded-full border border-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-300 mb-6 transition-all duration-300"
        />
        <button
          onClick={generateAnswer}
          disabled={loading} // Disable the button when loading is true
          className={`w-auto bg-blue-500 text-black text-sm font-semibold py-2 px-4 rounded-full flex items-center justify-center shadow-md transition-all duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "hover:bg-blue-600 hover:scale-110 hover:shadow-lg"
          }`}
        >
          {loading ? (
            "Generating..."
          ) : (
            <>
              <FaSyncAlt className="mr-2 text-lg" /> Generate Answer
            </>
          )}
        </button>
      </section>

      {/* Error Message */}
      {error && (
        <section className="w-full max-w-2xl bg-red-50 text-red-700 shadow-md rounded-2xl border border-red-200 mt-4 p-6">
          <h2 className="text-lg font-semibold">Error:</h2>
          <p>{error}</p>
        </section>
      )}

      {/* Answer Section */}
      <section className="w-full max-w-2xl bg-gray-50 shadow-md rounded-2xl border border-gray-200 mt-8 p-6 hover:scale-105 hover:shadow-2xl transition-all duration-500">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Answer:</h2>
        <p className="text-gray-800 whitespace-pre-wrap">
          {answer || "Your AI-powered answer will appear here."}
        </p>
      </section>
    </div>
  );
}
