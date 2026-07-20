import { create } from 'zustand';

export interface Ride {
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
  matchScore?: number;
  detourMinutesEstimate?: number;
  matchReasons?: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'PASSENGER' | 'DRIVER' | 'ADMIN';
  verificationStatus: 'VERIFIED' | 'PENDING' | 'UNVERIFIED';
  trustScore: number;
  referralCode: string;
  walletBalance: number;
  avatar: string;
  emergencyContact: string;
}

interface RideState {
  // Navigation & Role
  activeRole: 'PASSENGER' | 'DRIVER';
  setActiveRole: (role: 'PASSENGER' | 'DRIVER') => void;
  user: UserProfile;
  setUser: (user: UserProfile) => void;

  // Search State
  origin: string;
  destination: string;
  travelDate: string;
  requestedSeats: number;
  ladiesOnly: boolean;
  verifiedOnly: boolean;
  maxPrice: number;

  setSearchQuery: (query: { origin?: string; destination?: string; date?: string; seats?: number }) => void;
  setFilterOptions: (filters: { ladiesOnly?: boolean; verifiedOnly?: boolean; maxPrice?: number }) => void;

  // Rides & Selected Items
  rides: Ride[];
  setRides: (rides: Ride[]) => void;
  selectedRide: Ride | null;
  setSelectedRide: (ride: Ride | null) => void;

  // Modals & Drawers
  isPostingModalOpen: boolean;
  setIsPostingModalOpen: (open: boolean) => void;

  isDetailsModalOpen: boolean;
  setIsDetailsModalOpen: (open: boolean) => void;

  isBookingModalOpen: boolean;
  setIsBookingModalOpen: (open: boolean) => void;

  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;

  isChatOpen: boolean;
  setIsChatOpen: (open: boolean) => void;

  isVerificationOpen: boolean;
  setIsVerificationOpen: (open: boolean) => void;

  isSOSModalOpen: boolean;
  setIsSOSModalOpen: (open: boolean) => void;

  isWalletOpen: boolean;
  setIsWalletOpen: (open: boolean) => void;

  isReviewModalOpen: boolean;
  setIsReviewModalOpen: (open: boolean) => void;

  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;

  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;

  isHistoryModalOpen: boolean;
  setIsHistoryModalOpen: (open: boolean) => void;

  isSafetyCenterOpen: boolean;
  setIsSafetyCenterOpen: (open: boolean) => void;

  isUserStatsOpen: boolean;
  setIsUserStatsOpen: (open: boolean) => void;

  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;

  // Active Booking state
  currentBookingTicket: any | null;
  setCurrentBookingTicket: (ticket: any | null) => void;
}

const INITIAL_USER: UserProfile = {
  id: 'usr-101',
  name: 'Abhijet Kumar',
  email: 'abhijeet@abhiride.com',
  phone: '+91 98765 43210',
  role: 'PASSENGER',
  verificationStatus: 'VERIFIED',
  trustScore: 98,
  referralCode: 'ABHI98X',
  walletBalance: 2450.0,
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  emergencyContact: '+91 91234 56789'
};

export const useRideStore = create<RideState>((set) => ({
  activeRole: 'PASSENGER',
  setActiveRole: (role) => set({ activeRole: role }),
  user: INITIAL_USER,
  setUser: (user) => set({ user }),

  isAuthModalOpen: false,
  setIsAuthModalOpen: (open) => set({ isAuthModalOpen: open }),

  origin: '',
  destination: '',
  travelDate: '2026-07-21',
  requestedSeats: 1,
  ladiesOnly: false,
  verifiedOnly: false,
  maxPrice: 1500,

  setSearchQuery: (query) =>
    set((state) => ({
      origin: query.origin !== undefined ? query.origin : state.origin,
      destination: query.destination !== undefined ? query.destination : state.destination,
      travelDate: query.date !== undefined ? query.date : state.travelDate,
      requestedSeats: query.seats !== undefined ? query.seats : state.requestedSeats,
    })),

  setFilterOptions: (filters) =>
    set((state) => ({
      ladiesOnly: filters.ladiesOnly !== undefined ? filters.ladiesOnly : state.ladiesOnly,
      verifiedOnly: filters.verifiedOnly !== undefined ? filters.verifiedOnly : state.verifiedOnly,
      maxPrice: filters.maxPrice !== undefined ? filters.maxPrice : state.maxPrice,
    })),

  rides: [],
  setRides: (rides) => set({ rides }),
  selectedRide: null,
  setSelectedRide: (ride) => set({ selectedRide: ride }),

  isPostingModalOpen: false,
  setIsPostingModalOpen: (open) => set({ isPostingModalOpen: open }),

  isDetailsModalOpen: false,
  setIsDetailsModalOpen: (open) => set({ isDetailsModalOpen: open }),

  isBookingModalOpen: false,
  setIsBookingModalOpen: (open) => set({ isBookingModalOpen: open }),

  isTrackingModalOpen: false,
  setIsTrackingModalOpen: (open) => set({ isTrackingModalOpen: open }),

  isChatOpen: false,
  setIsChatOpen: (open) => set({ isChatOpen: open }),

  isVerificationOpen: false,
  setIsVerificationOpen: (open) => set({ isVerificationOpen: open }),

  isSOSModalOpen: false,
  setIsSOSModalOpen: (open) => set({ isSOSModalOpen: open }),

  isWalletOpen: false,
  setIsWalletOpen: (open) => set({ isWalletOpen: open }),

  isReviewModalOpen: false,
  setIsReviewModalOpen: (open) => set({ isReviewModalOpen: open }),

  isProfileModalOpen: false,
  setIsProfileModalOpen: (open) => set({ isProfileModalOpen: open }),

  isHistoryModalOpen: false,
  setIsHistoryModalOpen: (open) => set({ isHistoryModalOpen: open }),

  isSafetyCenterOpen: false,
  setIsSafetyCenterOpen: (open) => set({ isSafetyCenterOpen: open }),

  isUserStatsOpen: false,
  setIsUserStatsOpen: (open) => set({ isUserStatsOpen: open }),

  isAdminOpen: false,
  setIsAdminOpen: (open) => set({ isAdminOpen: open }),

  currentBookingTicket: null,
  setCurrentBookingTicket: (ticket) => set({ currentBookingTicket: ticket }),
}));
