import React from 'react';
import { Search } from 'lucide-react';

const Hero = ({ searchTerm, onSearchChange }) => {
  return (
    <section className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4" data-testid="hero-heading">
          Find Your Dream Job.
        </h1>
        <p className="text-lg text-gray-600 mb-8" data-testid="hero-subheading">
          Browse thousands of job opportunities from top companies
        </p>
        <div className="max-w-2xl mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by job title or company..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            data-testid="search-input"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;