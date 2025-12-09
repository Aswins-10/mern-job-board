const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(express.json());

// ✅ ENV VARIABLES ONLY (NO LOCALHOST FALLBACK)
const mongoUrl = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let db;

// ✅ Sample job data
const sampleJobs = [
  {
    title: "Senior UI/UX Designer",
    company: "Creative Studios",
    category: "Design",
    location: "San Francisco, CA",
    description: "We are looking for a talented UI/UX designer to join our creative team.",
    postedDate: new Date("2025-01-10"),
  },
  {
    title: "Full Stack Developer",
    company: "Tech Innovations Inc",
    category: "Development",
    location: "New York, NY",
    description: "Experience with React, Node.js, and MongoDB required.",
    postedDate: new Date("2025-01-12"),
  },
];

// ✅ CONNECT DATABASE SAFELY
async function initializeDatabase() {
  try {
    const client = new MongoClient(mongoUrl);
    await client.connect();
    console.log("✅ MongoDB Connected");

    db = client.db(dbName);

    const count = await db.collection("jobs").countDocuments();
    if (count === 0) {
      await db.collection("jobs").insertMany(sampleJobs);
      console.log("✅ Sample jobs inserted");
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
  }
}

// ✅ HEALTH CHECK
app.get("/api", (req, res) => {
  res.json({ message: "Job Board API is running" });
});

// ✅ GET JOBS (SAFE)
app.get("/api/jobs", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Database not initialized" });
    }

    const jobs = await db
      .collection("jobs")
      .find({})
      .sort({ postedDate: -1 })
      .toArray();

    const formattedJobs = jobs.map((job) => ({
      id: job._id.toString(),
      title: job.title,
      company: job.company,
      category: job.category,
      location: job.location,
      description: job.description,
      postedDate: job.postedDate,
    }));

    res.json(formattedJobs);
  } catch (error) {
    console.error("❌ Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// ✅ POST JOB (SAFE)
app.post("/api/jobs", async (req, res) => {
  try {
    if (!db) {
      return res.status(500).json({ error: "Database not initialized" });
    }

    const { title, company, category, location, description } = req.body;

    if (!title || !company || !category || !location || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newJob = {
      title,
      company,
      category,
      location,
      description,
      postedDate: new Date(),
    };

    const result = await db.collection("jobs").insertOne(newJob);

    res.status(201).json({
      id: result.insertedId.toString(),
      ...newJob,
    });
  } catch (error) {
    console.error("❌ Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
});

// ✅ START SERVER ONLY AFTER DB INIT
initializeDatabase().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on ${PORT}`);
  });
});

