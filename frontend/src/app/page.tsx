'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import RideCard from '@/components/RideCard';
import Footer from '@/components/Footer';
import DynamicMap from '@/components/Map/DynamicMap';
import ToastContainer from '@/components/ToastContainer';
import HowItWorks from '@/components/Sections/HowItWorks';
import PopularRoutes from '@/components/Sections/PopularRoutes';
import { useRideStore } from '@/store/useRideStore';
import { MOCK_RIDES } from '../../../backend/src/services/mockDataService';
import { Filter, Map, List, Sparkles, HelpCircle, Star, Quote } from 'lucide-react';

// Dynamically import heavy modals & drawers for lazy loading and code splitting
const RideDetailsModal = dynamic(() => import('@/components/Modals/RideDetailsModal'), { ssr: false });
const RidePostingModal = dynamic(() => import('@/components/Modals/RidePostingModal'), { ssr: false });
const BookingModal = dynamic(() => import('@/components/Modals/BookingModal'), { ssr: false });
const LiveTrackingModal = dynamic(() => import('@/components/Modals/LiveTrackingModal'), { ssr: false });
const ChatDrawer = dynamic(() => import('@/components/Drawers/ChatDrawer'), { ssr: false });
const VerificationCenterModal = dynamic(() => import('@/components/Modals/VerificationCenterModal'), { ssr: false });
const EmergencySOSModal = dynamic(() => import('@/components/Modals/EmergencySOSModal'), { ssr: false });
const AdminDashboardModal = dynamic(() => import('@/components/Modals/AdminDashboardModal'), { ssr: false });
const WalletDrawer = dynamic(() => import('@/components/Drawers/WalletDrawer'), { ssr: false });
const RatingsReviewsModal = dynamic(() => import('@/components/Modals/RatingsReviewsModal'), { ssr: false });
const ProfileSettingsModal = dynamic(() => import('@/components/Modals/ProfileSettingsModal'), { ssr: false });
const TripHistoryModal = dynamic(() => import('@/components/Modals/TripHistoryModal'), { ssr: false });
const AuthOnboardingModal = dynamic(() => import('@/components/Modals/AuthOnboardingModal'), { ssr: false });
const SafetyCenterModal = dynamic(() => import('@/components/Modals/SafetyCenterModal'), { ssr: false });
const UserStatsDashboardModal = dynamic(() => import('@/components/Modals/UserStatsDashboardModal'), { ssr: false });

export default function Home() {
  const { rides, setRides, origin, destination, ladiesOnly, verifiedOnly } = useRideStore();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');

  // Load initial rides on mount
  useEffect(() => {
    setRides(MOCK_RIDES as any);
  }, [setRides]);

  // Filter rides based on store query
  const filteredRides = rides.filter((r) => {
    if (origin && !r.origin.toLowerCase().includes(origin.toLowerCase())) return false;
    if (destination && !r.destination.toLowerCase().includes(destination.toLowerCase())) return false;
    if (ladiesOnly && !r.rules.includes('Ladies Only') && !r.rules.includes('Ladies Preferred')) return false;
    if (verifiedOnly && !r.isVerified) return false;
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-brand-500 selection:text-white">
      
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Body */}
      <main className="flex-1">
        
        {/* Hero Banner with Smart Search */}
        <HeroSection />

        {/* Popular Intercity Corridors Section */}
        <PopularRoutes />

        {/* How AbhiRide Works Visual Section */}
        <HowItWorks />

        {/* Ride Results & Interactive Map Toggle Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-brand-500 animate-ping" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Available Cost-Sharing Rides
                </h2>
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">
                Showing {filteredRides.length} verified trips with transparent fuel & toll expense breakdown.
              </p>
            </div>

            {/* List vs Map View Switcher */}
            <div className="flex items-center p-1 bg-white border border-slate-200 rounded-2xl shadow-sm">
              <button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === 'list' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <List className="w-3.5 h-3.5" />
                List View
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 ${
                  viewMode === 'map' ? 'bg-brand-600 text-white shadow-emerald-glow' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Map className="w-3.5 h-3.5" />
                Map View
              </button>
            </div>
          </div>

          {/* View Content */}
          {viewMode === 'list' ? (
            <div className="space-y-4">
              {filteredRides.length > 0 ? (
                filteredRides.map((ride) => <RideCard key={ride.id} ride={ride} />)
              ) : (
                <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto text-slate-400">
                    <Filter className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">No Rides Found Matching Criteria</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    Try adjusting your search origin or filters. You can also offer your own empty seats as a driver!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <DynamicMap height="500px" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredRides.map((ride) => (
                  <RideCard key={ride.id} ride={ride} />
                ))}
              </div>
            </div>
          )}

        </section>

        {/* Community Testimonials */}
        <section className="bg-emerald-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-300 bg-emerald-800/80 px-3 py-1 rounded-full border border-emerald-700">
                Trusted Traveler Community
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight">Loved by 14,000+ Verified Travelers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-emerald-800/60 backdrop-blur-md rounded-3xl border border-emerald-700/80 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                  "I travel from Bengaluru to Chennai twice a month for work. AbhiRide recovers my exact fuel costs while meeting fantastic verified co-passengers."
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150" alt="" className="w-10 h-10 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs">Vikram Sharma</h4>
                    <span className="text-[10px] text-emerald-300">Software Architect • Verified Driver</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-emerald-800/60 backdrop-blur-md rounded-3xl border border-emerald-700/80 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                  "The ladies-only option and Aadhaar identity check give me total peace of mind. Plus, saving ₹1,200 per intercity trip is huge!"
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150" alt="" className="w-10 h-10 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs">Ananya Deshmukh</h4>
                    <span className="text-[10px] text-emerald-300">Product Manager • Passenger</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-emerald-800/60 backdrop-blur-md rounded-3xl border border-emerald-700/80 space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400" />)}
                </div>
                <p className="text-xs text-emerald-100 font-medium leading-relaxed">
                  "Transparent expense receipt shows exact mileage calculations. It is pure expense sharing—no hidden commercial fees!"
                </p>
                <div className="flex items-center gap-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150" alt="" className="w-10 h-10 rounded-2xl object-cover" />
                  <div>
                    <h4 className="font-bold text-xs">Rohan Verma</h4>
                    <span className="text-[10px] text-emerald-300">EV Enthusiast • Driver</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* FAQs Accordion */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">Frequently Asked Questions</h2>
            <p className="text-xs text-slate-500 font-medium">Everything you need to know about AbhiRide fair cost sharing</p>
          </div>

          <div className="space-y-4 text-xs font-medium text-slate-700">
            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                How is seat pricing calculated on AbhiRide?
              </h4>
              <p className="text-slate-500 leading-relaxed pl-6">
                AbhiRide uses a zero-profit formula: <span className="font-bold text-slate-800">Total Expense = (Distance × Fuel Cost / Vehicle Mileage) + Highway Tolls</span>. This total is split equally among all passenger seats and the driver seat.
              </p>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                Is AbhiRide a commercial taxi service?
              </h4>
              <p className="text-slate-500 leading-relaxed pl-6">
                No. Drivers are individuals who are already planning a personal trip and choose to offer their empty seats to recover travel costs. Drivers do not make a commercial profit.
              </p>
            </div>

            <div className="p-5 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-2">
              <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-600" />
                How does safety & verification work?
              </h4>
              <p className="text-slate-500 leading-relaxed pl-6">
                Every member completes government ID (Aadhaar & Driving License) photo verification and live biometric selfie matching before offering or booking seats.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Global Modals & Drawers */}
      <RideDetailsModal />
      <RidePostingModal />
      <BookingModal />
      <LiveTrackingModal />
      <ChatDrawer />
      <VerificationCenterModal />
      <EmergencySOSModal />
      <AdminDashboardModal />
      <WalletDrawer />
      <RatingsReviewsModal />
      <ProfileSettingsModal />
      <TripHistoryModal />
      <AuthOnboardingModal />
      <SafetyCenterModal />
      <UserStatsDashboardModal />
      <ToastContainer />

      {/* Footer */}
      <Footer />

    </div>
  );
}
