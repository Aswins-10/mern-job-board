import React from 'react';
import { Button } from './ui/button';

const Header = ({ onPostJobClick }) => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl" data-testid="logo">
                JB
              </div>
            </div>
            <div className="hidden md:block ml-10">
              <nav className="flex space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium" data-testid="nav-home">Home</a>
                <a href="#jobs" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium" data-testid="nav-jobs">Jobs</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium" data-testid="nav-contact">Contact</a>
              </nav>
            </div>
          </div>
          <div>
            <Button onClick={onPostJobClick} data-testid="post-job-button">
              Post a Job
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;