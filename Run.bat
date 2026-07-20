@echo off
title AbhiRide Launcher
echo ===================================================
echo 🚀 Launching AbhiRide Full-Stack Services
echo ===================================================

echo.
echo Starting Backend API Server (Port 5000)...
start "AbhiRide Backend Server" cmd /c "cd backend && npm run dev"

echo.
echo Starting Frontend Web Application (Port 3000)...
start "AbhiRide Frontend Server" cmd /c "cd frontend && npm run dev"

echo.
echo ===================================================
echo ✅ All services launched successfully!
echo 🌐 Open http://localhost:3000 in your browser.
echo ===================================================
echo.
pause
