# AbhiRide - Intercity Ride Cost-Sharing Platform

AbhiRide is a full-stack web application designed to enable fair intercity travel cost sharing between vehicle owners and co-travelers. The platform operates on a zero-profit expense distribution model, splitting actual travel expenses (fuel and highway tolls) without commercial fare markups.

---

## Introduction & Problem Statement

Intercity travel by private car often results in single-occupant vehicles with high out-of-pocket costs for drivers, while co-passengers face expensive bus or taxi fares. 

AbhiRide addresses this by connecting verified drivers with passengers heading along the same intercity corridor. Travel expenses are split using a zero-profit formula:

```text
Total Expense = (Distance x Fuel Price / Mileage) + Highway Tolls
Per-Seat Fare = Total Expense / (Passenger Seats + Driver Seat)
```

---

## Key Features

- **Smart Ride Search**: Query active intercity trips with origin, destination, verified driver badges, and ladies-preferred filters.
- **Leaflet GPS Mapping**: View route maps and pickup points using an interactive Leaflet map component.
- **Identity Verification**: Multi-step verification center for Aadhaar government ID, driving license, and biometric selfie checks.
- **Live Trip Tracking**: Real-time location tracking drawer and emergency SOS alert button.
- **In-App Messaging**: Real-time driver-passenger chat drawer for pickup coordination.
- **Transparent Fare Calculation**: Itemized receipt generator showing distance, mileage inputs, fuel rates, and toll breakdowns.

---

## Tech Stack & Architecture

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Zustand, Leaflet
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, Socket.io
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication & Storage**: Firebase Admin SDK, JWT, Bcrypt

---

## Installation & Local Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Method 1: Windows Launcher (One-Click)
Double-click Run.bat in the root folder to launch both frontend and backend dev servers automatically.

### Method 2: Docker Compose
```bash
docker-compose up --build
```

### Method 3: Manual Setup

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
Access the frontend application at http://localhost:3000.

#### Backend
```bash
cd backend
npm install
npm run dev
```
Backend API runs at http://localhost:5000.

---

## Environment Variables

To configure environment variables for local development, copy the .env.example files:

- **Root Environment File** (`.env.example`): Shared configuration template for client and server variables.
- **Frontend Environment File** (`frontend/.env.example`): Configures NEXT_PUBLIC_API_URL and Firebase client SDK credentials.
- **Backend Environment File** (`backend/.env.example`): Configures PORT, DATABASE_URL (PostgreSQL connection string), JWT_SECRET, and CORS origins.

---

## API Reference Table

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new traveler or driver account | Public |
| `POST` | `/api/auth/login` | Authenticate user and return JWT token | Public |
| `GET` | `/api/rides` | List available cost-sharing intercity trips | Public |
| `POST` | `/api/rides` | Post empty seats for an upcoming ride | Verified Driver |
| `POST` | `/api/rides/:id/book` | Reserve seats and generate expense receipt | Verified User |
| `GET` | `/api/users/profile` | Fetch user profile, verification status, and trip stats | Authenticated |

---

## Project Structure

```text
AbhiRide/
├── frontend/                  # Next.js 14 Frontend Web Application
│   ├── src/
│   │   ├── app/               # Next.js App Router (page.tsx, layout.tsx, globals.css)
│   │   ├── components/        # Modals, Drawers, Sections, Navigation, Map
│   │   ├── store/             # Zustand State Stores
│   │   └── config/            # Client Firebase configuration
│   ├── next.config.js         # SWC & Tree-shaking optimizations
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   └── package.json
├── backend/                   # Express + TypeScript Backend API
│   ├── src/                   # Server, Controllers, Middleware, Services, AI Engine
│   ├── prisma/                # PostgreSQL Prisma Schema
│   └── package.json
├── docker-compose.yml         # Container Orchestration
├── Run.bat                    # Windows Launcher Script
├── .env.example               # Root Environment Variables Template
└── README.md                  # Project Documentation
```

---

## Future Roadmap

- [ ] **Mobile Application**: Native mobile app built with React Native for iOS and Android.
- [ ] **Automated FASTag API Integration**: Real-time highway toll fare fetching via FASTag highway APIs.
- [ ] **EV Charging Route Planner**: Smart trip route planning integrated with electric vehicle charging station stops.

---

## Author

- **Abhijeet Koli** - [GitHub Profile](https://github.com/Abhijeetkoli98)
