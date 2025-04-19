import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

// Function to fetch word data from the API
const fetchWordData = async (word) => {
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!response.ok) {
      throw new Error('Word not found!');
    }
    const data = await response.json();
    return data[0]; // return first result
  } catch (error) {
    alert(error.message);
  }
};

// Main App component
const App = () => {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  // Handle search button click
  const handleSearch = async () => {
    if (!word) {
      alert('Please enter a word');
      return;
    }

    const data = await fetchWordData(word);
    if (data) {
      setDefinition(data.meanings[0].definitions[0].definition);  // Get the first definition
      setAudioUrl(data.phonetics[0]?.audio || '');  // Get the audio pronunciation
    }
  };

  // Handle audio pronunciation
  const playAudio = () => {
    if (audioUrl) {
      new Audio(audioUrl).play();
    }
  };

  return (
    <div className="container">
      <h1>Wordly</h1>
      <p>Your instant, intelligent dictionary.</p>
      <div className="search-container">
        <input
          type="text"
          placeholder="Enter a word"
          value={word}
          onChange={(e) => setWord(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="definition-container">
        {definition && (
          <div>
            <h2>Definition:</h2>
            <p>{definition}</p>
          </div>
        )}

        {audioUrl && (
          <button onClick={playAudio}>Play Pronunciation</button>
        )}
      </div>
    </div>
  );
};

// Render the App component into the root div
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
