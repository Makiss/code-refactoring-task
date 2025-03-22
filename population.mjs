import { round } from "./number.mjs";

function calculateDensityPercentage(density, maxDensity) {
  return round(calculatePercentage(density, maxDensity));
}

function calculatePercentage(dividend, divisor) {
  return (dividend * 100) / divisor;
}

export { calculateDensityPercentage };
