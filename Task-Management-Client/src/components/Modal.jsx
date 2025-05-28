import React, { useState, useEffect } from "react";

const Modal = ({ showModal, onClose }) => {
  const [visible, setVisible] = useState(showModal);

  useEffect(() => {
    if (showModal) {
      setVisible(true);
    } else {
      // animation শেষ হওয়ার জন্য 300ms delay দিয়ে hide করবেন
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [showModal]);

  if (!visible) return null;

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50
        transition-opacity duration-300
        ${showModal ? "opacity-100" : "opacity-0"}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-gray-800 rounded-lg p-6 max-w-lg mx-4 shadow-lg relative
          transform transition-all duration-3000
          ${showModal ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white font-bold text-xl"
          aria-label="Close Modal"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-purple-600">About Flowra</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Flowra is a powerful task management system designed to help you efficiently plan, track, and accomplish your daily and monthly goals. It empowers you to stay organized and boost your productivity with ease.
        </p>
        <p className="mt-3 text-gray-600 dark:text-gray-400 italic">
          The name "Flowra" reflects the idea of flowing through tasks naturally — just like a flower blooming with purpose.
        </p>
      </div>
    </div>
  );
};

export default Modal;
