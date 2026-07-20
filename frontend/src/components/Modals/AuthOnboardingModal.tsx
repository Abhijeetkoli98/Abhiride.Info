'use client';

import { useState, useEffect } from 'react';
import { useRideStore } from '@/store/useRideStore';
import { useToastStore } from '@/store/useToastStore';
import { X, UserCheck, Car, ShieldCheck, Phone, Mail, FileText, CheckCircle2, Lock, Camera, Upload, AlertCircle, ArrowRight, User, Eye, EyeOff } from 'lucide-react';

export default function AuthOnboardingModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, setUser, user } = useRideStore();
  const { addToast } = useToastStore();

  const [authMode, setAuthMode] = useState<'LOGIN' | 'REGISTER' | 'FORGOT_PASSWORD'>('LOGIN');
  const [role, setRole] = useState<'PASSENGER' | 'DRIVER'>('PASSENGER');
  
  // Login Options
  const [loginMethod, setLoginMethod] = useState<'EMAIL' | 'PHONE'>('EMAIL');
  const [rememberMe, setRememberMe] = useState(true);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Registration Fields
  const [registerStep, setRegisterStep] = useState(1);
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  // Driver Credentials Fields
  const [dlNumber, setDlNumber] = useState('');
  const [rcNumber, setRcNumber] = useState('');
  const [vehicleMake, setVehicleMake] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [licensePlate, setLicensePlate] = useState('');
  const [seats, setSeats] = useState(4);
  const [fuelType, setFuelType] = useState('Petrol');
  const [manufacturingYear, setManufacturingYear] = useState('2022');

  // Trigger Role Onboarding Dialog on first launch if not authenticated
  useEffect(() => {
    const session = localStorage.getItem('abhiride_session');
    if (session) {
      try {
        const cachedUser = JSON.parse(session);
        setUser(cachedUser);
      } catch (err) {}
    } else {
      // Prompt role selector onboarding automatically on first landing
      const timer = setTimeout(() => {
        setIsAuthModalOpen(true);
        setAuthMode('REGISTER');
        setRegisterStep(1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  if (!isAuthModalOpen) return null;

  const handleSendOtp = () => {
    if (!phone || phone.trim().length < 10) {
      addToast({ type: 'error', title: 'Invalid Phone', message: 'Please input your complete mobile number.' });
      return;
    }
    setOtpSent(true);
    addToast({
      type: 'info',
      title: 'SMS OTP Code Sent 📱',
      message: 'Your verification OTP code is 9812'
    });
  };

  const handleEmailLogin = async () => {
    if (!email || !password) {
      addToast({ type: 'error', title: 'Missing Credentials', message: 'Email and password are required.' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        if (rememberMe) {
          localStorage.setItem('abhiride_session', JSON.stringify(data.user));
        }
        addToast({ type: 'success', title: 'Logged In Successfully 🔑', message: `Welcome back, ${data.user.name}!` });
        setIsAuthModalOpen(false);
      } else {
        addToast({ type: 'error', title: 'Login Failed', message: data.error || 'Invalid credentials.' });
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Network Connection Error', message: 'Unable to connect to auth server.' });
    }
  };

  const handlePhoneLogin = async () => {
    if (!otpCode) {
      addToast({ type: 'error', title: 'Missing OTP Code', message: 'Please enter the 4-digit SMS OTP.' });
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp: otpCode })
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        if (rememberMe) {
          localStorage.setItem('abhiride_session', JSON.stringify(data.user));
        }
        addToast({ type: 'success', title: 'Phone Verified & Authenticated ✓', message: `Welcome, ${data.user.name}!` });
        setIsAuthModalOpen(false);
      } else {
        addToast({ type: 'error', title: 'Invalid OTP', message: data.error });
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Network Connection Error', message: 'Unable to connect to auth server.' });
    }
  };

  const handleRegisterSubmit = async () => {
    if (!name || !email || !password || !phone) {
      addToast({ type: 'error', title: 'Missing Details', message: 'Please complete all required fields.' });
      return;
    }

    if (role === 'PASSENGER' && !acceptedTerms) {
      addToast({ type: 'error', title: 'Terms Required', message: 'You must accept our safety terms & guidelines.' });
      return;
    }

    const payload = {
      name, email, phone, role, password, dob, emergencyContact, aadhaarNumber,
      dlNumber, rcNumber, vehicleMake, vehicleModel, licensePlate
    };

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();

      if (data.success) {
        setUser(data.user);
        if (rememberMe) {
          localStorage.setItem('abhiride_session', JSON.stringify(data.user));
        }
        addToast({
          type: 'success',
          title: role === 'DRIVER' ? 'Driver Registered (Documents Pending)' : 'Passenger Profile Verified',
          message: role === 'DRIVER' 
            ? 'Account active. Documents submitted to administrative dashboard for approval.'
            : 'Account active. Explore cost-sharing corridors today!'
        });
        setIsAuthModalOpen(false);
      } else {
        addToast({ type: 'error', title: 'Registration Failed', message: data.error });
      }
    } catch (err) {
      addToast({ type: 'error', title: 'Registration Connection Error', message: 'Unable to process profile.' });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      addToast({ type: 'error', title: 'Missing Email', message: 'Input email address to trigger reset.' });
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      if (data.success) {
        addToast({ type: 'success', title: 'Recovery OTP Code Dispatched ✉️', message: 'Check your email inbox for password recovery directions.' });
        setAuthMode('LOGIN');
      }
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-100 no-scrollbar">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-20">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
              {authMode === 'LOGIN' ? 'Access Portal' : authMode === 'REGISTER' ? 'Onboarding & Registration' : 'Account Recovery'}
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              {authMode === 'LOGIN' ? 'Sign In to AbhiRide' : authMode === 'REGISTER' ? `Create ${role} Profile` : 'Reset Password'}
            </h2>
          </div>

          <button
            onClick={() => setIsAuthModalOpen(false)}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          {/* SIGN IN VIEW */}
          {authMode === 'LOGIN' && (
            <div className="space-y-4">
              {/* Method Switcher Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-2xl">
                <button
                  onClick={() => setLoginMethod('EMAIL')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    loginMethod === 'EMAIL' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Email & Password
                </button>
                <button
                  onClick={() => setLoginMethod('PHONE')}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    loginMethod === 'PHONE' ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Mobile Number (OTP)
                </button>
              </div>

              {loginMethod === 'EMAIL' ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="abhijeet@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-brand-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone Number</label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="flex-1 p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs shadow-sm"
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>

                  {otpSent && (
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2">
                      <label className="text-xs font-bold text-brand-800 block">Enter 4-Digit OTP (Demo Code: 9812)</label>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="9812"
                        value={otpCode}
                        onChange={(e) => setOtpCode(e.target.value)}
                        className="w-full p-3.5 bg-white border border-emerald-300 rounded-2xl text-center text-base font-mono font-extrabold tracking-widest text-slate-900 focus:outline-none"
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Action toggles */}
              <div className="flex items-center justify-between text-xs font-bold">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-brand-600"
                  />
                  Remember Me
                </label>
                <button
                  onClick={() => setAuthMode('FORGOT_PASSWORD')}
                  className="text-brand-600 hover:text-brand-700"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="button"
                onClick={loginMethod === 'EMAIL' ? handleEmailLogin : handlePhoneLogin}
                className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs shadow-card-hover"
              >
                Sign In to Account
              </button>

              <p className="text-xs text-slate-500 font-medium text-center">
                New to AbhiRide?{' '}
                <button onClick={() => { setAuthMode('REGISTER'); setRegisterStep(1); }} className="text-brand-600 font-bold hover:underline">
                  Register Account Now
                </button>
              </p>
            </div>
          )}

          {/* SIGN UP REGISTER VIEW */}
          {authMode === 'REGISTER' && (
            <div className="space-y-4">
              
              {/* Step 1: Select Role & Setup Basic Credentials */}
              {registerStep === 1 && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-sm text-center">Step 1: Choose Your Platform Role</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => setRole('PASSENGER')}
                      className={`p-5 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                        role === 'PASSENGER'
                          ? 'border-brand-500 bg-emerald-50/50 scale-102'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <UserCheck className="w-8 h-8 text-brand-600" />
                      <span className="font-extrabold text-slate-900 text-xs">Onboard as Passenger</span>
                    </button>

                    <button
                      onClick={() => setRole('DRIVER')}
                      className={`p-5 rounded-3xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                        role === 'DRIVER'
                          ? 'border-brand-500 bg-emerald-50/50 scale-102'
                          : 'border-slate-200 bg-white hover:border-slate-300'
                      }`}
                    >
                      <Car className="w-8 h-8 text-slate-700" />
                      <span className="font-extrabold text-slate-900 text-xs">Onboard as Driver</span>
                    </button>
                  </div>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Full Legal Name</label>
                      <input
                        type="text"
                        placeholder="Abhijeet Kumar"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="abhijeet@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Password</label>
                        <input
                          type="password"
                          placeholder="Create secure password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone Number</label>
                        <input
                          type="text"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Date of Birth</label>
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRegisterStep(2)}
                    className="w-full py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs"
                  >
                    Continue to Onboarding Documents →
                  </button>
                </div>
              )}

              {/* Step 2: Verification Documents Upload */}
              {registerStep === 2 && (
                <div className="space-y-4">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-brand-600" />
                    Step 2: Identity & Security Verification
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Emergency SOS Phone Number</label>
                      <input
                        type="text"
                        placeholder="SOS Contact"
                        value={emergencyContact}
                        onChange={(e) => setEmergencyContact(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">Government ID (Aadhaar/Passport)</label>
                      <input
                        type="text"
                        placeholder="Aadhaar ID"
                        value={aadhaarNumber}
                        onChange={(e) => setAadhaarNumber(e.target.value)}
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                      />
                    </div>

                    {role === 'DRIVER' && (
                      <div className="space-y-3 border-t border-slate-100 pt-3">
                        <span className="text-xs font-extrabold text-slate-700 block">Driving Licence & Vehicle Specs</span>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            placeholder="Driving Licence DL"
                            value={dlNumber}
                            onChange={(e) => setDlNumber(e.target.value)}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800"
                          />
                          <input
                            type="text"
                            placeholder="Vehicle Registration RC"
                            value={rcNumber}
                            onChange={(e) => setRcNumber(e.target.value)}
                            className="p-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800"
                          />
                        </div>

                        <div className="grid grid-cols-3 gap-2">
                          <input
                            type="text"
                            placeholder="Make (e.g. Maruti)"
                            value={vehicleMake}
                            onChange={(e) => setVehicleMake(e.target.value)}
                            className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800"
                          />
                          <input
                            type="text"
                            placeholder="Model (e.g. Swift)"
                            value={vehicleModel}
                            onChange={(e) => setVehicleModel(e.target.value)}
                            className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800"
                          />
                          <input
                            type="text"
                            placeholder="License Plate"
                            value={licensePlate}
                            onChange={(e) => setLicensePlate(e.target.value)}
                            className="p-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800"
                          />
                        </div>
                      </div>
                    )}

                    <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-600 font-medium">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-0.5 accent-brand-600"
                      />
                      <span>I agree to AbhiRide Zero-Profit Community Code and Safety Guidelines.</span>
                    </label>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setRegisterStep(1)}
                      className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-xs"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleRegisterSubmit}
                      className="flex-1 py-3 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs"
                    >
                      Complete & Register Profile
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {authMode === 'FORGOT_PASSWORD' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-500 font-medium leading-relaxed">
                Provide your registered email address below. We will send a secure verification recovery OTP code to reset your login password.
              </p>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-semibold text-slate-800 focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setAuthMode('LOGIN')}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-2xl font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="flex-1 py-3.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold text-xs"
                >
                  Send Recovery Link
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
