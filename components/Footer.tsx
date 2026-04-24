
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 py-10 border-t-2 border-gray-200">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-400 font-mono">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}
        </div>
        <div className="flex gap-8 text-sm font-bold">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2">
            <i className="fab fa-github"></i> GitHub
          </a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2">
            <i className="fab fa-linkedin"></i> LinkedIn
          </a>
          <a href={PERSONAL_INFO.website} target="_blank" rel="noopener noreferrer"
            className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2">
            <i className="fas fa-globe"></i> Oracle AI
          </a>
          <a href={`mailto:${PERSONAL_INFO.email}`}
            className="text-gray-500 hover:text-green-600 transition-colors flex items-center gap-2">
            <i className="fas fa-envelope"></i> Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
