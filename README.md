# Isaii CRM — BDA Team Lead Management System

A full-stack MERN (MongoDB, Express.js, React, Node.js) application for managing Business Development Associate (BDA) team workflows in a manufacturing company. Features a stunning glassmorphism UI with a drag-and-drop Kanban pipeline, real-time dashboard analytics, team leaderboard, and sales reports.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-brightgreen) ![License](https://img.shields.io/badge/License-ISC-blue)

---

## 🚀 Features

- **Dashboard** — Overview with key metrics (Total Leads, Conversion Rate, Revenue Pipeline, Active BDAs), recent leads, and team leaderboard
- **Kanban Lead Pipeline** — Drag-and-drop board with 6 stages: New → Contacted → Meeting Scheduled → Proposal → Won / Lost
- **Lead Management** — Full CRUD with modal forms for adding/editing leads with contact details, deal value, notes
- **Team Performance** — BDA team cards with individual stats, conversion rates, and revenue progress bars
- **Sales Reports** — Monthly revenue bar chart, pipeline distribution breakdown, and summary table
- **Settings** — Profile, preferences (dark mode, notifications, language), and API configuration
- **Responsive Design** — Glassmorphism aesthetic with smooth micro-animations
- **API Fallback** — Works with seed data even without MongoDB running

---

## 🛠️ Tech Stack

| Layer       | Technology              |
|-------------|-------------------------|
| Frontend    | React 19 (Vite)         |
| Styling     | Tailwind CSS (Glassmorphism) |
| Backend     | Node.js + Express 5     |
| Database    | MongoDB + Mongoose      |
| Routing     | React Router DOM v7     |
| Icons       | Lucide React            |

---

## 📂 Project Structure

```
isaii-1/
├── backend/
│   ├── controllers/
│   │   └── leadController.js    # CRUD logic for leads
│   ├── models/
│   │   └── Lead.js              # Mongoose schema
│   ├── routes/
│   │   └── leadRoutes.js        # Express routes
│   ├── index.js                 # Entry point — server + DB connection
│   ├── .env                     # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard/       # Overview dashboard
│   │   │   ├── KanbanBoard/     # Pipeline board + Lead modal
│   │   │   └── Layout/          # Sidebar + Topbar
│   │   ├── pages/
│   │   │   ├── Team.jsx         # BDA team leaderboard
│   │   │   ├── Reports.jsx      # Sales analytics
│   │   │   └── Settings.jsx     # App preferences
│   │   ├── App.jsx              # Root component with routing
│   │   ├── App.css
│   │   ├── index.css            # Design system & global styles
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### Prerequisites

- **Node.js** v18+
- **MongoDB** (local or MongoDB Atlas)
- **npm** v9+

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/isaii-crm.git
cd isaii-crm
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file (or modify the existing one):

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/isaii-crm
```

Start the backend:

```bash
npm start
```

The API will run on `http://localhost:5000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will open on `http://localhost:5173`.

### 4. Using MongoDB Atlas (Optional)

Replace the `MONGO_URI` in `backend/.env` with your Atlas connection string:

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/isaii-crm?retryWrites=true&w=majority
```

---

## 🔌 API Endpoints

| Method | Endpoint          | Description        |
|--------|-------------------|--------------------|
| GET    | `/api/leads`      | Get all leads      |
| POST   | `/api/leads`      | Create a new lead  |
| PUT    | `/api/leads/:id`  | Update a lead      |
| DELETE | `/api/leads/:id`  | Delete a lead      |

---

## 💡 Notes

- The frontend includes **seed data fallback** — if MongoDB is not running, the app will still display sample leads so you can explore the UI immediately.
- When MongoDB is running and the database is empty, the app automatically seeds 10 sample leads.
- Drag-and-drop on the Kanban board uses the native HTML5 Drag & Drop API (no external library).

---

## 📜 License

ISC

# isaii-dba
