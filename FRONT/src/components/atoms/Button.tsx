
import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

const Button: React.FC<ButtonProps> = ({ text, onClick, type = 'button' }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
  >
    {text}
  </button>
  
);

export default Button;