
/**
 * NutriGO Food Density Database
 * Initial approximate density values.
 * Units: g/cm³
 *
 * These are prototype estimates, not verified
 * laboratory measurements.
 */

export const FOOD_DENSITY = {
  rice_cooked: 0.80,
  chicken_cooked: 1.05,
  chicken_raw: 1.04,
  fish_cooked: 1.03,
  egg_cooked: 1.03,
  cucumber: 0.96,
  tomato: 0.95,
  carrot: 1.04,
  potato_cooked: 1.08,
  broccoli: 0.95,
  lettuce: 0.25,
  bread: 0.25,
  noodles_cooked: 0.75,
  shrimp_cooked: 1.05,
  sausage: 1.00
};

export function getFoodDensity(foodName) {
  const density = FOOD_DENSITY[foodName];

  if (density === undefined) {
    throw new Error(
      `No density value found for: ${foodName}`
    );
  }

  return density;
}
