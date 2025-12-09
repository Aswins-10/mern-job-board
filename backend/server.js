const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const PORT = 8001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
let db;
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'test_database';

// Sample job data
const sampleJobs = [
  {
    title: 'Senior UI/UX Designer',
    company: 'Creative Studios',
    category: 'Design',
    location: 'San Francisco, CA',
    description: 'We are looking for a talented UI/UX designer to join our creative team. Must have 5+ years of experience in designing user-centric digital products.',
    postedDate: new Date('2025-01-10')
  },
  {
    title: 'Full Stack Developer',
    company: 'Tech Innovations Inc',
    category: 'Development',
    location: 'New York, NY',
    description: 'Join our dynamic team as a Full Stack Developer. Experience with React, Node.js, and MongoDB required. Work on cutting-edge projects.',
    postedDate: new Date('2025-01-12')
  },
  {
    title: 'Marketing Manager',
    company: 'Growth Marketing Co',
    category: 'Marketing',
    location: 'Austin, TX',
    description: 'Seeking an experienced Marketing Manager to lead our marketing initiatives. Strong background in digital marketing and analytics required.',
    postedDate: new Date('2025-01-08')
  },
  {
    title: 'Frontend Developer',
    company: 'WebDev Solutions',
    category: 'Development',
    location: 'Remote',
    description: 'Looking for a skilled Frontend Developer with expertise in React and modern CSS frameworks. Remote position with flexible hours.',
    postedDate: new Date('2025-01-15')
  },
  {
    title: 'Graphic Designer',
    company: 'Design Hub',
    category: 'Design',
    location: 'Los Angeles, CA',
    description: 'Creative graphic designer needed for branding and visual identity projects. Proficiency in Adobe Creative Suite required.',
    postedDate: new Date('2025-01-11')
  },
  {
    title: 'Sales Executive',
    company: 'SalesPro Inc',
    category: 'Sales',
    location: 'Chicago, IL',
    description: 'Dynamic sales executive wanted to drive revenue growth. Experience in B2B sales and excellent communication skills essential.',
    postedDate: new Date('2025-01-09')
  },
  {
    title: 'Customer Support Specialist',
    company: 'Support Solutions',
    category: 'Support',
    location: 'Boston, MA',
    description: 'Join our customer support team to help clients resolve technical issues. Strong problem-solving skills and patience required.',
    postedDate: new Date('2025-01-13')
  },
  {
    title: 'DevOps Engineer',
    company: 'Cloud Systems',
    category: 'Development',
    location: 'Seattle, WA',
    description: 'Experienced DevOps engineer needed to manage cloud infrastructure and CI/CD pipelines. AWS and Docker experience preferred.',
    postedDate: new Date('2025-01-14')
  },
  {
    title: 'Content Marketing Specialist',
    company: 'Content Creators LLC',
    category: 'Marketing',
    location: 'Remote',
    description: 'Content marketing specialist to create engaging content and manage social media campaigns. SEO knowledge is a plus.',
    postedDate: new Date('2025-01-07')
  },
  {
    title: 'Product Designer',
    company: 'Product Labs',
    category: 'Design',
    location: 'San Diego, CA',
    description: 'Product designer to conceptualize and design innovative digital products. Experience with Figma and user research methodologies required.',
    postedDate: new Date('2025-01-06')
  }
];

// Initialize database and sample data
async function initializeDatabase() {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    console.log('Connected to MongoDB');
    
    db = client.db(dbName);
    
    // Check if jobs collection is empty
    const count = await db.collection('jobs').countDocuments();
    if (count === 0) {
      // Insert sample jobs
      await db.collection('jobs').insertMany(sampleJobs);
      console.log('Sample jobs inserted successfully');
    }
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

// Routes

// GET all jobs
app.get('/api/jobs', async (req, res) => {
  try {
    const jobs = await db.collection('jobs')
      .find({})
      .sort({ postedDate: -1 })
      .toArray();
    
    // Convert MongoDB _id to string id for frontend
    const formattedJobs = jobs.map(job => ({
      id: job._id.toString(),
      title: job.title,
      company: job.company,
      category: job.category,
      location: job.location,
      description: job.description,
      postedDate: job.postedDate
    }));
    
    res.json(formattedJobs);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
});

// POST a new job
app.post('/api/jobs', async (req, res) => {
  try {
    const { title, company, category, location, description } = req.body;
    
    // Validation
    if (!title || !company || !category || !location || !description) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newJob = {
      title,
      company,
      category,
      location,
      description,
      postedDate: new Date()
    };
    
    const result = await db.collection('jobs').insertOne(newJob);
    
    res.status(201).json({
      id: result.insertedId.toString(),
      ...newJob
    });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ error: 'Failed to create job' });
  }
});

// Health check
app.get('/api', (req, res) => {
  res.json({ message: 'Job Board API is running' });
});

// Start server
initializeDatabase().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://0.0.0.0:${PORT}`);
  });
});
