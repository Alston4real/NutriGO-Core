/**
 * NutriGO Volume Estimation
 * Estimates food volume using simplified geometric models.
 */

// Ellipsoid: useful for chicken, fish and similar portions.
export function calculateEllipsoidVolume(
  lengthCm,
  widthCm,
  heightCm
) {
  if (lengthCm <= 0 || widthCm <= 0 || heightCm <= 0) {
    throw new Error("Dimensions must be greater than zero.");
  }

  return (
    (Math.PI / 6) *
    lengthCm *
    widthCm *
    heightCm
  );
}

// Elliptical mound: useful for rice and piled foods.
export function calculateMoundVolume(
  lengthCm,
  widthCm,
  heightCm
) {
  if (lengthCm <= 0 || widthCm <= 0 || heightCm <= 0) {
    throw new Error("Dimensions must be greater than zero.");
  }

  return (
    (Math.PI / 4) *
    lengthCm *
    widthCm *
    heightCm
  );
}

// Flat food: useful for sliced vegetables.
export function calculateFlatFoodVolume(
  areaCm2,
  thicknessCm
) {
  if (areaCm2 <= 0 || thicknessCm <= 0) {
    throw new Error("Area and thickness must be greater than zero.");
  }

  return areaCm2 * thicknessCm;
}
