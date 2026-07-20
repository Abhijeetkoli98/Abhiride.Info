import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { calculateFairRideExpense } from './services/costCalculator';
import { rankRidesForPassenger, evaluateFraudRisk } from './ai/matchEngine';
import { MOCK_RIDES, MOCK_USER, MOCK_ADMIN_METRICS, MockRide } from './services/mockDataService';
import { registerUser, loginUser, forgotPassword } from './controllers/authController';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Auth Routes
app.post('/api/auth/register', registerUser);
app.post('/api/auth/login', loginUser);
app.post('/api/auth/forgot-password', forgotPassword);

// In-memory state for active mock runtime
let ridesDatabase: MockRide[] = [...MOCK_RIDES];

// 1. Health & Status Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    platform: 'AbhiRide Backend Engine',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    activeRides: ridesDatabase.length
  });
});

// 2. Fair Expense Calculation Endpoint
app.post('/api/cost-calculate', (req, res) => {
  try {
    const { distanceKm, fuelType, mileageKmpl, totalSeats, tollCost } = req.body;
    if (!distanceKm || !fuelType || !mileageKmpl || !totalSeats) {
      return res.status(400).json({ error: 'Missing required parameters for cost calculation' });
    }
    const calculation = calculateFairRideExpense({
      distanceKm: Number(distanceKm),
      fuelType,
      mileageKmpl: Number(mileageKmpl),
      totalSeats: Number(totalSeats),
      tollCost: Number(tollCost || 0)
    });
    return res.json({ success: true, calculation });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// 3. Search Rides API with AI Match Scoring & Filtering
app.get('/api/rides', (req, res) => {
  const { origin, destination, seats, maxPrice, ladiesOnly, verifiedOnly } = req.query;

  let results = ridesDatabase.filter((r) => r.status === 'SCHEDULED' && r.availableSeats > 0);

  if (origin) {
    const q = String(origin).toLowerCase();
    results = results.filter((r) => r.origin.toLowerCase().includes(q));
  }
  if (destination) {
    const q = String(destination).toLowerCase();
    results = results.filter((r) => r.destination.toLowerCase().includes(q));
  }
  if (seats) {
    results = results.filter((r) => r.availableSeats >= Number(seats));
  }
  if (maxPrice) {
    results = results.filter((r) => r.seatPrice <= Number(maxPrice));
  }
  if (ladiesOnly === 'true') {
    results = results.filter((r) => r.rules.includes('Ladies Only') || r.rules.includes('Ladies Preferred'));
  }
  if (verifiedOnly === 'true') {
    results = results.filter((r) => r.isVerified);
  }

  res.json({
    success: true,
    total: results.length,
    rides: results
  });
});

// 4. AI Match Ranking API
app.post('/api/ai/match', (req, res) => {
  const { originLat, originLng, destinationLat, destinationLng, desiredTime, ladiesOnly } = req.body;
  
  const candidates = ridesDatabase.map((r) => ({
    id: r.id,
    driverName: r.driverName,
    driverTrustScore: r.driverTrustScore,
    originLat: r.originLat,
    originLng: r.originLng,
    destinationLat: r.destinationLat,
    destinationLng: r.destinationLng,
    departureTime: r.departureTime,
    seatPrice: r.seatPrice,
    availableSeats: r.availableSeats,
    rules: r.rules
  }));

  const matches = rankRidesForPassenger(
    {
      originLat: Number(originLat || 12.9172),
      originLng: Number(originLng || 77.6228),
      destinationLat: Number(destinationLat || 13.0418),
      destinationLng: Number(destinationLng || 80.2341),
      desiredTime: desiredTime || new Date().toISOString(),
      ladiesOnly: Boolean(ladiesOnly)
    },
    candidates
  );

  const matchedRides = matches.map((m) => {
    const rideDetails = ridesDatabase.find((r) => r.id === m.rideId);
    return {
      ...rideDetails,
      matchScore: m.matchScore,
      detourMinutesEstimate: m.detourMinutesEstimate,
      matchReasons: m.matchReasons
    };
  });

  res.json({ success: true, matches: matchedRides });
});

// 5. Post a New Ride (Driver Flow)
app.post('/api/rides', (req, res) => {
  try {
    const {
      origin, originLat, originLng,
      destination, destinationLat, destinationLng,
      departureTime, totalDistanceKm, estimatedHours,
      fuelType, mileageKmpl, vehicleMake, vehicleModel, vehiclePlate,
      totalSeats, tollCostTotal, rules, pickupPoints
    } = req.body;

    const calc = calculateFairRideExpense({
      distanceKm: Number(totalDistanceKm),
      fuelType: fuelType || 'Petrol',
      mileageKmpl: Number(mileageKmpl || 15),
      totalSeats: Number(totalSeats || 4),
      tollCost: Number(tollCostTotal || 0)
    });

    const newRide: MockRide = {
      id: `ride-${Date.now()}`,
      driverId: MOCK_USER.id,
      driverName: MOCK_USER.name,
      driverAvatar: MOCK_USER.avatar,
      driverRating: 5.0,
      driverTrustScore: MOCK_USER.trustScore,
      isVerified: true,
      vehicle: {
        make: vehicleMake || 'Honda',
        model: vehicleModel || 'City',
        color: 'White',
        licensePlate: vehiclePlate || 'KA-05-AB-1234',
        fuelType: fuelType || 'Petrol',
        mileageKmpl: Number(mileageKmpl || 15)
      },
      origin,
      originLat: Number(originLat),
      originLng: Number(originLng),
      destination,
      destinationLat: Number(destinationLat),
      destinationLng: Number(destinationLng),
      departureTime,
      totalDistanceKm: Number(totalDistanceKm),
      estimatedHours: Number(estimatedHours || 5),
      fuelCostTotal: calc.totalFuelCost,
      tollCostTotal: calc.totalTollCost,
      seatPrice: calc.fairSeatPrice,
      availableSeats: Number(totalSeats) - 1,
      totalSeats: Number(totalSeats),
      rules: rules || ['Non-Smoking'],
      status: 'SCHEDULED',
      pickupPoints: pickupPoints || [origin]
    };

    // Fraud detection check
    const fraudResult = evaluateFraudRisk({
      seatPrice: calc.fairSeatPrice,
      totalDistanceKm: Number(totalDistanceKm),
      totalSeats: Number(totalSeats)
    });

    if (fraudResult.isFlagged) {
      console.warn(`[AI FRAUD DETECTOR]: Ride ${newRide.id} flagged for high pricing.`);
    }

    ridesDatabase.unshift(newRide);

    res.status(201).json({
      success: true,
      message: 'Ride posted successfully with fair expense breakdown',
      ride: newRide,
      costCalculation: calc,
      fraudCheck: fraudResult
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// 6. Booking & Razorpay Payment Simulator API
app.post('/api/bookings', (req, res) => {
  const { rideId, seatsBooked, pickupPoint, dropPoint, paymentMethod } = req.body;
  const ride = ridesDatabase.find((r) => r.id === rideId);

  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }
  if (ride.availableSeats < Number(seatsBooked || 1)) {
    return res.status(400).json({ error: 'Not enough seats available' });
  }

  const bookedSeatsCount = Number(seatsBooked || 1);
  ride.availableSeats -= bookedSeatsCount;

  const totalPrice = ride.seatPrice * bookedSeatsCount;
  const bookingId = `BK-${Math.floor(100000 + Math.random() * 900000)}`;
  const qrTicketCode = `ABHI-QR-${bookingId}-${Date.now()}`;

  res.json({
    success: true,
    message: 'Booking confirmed!',
    booking: {
      id: bookingId,
      rideId,
      driverName: ride.driverName,
      driverPhone: '+91 98765 00000',
      seatsBooked: bookedSeatsCount,
      seatPrice: ride.seatPrice,
      totalPrice,
      pickupPoint: pickupPoint || ride.origin,
      dropPoint: dropPoint || ride.destination,
      qrTicketCode,
      paymentMethod: paymentMethod || 'Razorpay UPI',
      status: 'CONFIRMED',
      departureTime: ride.departureTime
    }
  });
});

// 7. Emergency SOS Trigger API
app.post('/api/sos', (req, res) => {
  const { rideId, lat, lng } = req.body;
  console.log(`🚨 EMERGENCY SOS TRIGGERED! Ride: ${rideId}, Location: ${lat}, ${lng}`);
  
  // Emit emergency alert to connected WebSocket clients/admin
  io.emit('emergency_sos_alert', {
    user: MOCK_USER.name,
    phone: MOCK_USER.emergencyContact,
    rideId,
    lat,
    lng,
    timestamp: new Date().toISOString()
  });

  res.json({
    success: true,
    message: 'Emergency SOS alert sent! Local emergency responders & trusted contacts notified.',
    sosId: `SOS-${Date.now()}`
  });
});

// 8. Admin Analytics & Fraud Monitoring API
app.get('/api/admin/analytics', (req, res) => {
  res.json({
    success: true,
    metrics: MOCK_ADMIN_METRICS,
    recentRides: ridesDatabase.slice(0, 5)
  });
});

// Real-Time WebSockets Engine
io.on('connection', (socket) => {
  console.log(`⚡ Client connected: ${socket.id}`);

  // Join Ride Tracking Room
  socket.on('join_ride_room', (rideId: string) => {
    socket.join(`ride_${rideId}`);
    console.log(`Socket ${socket.id} joined room ride_${rideId}`);
  });

  // Chat message broadcast
  socket.on('send_chat_message', (data: { rideId: string; sender: string; text: string; type?: string }) => {
    io.to(`ride_${data.rideId}`).emit('receive_chat_message', {
      id: `msg-${Date.now()}`,
      ...data,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
  });

  // Live Driver Location Stream
  socket.on('update_driver_location', (data: { rideId: string; lat: number; lng: number; speedKm: number }) => {
    socket.to(`ride_${data.rideId}`).emit('live_location_update', data);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`===================================================`);
  console.log(`🚀 AbhiRide Server running on http://localhost:${PORT}`);
  console.log(`⚡ Socket.IO Server active for Real-time GPS & Chat`);
  console.log(`===================================================`);
});
