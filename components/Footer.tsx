
import React from 'react';
import { PERSONAL_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="mt-32 py-12 border-t border-gray-900">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-sm text-gray-500">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React & Tailwind.
        </div>
        <div className="flex gap-8 text-sm text-gray-400">
          <a href={PERSONAL_INFO.github} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">GitHub</a>
          <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-green-500 transition-colors">LinkedIn</a>
          <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-green-500 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
