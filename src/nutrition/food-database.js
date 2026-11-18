
/**
 * NutriGO Food Nutrition Database
 * Values per 100g.
 *
 * Initial prototype values only.
 * Replace with verified food-composition data
 * before making real nutritional claims.
 */

export const FOOD_DATABASE = {
  rice_cooked: {
    calories: 130,
    protein: 2.7,
    carbohydrates: 28.2,
    fat: 0.3,
    fibre: 0.4
  },

  chicken_cooked: {
    calories: 165,
    protein: 31,
    carbohydrates: 0,
    fat: 3.6,
    fibre: 0
  },

  egg_cooked: {
    calories: 155,
    protein: 13,
    carbohydrates: 1.1,
    fat: 11,
    fibre: 0
  },

  cucumber: {
    calories: 15,
    protein: 0.7,
    carbohydrates: 3.6,
    fat: 0.1,
    fibre: 0.5
  },

  tomato: {
    calories: 18,
    protein: 0.9,
    carbohydrates: 3.9,
    fat: 0.2,
    fibre: 1.2
  },

  broccoli: {
    calories: 34,
    protein: 2.8,
    carbohydrates: 6.6,
    fat: 0.4,
    fibre: 2.6
  },

  potato_cooked: {
    calories: 87,
    protein: 1.9,
    carbohydrates: 20.1,
    fat: 0.1,
    fibre: 1.8
  },

  shrimp_cooked: {
    calories: 99,
    protein: 24,
    carbohydrates: 0.2,
    fat: 0.3,
    fibre: 0
  }
};

export function getFoodNutrition(foodName) {
  const nutrition = FOOD_DATABASE[foodName];

  if (!nutrition) {
    throw new Error(
      `Nutrition data not found for: ${foodName}`
    );
  }

  return nutrition;
}
