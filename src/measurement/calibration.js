
/**
 * NutriGO Camera Calibration
 * Converts image pixel measurements into real-world dimensions.
 */

export function calculatePixelScale(referencePixels, realWorldMm) {
  if (referencePixels <= 0 || realWorldMm <= 0) {
    throw new Error("Measurements must be greater than zero.");
  }

  return realWorldMm / referencePixels;
}

export function pixelsToMillimetres(pixels, scaleMmPerPixel) {
  if (pixels < 0 || scaleMmPerPixel <= 0) {
    throw new Error("Invalid pixel measurement or scale.");
  }

  return pixels * scaleMmPerPixel;
}

export function calculateReferenceScale(
  referenceWidthPixels,
  referenceHeightPixels,
  realWidthMm,
  realHeightMm
) {
  return {
    horizontal: calculatePixelScale(
      referenceWidthPixels,
      realWidthMm
    ),
    vertical: calculatePixelScale(
      referenceHeightPixels,
      realHeightMm
    )
  };
}

export function calculateAreaCm2(
  maskPixelCount,
  scaleMmPerPixel
) {
  if (maskPixelCount < 0 || scaleMmPerPixel <= 0) {
    throw new Error("Invalid area measurements.");
  }

  const areaMm2 =
    maskPixelCount * scaleMmPerPixel ** 2;

  return areaMm2 / 100;
}
/**
 * Convert segmentation mask pixels into
 * equivalent pixels in the model input image.
 */
export function convertMaskAreaToImagePixels(
  maskPixelCount,
  maskWidth,
  maskHeight,
  imageWidth,
  imageHeight
) {
  if (
    !Number.isFinite(maskPixelCount) ||
    !Number.isFinite(maskWidth) ||
    !Number.isFinite(maskHeight) ||
    !Number.isFinite(imageWidth) ||
    !Number.isFinite(imageHeight) ||
    maskPixelCount < 0 ||
    maskWidth <= 0 ||
    maskHeight <= 0 ||
    imageWidth <= 0 ||
    imageHeight <= 0
  ) {
    throw new Error("Invalid mask or image dimensions.");
  }

  return maskPixelCount *
    (imageWidth / maskWidth) *
    (imageHeight / maskHeight);
}
