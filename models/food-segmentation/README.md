
# NutriGO Food Segmentation Model

## Model
YOLO11n-seg exported to ONNX.

## Input
- Shape: 1 × 3 × 640 × 640
- Format: RGB
- Normalisation: pixel values divided by 255

## Outputs
- Detection output: 1 × 56 × 8400
- Segmentation prototypes: 1 × 32 × 160 × 160

## Status
Initial ONNX inference has been tested in Google Colab.
Browser integration is pending.
