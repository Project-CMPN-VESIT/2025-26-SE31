# All Is Well - NGO Management System

A comprehensive full-stack platform designed for NGOs to manage residents, events, donations, and community enquiries. This system features a premium, user-centric frontend and a robust administrative dashboard.

## 🚀 Project Overview

**All Is Well** is a digital solution for non-profits to streamline their operations and enhance community engagement. It includes:
- **Public Portal**: Information about services, activities, and events.
- **Admin Dashboard**: Secure management of residents, enquiries, and official documents.
- **Donation Tracking**: Transparent management of community contributions.
- **Enquiry Helpdesk**: Real-time tracking and responses for user enquiries.

---

## 📂 Project Structure

```text
FieldProjectGroup31/
├── AllIsWellFrontend/    # React + Vite Frontend application
└── alliswellBackend/     # Node.js + Express + MongoDB Backend server
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB (Local or Atlas)
- Redis Server (for caching/sessions)

### 1. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd alliswellBackend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and add your credentials.
4. Start the server:
   ```bash
   npm start
   ```

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd AllIsWellFrontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔐 Environment Variables
**Important:** Ensure you set up the following in your backend `.env` file:
- `DBURL`: Your MongoDB connection string.
- `PORT`: Server port (default: 5000).
- `JWT_SECRET`: Secret key for authentication.
- `REDIS_URL`: Connection string for your Redis instance.

---

## 📜 License
This project is developed as part of the Field Project Group 31.
