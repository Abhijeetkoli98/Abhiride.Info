// AbhiRide AI Engine: Passenger-Driver Matching, Route Optimization & Fraud Detection

export interface PassengerPreferences {
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  desiredTime: string; // ISO string
  ladiesOnly?: boolean;
  maxPrice?: number;
  minDriverTrustScore?: number;
}

export interface RideCandidate {
  id: string;
  driverName: string;
  driverTrustScore: number;
  originLat: number;
  originLng: number;
  destinationLat: number;
  destinationLng: number;
  departureTime: string;
  seatPrice: number;
  availableSeats: number;
  rules: string[];
}

export interface MatchScoreResult {
  rideId: string;
  matchScore: number; // 0 to 100%
  detourMinutesEstimate: number;
  matchReasons: string[];
}

// Distance helper (Haversine formula in KM)
export function calculateHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

/**
 * AI Score calculation combining route proximity, departure timing match, trust score, and price optimization.
 */
export function rankRidesForPassenger(
  pref: PassengerPreferences,
  rides: RideCandidate[]
): MatchScoreResult[] {
  return rides
    .map((ride) => {
      let score = 100;
      const matchReasons: string[] = [];

      // 1. Pickup Proximity (0-5 km ideal)
      const pickupDistance = calculateHaversineDistance(pref.originLat, pref.originLng, ride.originLat, ride.originLng);
      if (pickupDistance > 15) {
        score -= 40;
      } else if (pickupDistance <= 3) {
        matchReasons.push('Pickup within 3 km of your location');
      } else {
        score -= pickupDistance * 2;
      }

      // 2. Dropoff Proximity
      const dropDistance = calculateHaversineDistance(pref.destinationLat, pref.destinationLng, ride.destinationLat, ride.destinationLng);
      if (dropDistance > 15) {
        score -= 30;
      } else if (dropDistance <= 3) {
        matchReasons.push('Dropoff near destination');
      }

      // 3. Timing Offset (Minutes difference)
      const prefTime = new Date(pref.desiredTime).getTime();
      const rideTime = new Date(ride.departureTime).getTime();
      const diffMinutes = Math.abs(prefTime - rideTime) / (1000 * 60);

      if (diffMinutes <= 30) {
        matchReasons.push('Perfect departure time alignment');
      } else if (diffMinutes > 120) {
        score -= 25;
      }

      // 4. Trust Score Boost
      if (ride.driverTrustScore >= 90) {
        score += 10;
        matchReasons.push(`Top-rated driver (${ride.driverTrustScore}% Trust Score)`);
      }

      // 5. Women-only filter
      if (pref.ladiesOnly && !ride.rules.includes('Women Only') && !ride.rules.includes('Ladies Preferred')) {
        score -= 50;
      }

      const finalScore = Math.min(99, Math.max(15, Math.round(score)));
      const estimatedDetour = Math.round(pickupDistance * 2.5 + dropDistance * 2.5);

      return {
        rideId: ride.id,
        matchScore: finalScore,
        detourMinutesEstimate: estimatedDetour,
        matchReasons
      };
    })
    .sort((a, b) => b.matchScore - a.matchScore);
}

/**
 * AI Fraud Detection Heuristic
 */
export function evaluateFraudRisk(ride: {
  seatPrice: number;
  totalDistanceKm: number;
  totalSeats: number;
}): { isFlagged: boolean; riskScore: number; reason?: string } {
  // Profit-making trigger: if driver charges > 2x estimated fuel cost
  const estimatedCostPerKm = 8.0; // average maximum reasonable fare per km
  const totalCharged = ride.seatPrice * ride.totalSeats;
  const maxAllowed = ride.totalDistanceKm * estimatedCostPerKm;

  if (totalCharged > maxAllowed * 2) {
    return {
      isFlagged: true,
      riskScore: 85,
      reason: 'Potential commercial taxi activity detected. Price exceeds fair cost-sharing threshold.'
    };
  }

  return { isFlagged: false, riskScore: 5 };
}
