# CAMPULSE — Your Campus, in Motion

CAMPULSE is a full-stack college event discovery and management platform that brings campus activities into one place.

Students can discover upcoming events, search and filter events, view event details, register for events, and track their registrations. Administrators can create, update, and delete events, monitor event capacity, and manage student registrations.

---

## 🌐 Live Demo

**Live Website:**  
https://campulse-in4q.onrender.com

---

# 👥 Demo Credentials

Use the following accounts to test the Student and Admin dashboards.

## 🔐 Admin Account

```text
Email: admin@campulse.com
Password: admin123
Role: Admin

## 👤 Student Account
Email: student@campus.com
Password: student123
Role: Student

Admin Dashboard
https://campulse-in4q.onrender.com/admin

The Admin Dashboard allows the administrator to:

View dashboard statistics
Add new events
Edit existing events
Delete events
Monitor event capacity
View registered students
Search registrations
Manage event information


The Student account allows users to:

Browse events
Search events
Filter events by category
View event details
Register for events
View personal registrations
Student Registration
https://campulse-in4q.onrender.com/register
My Registrations
https://campulse-in4q.onrender.com/my-registrations
📌 About CAMPULSE

CAMPULSE is designed to solve a common college problem: event information is often distributed across different groups, announcements, posters, and social media platforms.

Students may miss events because information is spread across multiple places.

CAMPULSE provides a centralized platform where students can discover campus events and register for them, while administrators can manage events and monitor registrations.

Tagline

Your campus, in motion.

✨ Key Features
🎓 Student Features
🏠 Home Page

The home page introduces CAMPULSE and provides quick access to campus events.

It includes:

CAMPULSE introduction
Upcoming events
Featured event
Navigation to events
Login and registration options
📅 Events Page

Students can view all available campus events.

Each event displays:

Event name
Category
Date
Time
Venue
Description
Available seats
Registration status
🔎 Search Events

Students can search for events by event name.

Example:

Hackathon
Workshop
Cultural Night
Coding Contest
🏷️ Category Filter

Students can filter events based on their category.

This helps students quickly find events related to their interests.

📄 Event Details

Each event has a dedicated details page containing:

Event name
Category
Date
Time
Venue
Description
Capacity
Registration information
📝 Event Registration

Students can register for an event by providing:

Name
Email
College / Year
Phone

The backend checks event availability before completing the registration.

🎟️ Capacity Tracking

CAMPULSE tracks the number of registered students against the event capacity.

Example:

25 / 60 seats filled

This means:

25 students registered
60 total seats available

When an event reaches its capacity, additional registrations are prevented.

✅ Registration Confirmation

After successfully registering for an event, the student receives a confirmation message through the application.

📋 My Registrations

Logged-in students can view their registered events from:

/my-registrations

Only registrations associated with the logged-in student's email are displayed.

🛠️ Admin Dashboard

The Admin Dashboard is designed for authorized college club administrators or event coordinators.

📊 Dashboard Statistics

The dashboard provides an overview of:

Total events
Total registrations
Upcoming events

This provides administrators with a quick overview of campus event activity.

➕ Add Event

Administrators can create new events.

The event form includes:

Event Name
Category
Date
Time
Venue
Capacity
Description

After an event is created, it becomes available on the student Events page.

✏️ Edit Event

Administrators can update existing event information.

They can modify:

Event name
Category
Date
Time
Venue
Capacity
Description
🗑️ Delete Event

Administrators can remove events from the platform.

A confirmation is required before deleting an event.

👥 View Registrations

Administrators can view students registered for events.

Registration information includes:

Student name
Email
College / Year
Phone
Registered event
🔎 Search Registrations

Administrators can search registrations using:

Student name
Student email
Event name
🔄 Application Workflow
Student Workflow
Home
  ↓
Events
  ↓
Search / Filter
  ↓
Event Details
  ↓
Login / Register
  ↓
Register for Event
  ↓
Registration Confirmation
  ↓
My Registrations
Admin Workflow
Login
  ↓
Admin Dashboard
  ↓
View Statistics
  ↓
Manage Events
  ├── Add Event
  ├── Edit Event
  └── Delete Event
  ↓
View Registrations
  ↓
Search Registrations
🔐 Role-Based Access

CAMPULSE provides different functionality based on the user's role.

Student
Login
 ↓
Student Experience
 ↓
Events
 ↓
Registration
 ↓
My Registrations

Students have access to event discovery and registration features.

Admin
Login
 ↓
Admin Dashboard
 ↓
Event Management
 ↓
Registration Management
 ↓
Dashboard Statistics

Administrators have access to event and registration management features.

🧩 Technology Stack
Frontend
React
Vite
JavaScript
JSX
CSS
Fetch API
Backend
Node.js
Express.js
CORS
File System (fs)
Data Storage

The current version uses JSON files for application data.

Backend/data/
├── events.json
├── registrations.json
└── users.json
📁 Project Structure
CAMPULSE/
│
├── Frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Events.jsx
│   │   │   ├── EventDetails.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── MyRegistrations.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── Backend/
│   ├── data/
│   │   ├── events.json
│   │   ├── registrations.json
│   │   └── users.json
│   │
│   ├── server.js
│   └── package.json
│
└── README.md
🔌 API Endpoints
Events
Get all events
GET /api/events
Add event
POST /api/events
Update event
PUT /api/events/:id
Delete event
DELETE /api/events/:id
Registrations
Get registrations
GET /api/registrations
Create registration
POST /api/registrations
Authentication
Register student
POST /api/register
Login
POST /api/login
API Health Check
GET /api

Expected response:

{
  "message": "CAMPULSE API is running"
}
🚀 Running the Project Locally
1. Clone the Repository
git clone YOUR_GITHUB_REPOSITORY_URL

Then:

cd CAMPULSE
2. Backend Setup

Navigate to the backend:

cd Backend

Install dependencies:

npm install

Start the server:

node server.js

The backend runs on:

http://localhost:5000
3. Frontend Setup

Open another terminal.

Navigate to the frontend:

cd Frontend

Install dependencies:

npm install

Start the development server:

npm run dev

The frontend normally runs on:

http://localhost:5173
🏗️ Production Build

To create the production frontend build:

cd Frontend
npm run build

The production files are generated inside:

Frontend/dist/

The Express backend serves this production build when the application is deployed.

☁️ Deployment

CAMPULSE is deployed using Render.

The deployment architecture is:

GitHub Repository
       ↓
     Render
       ↓
Node.js + Express
       ↓
React Production Build
       ↓
Single Public URL
Production URL
https://campulse-in4q.onrender.com

The frontend communicates with the backend using relative API routes:

/api/events
/api/login
/api/register
/api/registrations

This allows the frontend and backend to work together through the same deployed domain.

🧪 Testing the Application
Student Testing
Open the CAMPULSE website.
Login using:
Email: student@campus.com
Password: student123
Open the Events page.
Search for an event.
Apply a category filter.
Open an event.
Register for the event.
Open My Registrations.
Verify that the registration appears.
Admin Testing
Open the CAMPULSE website.
Login using:
Email: admin@campulse.com
Password: admin123
Open the Admin Dashboard.
Check dashboard statistics.
Add a new event.
Verify that the event appears on the Events page.
Edit the event.
Delete the event.
Check the registrations section.
Search for a registered student.
💡 Example Use Case

Suppose a college club organizes:

Web Development Workshop

The administrator creates the event:

Name: Web Development Workshop
Category: Workshop
Date: 15 October 2026
Time: 10:00 AM
Venue: Seminar Hall
Capacity: 100

The event then becomes available to students.

A student can:

Discover Event
      ↓
View Details
      ↓
Register
      ↓
Receive Confirmation
      ↓
View Registration

The administrator can monitor registrations through the Admin Dashboard.

🎯 Problem Solved

College event information is often distributed through:

Messaging groups
Posters
Social media
Class announcements
Separate club pages

This can make it difficult for students to discover and track campus events.

CAMPULSE brings the major parts of the process into one platform:

Event Discovery
       +
Event Information
       +
Search & Filtering
       +
Registration
       +
Capacity Tracking
       +
Admin Management
📊 Feature Summary
Feature	Student	Admin
Home Page	✓	✓
View Events	✓	✓
Search Events	✓	—
Filter Events	✓	—
Event Details	✓	✓
Event Registration	✓	—
Capacity Information	✓	✓
My Registrations	✓	—
Add Event	—	✓
Edit Event	—	✓
Delete Event	—	✓
View Registrations	—	✓
Search Registrations	—	✓
Dashboard Statistics	—	✓
🌱 Future Improvements

Possible future improvements include:

MongoDB or PostgreSQL database
Secure password hashing
JWT/session-based authentication
Email registration confirmation
QR-code based event check-in
Event reminders
Club-specific admin accounts
Persistent cloud storage
Attendance reports
Event analytics
Event image uploads
Calendar integration
⚠️ Current Limitations

CAMPULSE is currently developed as an academic/recruitment project.

The current version uses JSON files for storing application data.

For a production-level application, the system can be upgraded with:

A production database
Secure password hashing
Proper authentication and authorization
Persistent cloud storage
Multiple administrator accounts
Email services
👩‍💻 Author

Ritu Rai

Project

CAMPULSE

Tagline

Your campus, in motion.

📄 Project Summary

CAMPULSE is a full-stack college event discovery and management platform that connects students with campus activities while providing administrators with tools to manage events, capacity, and registrations.

The project demonstrates:

React frontend development
Node.js and Express backend
REST API development
CRUD operations
Role-based functionality
Event registration
Capacity management
Search and filtering
JSON-based data storage
Full-stack deployment
🔗 Important Links
Live Website

https://campulse-in4q.onrender.com

Admin Dashboard

https://campulse-in4q.onrender.com/admin

Student Registration

https://campulse-in4q.onrender.com/register

Student My Registrations

https://campulse-in4q.onrender.com/my-registrations

🔑 Demo Login Summary
Role	Email	Password
Admin	admin@campulse.com	admin123
Student	student@campus.com	student123