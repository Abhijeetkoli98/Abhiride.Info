// AbhiRide Mock Data & Storage Service

export interface MockRide {
  id: string;
  driverId: string;
  driverName: string;
  driverAvatar: string;
  driverRating: number;
  driverTrustScore: number;
  isVerified: boolean;
  vehicle: {
    make: string;
    model: string;
    color: string;
    licensePlate: string;
    fuelType: string;
    mileageKmpl: number;
  };
  origin: string;
  originLat: number;
  originLng: number;
  destination: string;
  destinationLat: number;
  destinationLng: number;
  departureTime: string;
  totalDistanceKm: number;
  estimatedHours: number;
  fuelCostTotal: number;
  tollCostTotal: number;
  seatPrice: number;
  availableSeats: number;
  totalSeats: number;
  rules: string[];
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  pickupPoints: string[];
}

export const MOCK_RIDES: MockRide[] = [
  {
    id: 'ride-101',
    driverId: 'usr-drv-1',
    driverName: 'Vikram Sharma',
    driverAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.9,
    driverTrustScore: 98,
    isVerified: true,
    vehicle: {
      make: 'Honda',
      model: 'City ZX',
      color: 'Lunar Silver',
      licensePlate: 'KA-01-MJ-8821',
      fuelType: 'Petrol',
      mileageKmpl: 16.5
    },
    origin: 'Silk Board, Bengaluru',
    originLat: 12.9172,
    originLng: 77.6228,
    destination: 'T. Nagar, Chennai',
    destinationLat: 13.0418,
    destinationLng: 80.2341,
    departureTime: '2026-07-21T06:30:00.000Z',
    totalDistanceKm: 348,
    estimatedHours: 6.2,
    fuelCostTotal: 2160,
    tollCostTotal: 480,
    seatPrice: 660,
    availableSeats: 3,
    totalSeats: 4,
    rules: ['Non-Smoking', 'Luggage Limited to 1 Bag', 'AC Always On', 'Music Friendly'],
    status: 'SCHEDULED',
    pickupPoints: ['Silk Board Flyover Junction', 'Electronic City Toll Plaza', 'Hosur Bus Stand']
  },
  {
    id: 'ride-102',
    driverId: 'usr-drv-2',
    driverName: 'Ananya Deshmukh',
    driverAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
    driverRating: 5.0,
    driverTrustScore: 99,
    isVerified: true,
    vehicle: {
      make: 'Tata',
      model: 'Nexon EV Empowered',
      color: 'Teal Blue',
      licensePlate: 'MH-12-RS-4490',
      fuelType: 'Electric',
      mileageKmpl: 25.0
    },
    origin: 'Baner, Pune',
    originLat: 18.559,
    originLng: 73.7868,
    destination: 'Bandra West, Mumbai',
    destinationLat: 19.0596,
    destinationLng: 72.8295,
    departureTime: '2026-07-21T08:00:00.000Z',
    totalDistanceKm: 148,
    estimatedHours: 2.8,
    fuelCostTotal: 450,
    tollCostTotal: 320,
    seatPrice: 255,
    availableSeats: 2,
    totalSeats: 3,
    rules: ['Ladies Only', 'Silent Ride Preferred', 'No Pets'],
    status: 'SCHEDULED',
    pickupPoints: ['Baner D-Mart', 'Wakad Highway Bridge', 'Lonavala Expressway Exit']
  },
  {
    id: 'ride-103',
    driverId: 'usr-drv-3',
    driverName: 'Rohan Verma',
    driverAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.8,
    driverTrustScore: 94,
    isVerified: true,
    vehicle: {
      make: 'Hyundai',
      model: 'Creta SX O',
      color: 'Titan Grey',
      licensePlate: 'DL-03-CC-9912',
      fuelType: 'Diesel',
      mileageKmpl: 18.0
    },
    origin: 'Cyber City, Gurugram',
    originLat: 28.495,
    originLng: 77.089,
    destination: 'Raja Sansi, Amritsar',
    destinationLat: 31.634,
    destinationLng: 74.8723,
    departureTime: '2026-07-21T05:00:00.000Z',
    totalDistanceKm: 465,
    estimatedHours: 7.5,
    fuelCostTotal: 2320,
    tollCostTotal: 620,
    seatPrice: 735,
    availableSeats: 3,
    totalSeats: 4,
    rules: ['Non-Smoking', 'Pet Friendly', 'Luggage Allowed'],
    status: 'SCHEDULED',
    pickupPoints: ['Cyber Hub Gate 2', 'Panipat Toll Plaza', 'Ambala Flyover']
  },
  {
    id: 'ride-104',
    driverId: 'usr-drv-4',
    driverName: 'Priya Sundaram',
    driverAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    driverRating: 4.9,
    driverTrustScore: 96,
    isVerified: true,
    vehicle: {
      make: 'Maruti Suzuki',
      model: 'Brezza ZXi',
      color: 'Brave Khaki',
      licensePlate: 'TS-09-EV-3310',
      fuelType: 'CNG',
      mileageKmpl: 22.0
    },
    origin: 'Gachibowli, Hyderabad',
    originLat: 17.4401,
    originLng: 78.3489,
    destination: 'Banjara Hills, Vijayawada',
    destinationLat: 16.5062,
    destinationLng: 80.648,
    departureTime: '2026-07-21T07:15:00.000Z',
    totalDistanceKm: 272,
    estimatedHours: 5.0,
    fuelCostTotal: 945,
    tollCostTotal: 340,
    seatPrice: 320,
    availableSeats: 2,
    totalSeats: 4,
    rules: ['Women Only', 'No Smoking', 'AC On'],
    status: 'SCHEDULED',
    pickupPoints: ['Gachibowli Outer Ring Road', 'LB Nagar Metro Station']
  }
];

export const MOCK_USER = {
  id: 'usr-current-1',
  name: 'Abhijet Kumar',
  email: 'abhijeet@abhiride.com',
  phone: '+91 98765 43210',
  role: 'PASSENGER',
  verificationStatus: 'VERIFIED',
  trustScore: 97,
  referralCode: 'ABHI97X',
  walletBalance: 2450.00,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  emergencyContact: '+91 91234 56789'
};

export const MOCK_ADMIN_METRICS = {
  totalUsers: 14280,
  activeDrivers: 3420,
  totalRidesCompleted: 89400,
  totalCo2SavedTons: 142.5,
  totalMoneySavedInr: 42800000,
  pendingVerifications: 18,
  flaggedRidesCount: 2,
  systemHealth: '100% Operational'
};
