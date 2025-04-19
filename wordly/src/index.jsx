import React from 'react';
import ReactDOM from 'react-dom/client';  // This is for React 18+ (ReactDOM.createRoot)
import './style.css';  // Optional: if you want to add styles

// Your root App component
const App = () => {
  return <div>Hello, Wordly!</div>;
};

// This is where we tell React to render the App component into the #app div in index.html
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);
