import React from 'react';
import { MapPin, Briefcase, Building2 } from 'lucide-react';

const JobCard = ({ job }) => {
  const formatDate = (date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow" data-testid="job-card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-900 mb-1" data-testid="job-title">{job.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Building2 className="h-4 w-4 mr-1" />
            <span className="text-sm" data-testid="job-company">{job.company}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800" data-testid="job-category">
          <Briefcase className="h-3 w-3 mr-1" />
          {job.category}
        </span>
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800" data-testid="job-location">
          <MapPin className="h-3 w-3 mr-1" />
          {job.location}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-3 line-clamp-2" data-testid="job-description">{job.description}</p>
      
      <div className="text-xs text-gray-500" data-testid="job-posted-date">
        Posted: {formatDate(job.postedDate)}
      </div>
    </div>
  );
};

export default JobCard;