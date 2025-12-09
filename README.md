# Job Board Application

A full-stack MERN-based Job Board web application built with Node.js, Express, MongoDB, React, and Tailwind CSS.

## 🚀 Features

- **Job Listings**: Browse through available job positions
- **Search Functionality**: Search jobs by title or company name
- **Category Filtering**: Filter jobs by category (Design, Development, Marketing, Sales, Support, Other)
- **Post Jobs**: Submit new job openings through an interactive form
- **Responsive Design**: Fully responsive UI that works on desktop, tablet, and mobile devices
- **Real-time Updates**: Job list refreshes automatically after posting a new job

## 📋 Tech Stack

### Backend
- **Node.js**: JavaScript runtime
- **Express**: Web application framework
- **MongoDB**: NoSQL database for storing job data
- **CORS**: Cross-Origin Resource Sharing enabled

### Frontend
- **React**: UI library with functional components and hooks
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library for consistent UI
- **Lucide React**: Icon library
- **Sonner**: Toast notifications
- **Axios**: HTTP client for API requests

## 📁 Project Structure

```
job-board/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── package.json        # Backend dependencies
│   └── .env               # Environment variables
├── frontend/
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Header.js
│   │   │   ├── Hero.js
│   │   │   ├── JobCard.js
│   │   │   ├── JobListings.js
│   │   │   ├── PostJobForm.js
│   │   │   ├── Footer.js
│   │   │   └── ui/        # Shadcn UI components
│   │   ├── App.js         # Main application component
│   │   ├── App.css        # Global styles
│   │   └── index.js       # Application entry point
│   ├── package.json       # Frontend dependencies
│   └── .env              # Frontend environment variables
└── README.md             # This file
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Or with yarn:
   ```bash
   yarn install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the backend directory with the following:
   ```env
   MONGO_URL=mongodb://localhost:27017
   DB_NAME=job_board_db
   ```

4. **Start MongoDB:**
   
   Make sure MongoDB is running on your system:
   ```bash
   # On macOS (with Homebrew)
   brew services start mongodb-community
   
   # On Ubuntu/Debian
   sudo systemctl start mongod
   
   # Or run directly
   mongod
   ```

5. **Start the backend server:**
   ```bash
   node server.js
   ```
   
   The backend server will start on `http://localhost:8001`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   Or with yarn:
   ```bash
   yarn install
   ```

3. **Configure environment variables:**
   
   Create a `.env` file in the frontend directory:
   ```env
   REACT_APP_BACKEND_URL=http://localhost:8001
   ```

4. **Start the frontend development server:**
   ```bash
   npm start
   ```
   
   Or with yarn:
   ```bash
   yarn start
   ```
   
   The frontend will start on `http://localhost:3000`

## 🌐 API Endpoints

### GET `/api/jobs`
Fetches all job postings from the database.

**Response:**
```json
[
  {
    "id": "string",
    "title": "string",
    "company": "string",
    "category": "string",
    "location": "string",
    "description": "string",
    "postedDate": "date"
  }
]
```

### POST `/api/jobs`
Creates a new job posting.

**Request Body:**
```json
{
  "title": "string",
  "company": "string",
  "category": "string",
  "location": "string",
  "description": "string"
}
```

**Response:**
```json
{
  "id": "string",
  "title": "string",
  "company": "string",
  "category": "string",
  "location": "string",
  "description": "string",
  "postedDate": "date"
}
```

### GET `/api`
Health check endpoint.

**Response:**
```json
{
  "message": "Job Board API is running"
}
```

## 💡 Usage

1. **Browse Jobs**: View all available job postings on the homepage
2. **Search**: Use the search bar to find specific jobs by title or company
3. **Filter**: Click on category buttons to filter jobs by type
4. **Post a Job**: Click the "Post a Job" button in the header to open the job submission form
5. **Submit**: Fill in all required fields and click "Post Job" to add a new listing

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: 1920px and above
- **Tablet**: 768px - 1024px
- **Mobile**: 375px - 767px

## 🗃️ Database Schema

### Jobs Collection

```javascript
{
  _id: ObjectId,
  title: String,
  company: String,
  category: String,      // Design, Development, Marketing, Sales, Support, Other
  location: String,
  description: String,
  postedDate: Date
}
```

## 🎨 Design Features

- Clean and professional UI
- Soft blue gradient hero section
- Hover effects on interactive elements
- Modal dialog for job posting
- Toast notifications for user feedback
- Smooth transitions and animations
- Category badges with icons
- Loading states

## 🔒 Notes

- **No Authentication**: As per requirements, this application does not include user authentication
- **In-Memory Alternative**: While MongoDB is used, the code structure allows for easy migration to in-memory storage if needed
- **Sample Data**: The application includes 10 sample job postings that are automatically inserted on first run

## 🚀 Deployment Considerations

For production deployment:

1. Update `REACT_APP_BACKEND_URL` in frontend `.env` to your production API URL
2. Set proper MongoDB connection string in backend `.env`
3. Consider adding:
   - Environment-specific configurations
   - Database indexing for better performance
   - Rate limiting for API endpoints
   - Input sanitization and validation
   - Logging middleware

## 📝 License

This project is created as a technical assessment and is free to use for educational purposes.

## 🤝 Contributing

This is an assessment project, but suggestions and improvements are welcome!

---

**Built with ❤️ as part of a MERN Stack Developer Assessment**
