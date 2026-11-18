
/**
 * NutriGO Mass Estimation
 * Estimates food mass using volume and food density.
 *
 * Volume: cm³
 * Density: g/cm³
 * Mass: grams
 */

export function calculateMass(volumeCm3, densityGPerCm3) {
  if (
    !Number.isFinite(volumeCm3) ||
    !Number.isFinite(densityGPerCm3) ||
    volumeCm3 < 0 ||
    densityGPerCm3 <= 0
  ) {
    throw new Error("Invalid volume or food density.");
  }

  return volumeCm3 * densityGPerCm3;
}
