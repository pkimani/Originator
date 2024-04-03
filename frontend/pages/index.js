// frontend/pages/index.js
import React, { useEffect, useState } from 'react';
import 'tailwindcss/tailwind.css'; // Ensure this is imported to apply Tailwind styles

export default function Home() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api')
      .then(response => response.text())
      .then(data => setMessage(data));
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-blue-500">
      <p className="text-3xl text-white">{message}</p>
    </div>
  );
}
