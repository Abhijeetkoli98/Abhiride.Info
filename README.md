# AbhiRide - Intercity Ride Cost-Sharing Web App

AbhiRide is a full-stack web application designed for sharing intercity ride costs between drivers and travelers. It calculates zero-profit ride costs based on fuel prices, vehicle mileage, distance, and highway tolls so that travelers can share travel expenses fairly.

## ?? Features

- **Ride Search & Filters**: Search available rides between cities with filters for verified drivers and ladies-only rides.
- **Interactive Map**: Built-in Leaflet GPS map to view ride routes interactively.
- **Verification System**: Aadhaar ID verification and profile settings.
- **Booking & Tickets**: Book seats, view trip summary receipts, and manage tickets.
- **In-App Chat & Safety**: Chat drawer to message drivers and an Emergency SOS alert button.
- **Digital Wallet**: View wallet balance and transaction history.

## ??? Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS, Zustand, Leaflet
- **Backend**: Node.js, Express.js, TypeScript, Prisma ORM, Socket.io
- **Database**: PostgreSQL (Prisma)

## ?? How to Run the Project Locally

### Prerequisites
Make sure you have Node.js installed on your machine.

### Method 1: Easy One-Click Launcher (Windows)
Double-click `Run.bat` in the root folder to start both frontend and backend automatically.

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
   Backend server will start on http://localhost:5000.

## ?? Project Structure

- `frontend/`: Next.js frontend code (pages, components, stores, styles)
- `backend/`: Express backend API (controllers, services, prisma schema)
- `Run.bat`: Windows startup script
- `docker-compose.yml`: Docker setup file

## ?? Author
- **Abhijeet Koli** - [GitHub Profile](https://github.com/Abhijeetkoli98)
