import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../provider/ThemeProvider";

const MotivationQuote = () => {
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);
  const {theme} = useContext(ThemeContext);

  useEffect(() => {
  fetch("https://task-management-server-nine-lake.vercel.app/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      const random = data[Math.floor(Math.random() * 20)];
      setQuote(random);
    })
    .catch((err) => {
      console.error("Error:", err);
      setError("Failed to load quote.");
    });
}, []);


  return (
    <div className={`border-l-4 p-4 my-4 rounded 
    ${theme === "dark" ? "bg-transparent border-x-purple-300 text-purple-300" : "border-x-purple-700 text-purple-700"}`}>
      {error ? (
        <p>{error}</p>
      ) : quote ? (
        <div>
          <p className="italic">"{quote.q}"</p>
          <p className="text-right mt-2 font-semibold">— {quote.a}</p>
        </div>
      ) : (
        <p>Loading motivational quote...</p>
      )}
    </div>
  );
};

export default MotivationQuote;
