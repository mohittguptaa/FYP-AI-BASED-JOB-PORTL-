// Error404.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-gray-100">
      <h1 className="font-bold text-blue-500 text-9xl">404</h1>
      <h2 className="mt-4 text-2xl font-semibold">Oops! Page Not Found</h2>
      <p className="mt-2 text-lg text-gray-700">
        It seems the page you are looking for is not available. Let's help you get back on track.
      </p>
      <Link
        to="/"
        className="px-6 py-3 mt-6 text-white transition duration-200 ease-in-out bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Return Home
      </Link>
    </div>
  );
};

export default Error404;