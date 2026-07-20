// AbhiRide Fair Expense & Cost-Splitting Engine

export interface CostCalculationParams {
  distanceKm: number;
  fuelType: 'Petrol' | 'Diesel' | 'CNG' | 'Electric';
  mileageKmpl: number; // e.g. 15 km/l or km/kWh
  totalSeats: number; // Driver + available seats
  tollCost?: number;
}

export interface CostCalculationResult {
  fuelPricePerUnit: number;
  totalFuelCost: number;
  totalTollCost: number;
  totalTripExpense: number;
  fairSeatPrice: number;
  savingsVsTaxi: number;
  co2SavedKg: number;
}

// Current average fuel prices in INR
const FUEL_PRICES = {
  Petrol: 102.50,
  Diesel: 89.80,
  CNG: 76.50,
  Electric: 15.00 // cost per kWh equivalent
};

/**
 * Calculates fair expense recovery cost without driver profit.
 */
export function calculateFairRideExpense(params: CostCalculationParams): CostCalculationResult {
  const { distanceKm, fuelType, mileageKmpl, totalSeats, tollCost = 0 } = params;
  
  const fuelPricePerUnit = FUEL_PRICES[fuelType] || 100;
  const effectiveMileage = Math.max(mileageKmpl, 5); // Avoid div by zero
  
  const unitsConsumed = distanceKm / effectiveMileage;
  const totalFuelCost = Math.round(unitsConsumed * fuelPricePerUnit);
  const totalTollCost = Math.round(tollCost);
  const totalTripExpense = totalFuelCost + totalTollCost;
  
  // Fair split among passengers + driver
  // e.g. Driver seat is included in expense division so driver pays their fair share too
  const validSeats = Math.max(totalSeats, 2);
  const fairSeatPrice = Math.round(totalTripExpense / validSeats);
  
  // Benchmark taxi comparison (avg 18 INR/km + toll)
  const taxiEstimatedCost = Math.round(distanceKm * 18 + totalTollCost);
  const savingsVsTaxi = Math.max(0, taxiEstimatedCost - fairSeatPrice);
  
  // CO2 reduction (approx 0.12 kg CO2 per km saved per passenger sharing car)
  const co2SavedKg = Math.round((distanceKm * 0.12 * (validSeats - 1)) * 10) / 10;
  
  return {
    fuelPricePerUnit,
    totalFuelCost,
    totalTollCost,
    totalTripExpense,
    fairSeatPrice,
    savingsVsTaxi,
    co2SavedKg
  };
}
