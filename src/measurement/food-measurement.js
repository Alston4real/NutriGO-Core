
import { calculateMass } from "./mass.js";
import { getFoodDensity } from "./density-database.js";
import { getFoodNutrition } from "../nutrition/food-database.js";
import { calculateNutrition } from "../nutrition/nutrition.js";

/**
 * Complete NutriGO food measurement pipeline.
 *
 * Input: food name and estimated volume in cm³.
 * Output: estimated mass and nutritional values.
 */

export function measureFood(foodName, volumeCm3) {
  if (!Number.isFinite(volumeCm3) || volumeCm3 <= 0) {
    throw new Error("Food volume must be greater than zero.");
  }

  const density = getFoodDensity(foodName);

  const massGrams = calculateMass(
    volumeCm3,
    density
  );

  const nutritionPer100g = getFoodNutrition(foodName);

  const nutrition = calculateNutrition(
    massGrams,
    nutritionPer100g
  );

  return {
    food: foodName,
    volumeCm3,
    densityGPerCm3: density,
    estimatedMassGrams: Number(massGrams.toFixed(2)),
    estimatedNutrition: nutrition
  };
}

