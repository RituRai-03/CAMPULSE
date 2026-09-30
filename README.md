# CAMPULSE 🎓

> Your campus, in motion.

CAMPULSE is a full-stack college event discovery and management platform that connects students with campus activities while providing administrators with tools to manage events, capacity, and registrations.

---

## 🚀 Live Links & Demo Accounts

* **Live Website:** [https://campulse-in4q.onrender.com](https://campulse-in4q.onrender.com)
* **Admin Dashboard:** [https://campulse-in4q.onrender.com/admin](https://campulse-in4q.onrender.com/admin)
* **Student Registration:** [https://campulse-in4q.onrender.com/register](https://campulse-in4q.onrender.com/register)
* **My Registrations:** [https://campulse-in4q.onrender.com/my-registrations](https://campulse-in4q.onrender.com/my-registrations)

### 🔑 Demo Logins

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin@campulse.com` | `admin123` |
| **Student** | `student@campus.com` | `student123` |

---

## 📌 About CAMPULSE

CAMPULSE is designed to solve a common college problem: event information is often distributed across different groups, announcements, posters, and social media platforms. 

Students may miss events because information is spread across multiple places. CAMPULSE provides a centralized platform where students can discover campus events and register for them, while administrators can manage events and monitor registrations.

---

## ✨ Key Features

### 🎓 Student Features
* **Home Page:** Introduction to CAMPULSE, featured events, upcoming events, and quick navigation.
* **Events Page:** View all available campus events including category, date, time, venue, description, available seats, and registration status.
* **Search & Filter:** Search events by name (e.g., *Hackathon*, *Workshop*) and filter events by category.
* **Event Details:** Dedicated view for comprehensive event information.
* **Event Registration:** Register via Name, Email, College / Year, and Phone, with real-time backend capacity checks.
* **Capacity Tracking:** Live counts (e.g., `25 / 60 seats filled`) preventing over-registration.
* **My Registrations:** Track personal registered events via `/my-registrations`.

### 🛠️ Admin Dashboard
* **Dashboard Statistics:** Overview of total events, total registrations, and upcoming events.
* **Event Management:** Add, edit, or delete events with confirmation steps.
* **Registration Monitoring:** View and search registered students by name, email, or event name.

---

## 📊 Feature Summary

| Feature | Student | Admin |
| :--- | :---: | :---: |
| Home Page | ✓ | ✓ |
| View Events | ✓ | ✓ |
| Search Events | ✓ | — |
| Filter Events | ✓ | — |
| Event Details | ✓ | ✓ |
| Event Registration | ✓ | — |
| Capacity Information | ✓ | ✓ |
| My Registrations | ✓ | — |
| Add Event | — | ✓ |
| Edit Event | — | ✓ |
| Delete Event | — | ✓ |
| View Registrations | — | ✓ |
| Search Registrations | — | ✓ |
| Dashboard Statistics | — | ✓ |

---

## 🧩 Technology Stack

### Frontend
* React
* Vite
* JavaScript (JSX)
* CSS / Fetch API

### Backend
* Node.js
* Express.js
* CORS
* File System (`fs`) for JSON data storage (`Backend/data/`)

---

## 📁 Project Structure

```text
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