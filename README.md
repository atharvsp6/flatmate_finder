# Flatmate Finder - MERN Stack Application

A full-stack web application for finding flatmates and room rentals, built with the MERN stack (MongoDB, Express.js, React, Node.js) and featuring Passport.js authentication.

## 🚀 Features

### Frontend (React + Vite)
- **Modern UI**: Built with React, Vite, Tailwind CSS, and Radix UI components
- **Responsive Design**: Mobile-first approach with clean, modern interface
- **Client-side Routing**: React Router with protected routes
- **Authentication Context**: JWT-based authentication with React Context
- **Real-time Search**: Filter listings and roommate requests
- **Interactive Forms**: Booking forms, profile management, roommate requests

### Backend (Node.js + Express)
- **RESTful API**: Well-structured API endpoints with proper HTTP status codes
- **Authentication**: Passport.js with JWT and Local strategies
- **Security**: Helmet, CORS, rate limiting, input validation
- **Database**: MongoDB with Mongoose ODM
- **Validation**: Express-validator for input sanitization
- **Error Handling**: Comprehensive error handling middleware

### Key Functionalities
- **User Management**: Registration, login, profile updates
- **Listings**: CRUD operations for property listings
- **Bookings**: Schedule viewings with landlords
- **Roommate Requests**: Post and search for roommate preferences
- **Role-based Access**: User and admin roles
- **Search & Filters**: Advanced filtering for listings and roommates

## Live deployment link:
frontend : https://stayshare-flatmatefinder.netlify.app/
backend  : https://flatmate-finder-0bu1.onrender.com 
## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- Git

### 1. Clone and Install

```bash
# Clone the repository
git clone <repository-url>
cd flatmate_finder

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 2. Environment Configuration

```bash
# Copy the example environment file
cp backend/.env.example backend/.env
# Edit backend/.env with your configuration
```

Required environment variables:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/flatmate_finder
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### 3. Database Setup

**Option A: Local MongoDB**
```bash
sudo systemctl start mongod
```

**Option B: MongoDB Atlas**
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster and get the connection string
3. Update `MONGODB_URI` in your `.env` file

### 4. Seed the Database

```bash
cd backend
npm run seed
```

Sample login credentials:
- **User**: john@example.com / password123
- **Landlord**: jane@example.com / password123  
- **Admin**: admin@example.com / admin123

### 5. Run the Application

**Terminal 1 - Backend Server:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
```

**Terminal 2 - Frontend Development Server:**
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile

### Listings
- `GET /api/listings` - Get all listings (with filters)
- `GET /api/listings/:id` - Get specific listing
- `POST /api/listings` - Create new listing (auth required)
- `PUT /api/listings/:id` - Update listing (auth required)
- `DELETE /api/listings/:id` - Delete listing (auth required)

### Bookings
- `GET /api/bookings` - Get user's bookings (auth required)
- `POST /api/bookings` - Create new booking (auth required)
- `PUT /api/bookings/:id/status` - Update booking status (auth required)

### Roommate Requests
- `GET /api/roommates` - Get all roommate requests (with filters)
- `POST /api/roommates` - Create roommate request (auth required)
- `PUT /api/roommates/:id` - Update roommate request (auth required)

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs with salt
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configured for frontend domain
- **Input Validation**: Express-validator for all inputs
- **Role-based Access Control**: User and admin roles

## 🚀 Production Deployment

### Backend Deployment
1. Set production environment variables
2. Use MongoDB Atlas for database
3. Configure CORS for production frontend URL

### Frontend Deployment
1. Build the frontend: `npm run build`
2. Update API base URL to point to production backend
3. Deploy the `dist/` folder

## 📁 Project Structure

```
flatmate_finder/
├── backend/                 # Node.js/Express backend
│   ├── config/             # Passport.js configuration
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Auth and validation middleware
│   ├── models/            # Mongoose models
│   ├── routes/            # Express routes
│   ├── utils/             # Utilities and seed script
│   └── server.js          # Main server file
├── src/                   # React frontend
│   ├── components/        # React components
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── package.json
└── README.md
```

Original design available at https://www.figma.com/design/1cOyMvAqeGbDOBtBVFEE8a/Flatmate-Finder-App.