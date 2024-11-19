import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

// Enhanced dataset of symptoms and diseases
const diseases = [
  {
    name: "Common Cold",
    symptoms: ["runny nose", "sore throat", "cough", "congestion", "slight body ache", "sneezing", "low-grade fever"],
    description: "A viral infection of the upper respiratory tract. Rest, hydration, and over-the-counter medications can help alleviate symptoms."
  },
  {
    name: "Influenza (Flu)",
    symptoms: ["high fever", "body aches", "fatigue", "headache", "dry cough", "sore throat", "runny nose"],
    description: "A contagious respiratory illness caused by influenza viruses. Antiviral medications may be prescribed in severe cases."
  },
  {
    name: "Migraine",
    symptoms: ["severe headache", "nausea", "sensitivity to light", "sensitivity to sound", "visual disturbances"],
    description: "A neurological condition characterized by intense, debilitating headaches. Medications and lifestyle changes can help manage symptoms."
  },
  {
    name: "Food Poisoning",
    symptoms: ["nausea", "vomiting", "diarrhea", "abdominal pain", "fever", "weakness"],
    description: "Illness caused by eating contaminated food. Usually resolves on its own, but severe cases may require medical attention."
  },
  {
    name: "Allergic Reaction",
    symptoms: ["sneezing", "itchy eyes", "runny nose", "skin rash", "shortness of breath"],
    description: "An overreaction of the immune system to a substance. Antihistamines can help with mild symptoms, but severe reactions require immediate medical attention."
  }
];

// Function to find matching diseases based on symptoms
const findDiseases = (symptoms) => {
  const userSymptoms = symptoms.toLowerCase().split(',').map(s => s.trim());
  return diseases.filter(disease =>
    userSymptoms.some(userSymptom => 
      disease.symptoms.some(diseaseSymptom => diseaseSymptom.toLowerCase().includes(userSymptom))
    )
  );
}

export default function MedicalChatbot() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm a medical chatbot. Please describe your symptoms (separated by commas), and I'll try to identify potential conditions.", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = { text: input, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    const matchedDiseases = findDiseases(input);
    let botResponse;

    if (matchedDiseases.length > 0) {
      botResponse = "Based on the symptoms you've described, you may be experiencing:\n\n" +
        matchedDiseases.map(disease => 
          `${disease.name}: ${disease.description}`
        ).join('\n\n');
    } else {
      botResponse = "I couldn't identify any specific conditions based on the symptoms you've described. It's best to consult with a healthcare professional for an accurate diagnosis.";
    }

    const botMessage = { text: botResponse, isUser: false };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botMessage]);
    }, 1000); // Simulate processing time

    setInput('');
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-blue-500 text-white">
        <h2 className="text-2xl font-bold">Medical Symptom Checker</h2>
      </div>
      <div className="p-4">
        <div className="mb-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
          <div className="flex">
            <div className="py-1">
              <AlertCircle className="h-6 w-6 text-yellow-500 mr-4" />
            </div>
            <div>
              <p className="font-bold">Warning</p>
              <p className="text-sm">
                This chatbot is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
              </p>
            </div>
          </div>
        </div>
        <div className="h-[400px] overflow-y-auto pr-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`mb-4 ${message.isUser ? 'text-right' : 'text-left'}`}
            >
              <div
                className={`inline-block p-2 rounded-lg ${
                  message.isUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-black'
                }`}
              >
                {message.text.split('\n').map((text, i) => (
                  <p key={i} className="mt-1 first:mt-0">{text}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter symptoms (e.g., headache, fever, cough)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border border-gray-300 rounded"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
