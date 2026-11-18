
/**
 * NutriGO Individual Object Masks
 *
 * Converts model mask probabilities into
 * separate binary masks for each detection.
 */

export function createBinaryMask(
  maskProbabilities,
  width,
  height,
  threshold = 0.5
) {
  if (
    !maskProbabilities ||
    maskProbabilities.length !== width * height ||
    width <= 0 ||
    height <= 0
  ) {
    throw new Error("Invalid mask probabilities.");
  }

  const binaryMask = new Uint8Array(width * height);

  for (let i = 0; i < maskProbabilities.length; i++) {
    binaryMask[i] =
      maskProbabilities[i] >= threshold ? 1 : 0;
  }

  return binaryMask;
}

export function countMaskPixels(binaryMask) {
  if (!binaryMask) {
    throw new Error("Invalid binary mask.");
  }

  let count = 0;

  for (const pixel of binaryMask) {
    if (pixel === 1) count++;
  }

  return count;
}

export function createObjectMaskRecord(
  detection,
  maskProbabilities,
  width,
  height,
  threshold = 0.5
) {
  const binaryMask = createBinaryMask(
    maskProbabilities,
    width,
    height,
    threshold
  );

  return {
    className: detection.className,
    confidence: detection.confidence,
    mask: binaryMask,
    maskWidth: width,
    maskHeight: height,
    maskPixelCount: countMaskPixels(binaryMask)
  };
}

