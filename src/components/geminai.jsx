import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [loading, setLoading] = useState(false);
  const [apiData, setApiData] = useState("");
  const [birthDate, setBirthDate] = useState("2000-02-02");
  const [birthTime, setBirthTime] = useState("04:00");
  const [birthCountry, setBirthCountry] = useState("Sri Lanka");
  const [birthDistrict, setBirthDistrict] = useState("Colombo");
  const [birthCity, setBirthCity] = useState("Colombo");
  const [futureQuery, setFutureQuery] = useState("");

  const genAI = new GoogleGenerativeAI("AIzaSyAEAXfiMgoOaURGF6WSbtHJiCmk0rQ8IAI");

  const fetchData = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `
      Could you please provide a detailed horoscope based on my birth information? 
      I was born on ${birthDate}, at ${birthTime} in ${birthCity}, ${birthDistrict}, ${birthCountry}. 
      I'm keen on gaining insights into my personality traits, strengths, weaknesses, career prospects, 
      relationships, and any significant life events or trends that may be indicated in my astrological chart.
      
      Additionally, I would like to know about: ${futureQuery}
      
      
      Thank you for your assistance.
    `;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = await response.text();
  
    // Format the text with bold and italic based on presence of stars
    const formattedText = text.split("**").map((part, index) => {
      return index % 2 === 0 ? part : <span key={index} className="italic font-bold">{part}</span>;
    });
  
    setApiData(formattedText);
    setLoading(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  };

  return (
    <div className="min-h-screen text-white bg-gradient-to-r from-purple-900 to-blue-900">
      <div className="container p-4 mx-auto">
        <h1 className="mb-4 text-4xl font-bold text-center">AI Horoscope Generator</h1>
        <div className="my-5">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-200">
                  Birth Date
                </label>
                <input
                  type="date"
                  className="block w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="birthTime" className="block text-sm font-medium text-gray-200">
                  Birth Time
                </label>
                <input
                  type="time"
                  className="block w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="birthTime"
                  value={birthTime}
                  onChange={(e) => setBirthTime(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="birthCountry" className="block text-sm font-medium text-gray-200">
                  Birth Country
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="birthCountry"
                  value={birthCountry}
                  onChange={(e) => setBirthCountry(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="birthDistrict" className="block text-sm font-medium text-gray-200">
                  Birth District
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="birthDistrict"
                  value={birthDistrict}
                  onChange={(e) => setBirthDistrict(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="birthCity" className="block text-sm font-medium text-gray-200">
                  Birth City
                </label>
                <input
                  type="text"
                  className="block w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="birthCity"
                  value={birthCity}
                  onChange={(e) => setBirthCity(e.target.value)}
                />
              </div>
              <div className="md:col-span-3">
                <label htmlFor="futureQuery" className="block text-sm font-medium text-gray-200">
                  What do you want to know about your future?
                </label>
                <textarea
                  id="futureQuery"
                  name="futureQuery"
                  rows="3"
                  className="block w-full px-3 py-2 mt-1 text-white bg-gray-800 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={futureQuery}
                  onChange={(e) => setFutureQuery(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="mt-6">
          {!loading && <p className="text-left whitespace-pre-wrap">{apiData}</p>}
          {loading && <p className="text-center">Loading...</p>}
        </div>
        <div className="mt-4 text-center text-gray-400">
          Developed By Rukshan Tharindu
        </div>
      </div>
    </div>
  );
}

export default App;

