# AbhiRide - Intercity Ride Cost-Sharing Web Application

AbhiRide is a full-stack web application designed for intercity ride cost-sharing between drivers and co-passengers. The platform automatically calculates fair cost sharing based on fuel prices, vehicle mileage, route distance, and highway tolls, ensuring zero-profit expense distribution among travelers.

## Features

- **Search and Filter Rides**: Find rides by origin, destination, verified driver badges, and ladies-preferred filters.
- **Interactive Map**: View trip routes using an interactive Leaflet GPS map.
- **Identity Verification**: Aadhaar ID verification modal and user profile management.
- **Booking & Receipts**: Book available seats and view trip expense receipts.
- **In-App Communication**: Integrated chat drawer for passenger-driver coordination.
- **Safety Features**: Emergency SOS modal and live tracking drawer.
- **Digital Wallet**: Digital wallet drawer for tracking cost-share transactions.

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand, Leaflet
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, Socket.io
- **Database**: PostgreSQL (Prisma ORM)

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Method 1: Windows Launcher
Double-click Run.bat in the root folder to start both frontend and backend servers together.

### Method 2: Manual Setup

1. **Frontend**:
```bash
cd frontend
npm install
npm run dev
```
Open http://localhost:3000 in your browser.

2. **Backend**:
```bash
cd backend
npm install
npm run dev
```
Backend server will run on http://localhost:5000.

## Project Structure

- `frontend/`: Next.js frontend application (pages, components, stores, styles)
- `backend/`: Express + TypeScript backend API (controllers, services, prisma)
- `Run.bat`: Windows launcher script
- `docker-compose.yml`: Docker setup file

## Author

- **Abhijeet Koli** - [GitHub Profile](https://github.com/Abhijeetkoli98)
