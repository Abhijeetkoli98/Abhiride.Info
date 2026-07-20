import { create } from 'zustand';

export type SupportedLanguage = 'en' | 'hi' | 'mr';

interface Translations {
  findRide: string;
  offerSeats: string;
  myTrips: string;
  trustScore: string;
  safetyCenter: string;
  stats: string;
  leavingFrom: string;
  goingTo: string;
  departureDate: string;
  seats: string;
  searchBtn: string;
  ladiesOnly: string;
  verifiedDrivers: string;
  fairExpenseSplit: string;
}

const DICTIONARY: Record<SupportedLanguage, Translations> = {
  en: {
    findRide: 'Find Ride',
    offerSeats: 'Offer Seats',
    myTrips: 'My Trips',
    trustScore: 'Trust Score',
    safetyCenter: 'Safety Center',
    stats: 'Impact Stats',
    leavingFrom: 'Leaving From',
    goingTo: 'Going To',
    departureDate: 'Departure Date',
    seats: 'Seats',
    searchBtn: 'Search Rides',
    ladiesOnly: 'Ladies-Only Rides',
    verifiedDrivers: '95%+ Verified Drivers',
    fairExpenseSplit: 'Fair Expense Split'
  },
  hi: {
    findRide: 'राइड खोजें',
    offerSeats: 'सीट ऑफर करें',
    myTrips: 'मेरी यात्राएं',
    trustScore: 'विश्वास स्कोर',
    safetyCenter: 'सुरक्षा केंद्र',
    stats: 'प्रभाव आंकड़े',
    leavingFrom: 'कहाँ से',
    goingTo: 'कहाँ जाना है',
    departureDate: 'यात्रा तिथि',
    seats: 'सीटें',
    searchBtn: 'राइड्स खोजें',
    ladiesOnly: 'महिला-विशेष राइड्स',
    verifiedDrivers: '95%+ सत्यापित ड्राइवर',
    fairExpenseSplit: 'समान लागत विभाजन'
  },
  mr: {
    findRide: 'राइड शोधा',
    offerSeats: 'सीट ऑफर करा',
    myTrips: 'माझ्या सहली',
    trustScore: 'विश्वास गुण',
    safetyCenter: 'सुरक्षा केंद्र',
    stats: 'प्रभाव आकडेवारी',
    leavingFrom: 'कुठून',
    goingTo: 'कुठे जायचे',
    departureDate: 'प्रवास तारीख',
    seats: 'जागा',
    searchBtn: 'राइड्स शोधा',
    ladiesOnly: 'महिला-विशेष राइड्स',
    verifiedDrivers: '95%+ पडताळलेले ड्रायव्हर',
    fairExpenseSplit: 'पारदर्शक खर्च वाटप'
  }
};

interface LanguageState {
  currentLang: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: Translations;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  currentLang: 'en',
  setLanguage: (lang) => set({ currentLang: lang, t: DICTIONARY[lang] }),
  t: DICTIONARY['en']
}));
