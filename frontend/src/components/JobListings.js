import React, { useState, useEffect } from 'react';
import JobCard from './JobCard';

const categories = ['All', 'Design', 'Development', 'Marketing', 'Sales', 'Support', 'Other'];

const JobListings = ({ jobs, searchTerm }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    let filtered = jobs;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(job => job.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower)
      );
    }

    setFilteredJobs(filtered);
  }, [jobs, selectedCategory, searchTerm]);

  return (
    <section id="jobs" className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6" data-testid="job-listings-heading">Available Positions</h2>
          
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2" data-testid="category-filter">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
                data-testid={`category-${category.toLowerCase()}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Job Count */}
        <p className="text-sm text-gray-600 mb-4" data-testid="job-count">
          {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
        </p>

        {/* Jobs Grid */}
        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="jobs-grid">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12" data-testid="no-jobs-message">
            <p className="text-gray-500 text-lg">No jobs found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;