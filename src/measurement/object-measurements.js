
/**
 * NutriGO Individual Object Measurements
 *
 * Stores measurements separately for each
 * detected food object.
 */

/**
 * Calculate the bounding-box dimensions.
 */
export function calculateObjectDimensions(detection) {
  if (
    !detection ||
    !Number.isFinite(detection.x) ||
    !Number.isFinite(detection.y) ||
    !Number.isFinite(detection.width) ||
    !Number.isFinite(detection.height) ||
    detection.width <= 0 ||
    detection.height <= 0
  ) {
    throw new Error("Invalid detection dimensions.");
  }

  return {
    widthPixels: detection.width,
    heightPixels: detection.height,
    boundingBoxAreaPixels:
      detection.width * detection.height
  };
}

/**
 * Count pixels belonging to an individual binary mask.
 *
 * maskData should contain one value per pixel:
 * 0 = background
 * 1 = food
 */
export function calculateMaskArea(maskData, width, height) {
  if (
    !maskData ||
    maskData.length !== width * height ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error("Invalid segmentation mask.");
  }

  let foodPixels = 0;

  for (const pixel of maskData) {
    if (pixel === 1) {
      foodPixels++;
    }
  }

  return {
    maskPixelCount: foodPixels,
    coveragePercent:
      (foodPixels / (width * height)) * 100
  };
}

/**
 * Create a measurement record for one food item.
 */
export function createObjectMeasurement(
  detection,
  maskData,
  maskWidth,
  maskHeight
) {
  const dimensions = calculateObjectDimensions(detection);

  const maskArea = calculateMaskArea(
    maskData,
    maskWidth,
    maskHeight
  );

  return {
    food: detection.className,
    confidence: detection.confidence,
    dimensions,
    maskArea
  };
}

