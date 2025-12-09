import React, { useState, useEffect } from 'react';
import '@/App.css';
import Header from './components/Header';
import Hero from './components/Hero';
import JobListings from './components/JobListings';
import PostJobForm from './components/PostJobForm';
import Footer from './components/Footer';
import { Toaster } from './components/ui/sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

function App() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isPostJobOpen, setIsPostJobOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from backend
  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API}/jobs`);
      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleJobPosted = (newJob) => {
    setJobs(prevJobs => [newJob, ...prevJobs]);
  };

  return (
    <div className="App min-h-screen flex flex-col">
      <Header onPostJobClick={() => setIsPostJobOpen(true)} />
      <Hero searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <main className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <JobListings jobs={jobs} searchTerm={searchTerm} />
        )}
      </main>
      <Footer />
      <PostJobForm
        isOpen={isPostJobOpen}
        onClose={() => setIsPostJobOpen(false)}
        onJobPosted={handleJobPosted}
      />
      <Toaster />
    </div>
  );
}

export default App;
