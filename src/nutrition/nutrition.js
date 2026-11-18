
/**
 * NutriGO Nutrition Calculator
 *
 * Calculates nutritional values from:
 * 1. Estimated food mass in grams
 * 2. Verified nutritional values per 100g
 */

export function calculateNutrition(
  massGrams,
  nutritionPer100g
) {
  if (
    !Number.isFinite(massGrams) ||
    massGrams < 0 ||
    !nutritionPer100g ||
    typeof nutritionPer100g !== "object"
  ) {
    throw new Error("Invalid nutrition input.");
  }

  const result = {};

  for (const [nutrient, value] of Object.entries(nutritionPer100g)) {
    if (!Number.isFinite(value) || value < 0) {
      throw new Error(`Invalid value for ${nutrient}.`);
    }

    result[nutrient] = Number(
      (value * massGrams / 100).toFixed(2)
    );
  }

  return result;
}
