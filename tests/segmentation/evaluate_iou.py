
import argparse
import json
from pathlib import Path

import numpy as np
from PIL import Image


def load_mask(path):
    image = Image.open(path)

    # The AI prediction is a transparent PNG.
    if image.mode == "RGBA":
        array = np.array(image)
        mask = array[:, :, 3] > 0

    # The reference mask is black and white.
    else:
        array = np.array(image.convert("L"))
        mask = array > 127

    return mask


def evaluate(prediction_path, reference_path):
    predicted = load_mask(prediction_path)
    reference = load_mask(reference_path)

    if predicted.shape != reference.shape:
        raise ValueError(
            f"Mask dimensions differ: "
            f"{predicted.shape} vs {reference.shape}"
        )

    true_positive = int(np.logical_and(
        predicted, reference
    ).sum())

    false_positive = int(np.logical_and(
        predicted, ~reference
    ).sum())

    false_negative = int(np.logical_and(
        ~predicted, reference
    ).sum())

    union = true_positive + false_positive + false_negative

    iou = true_positive / union if union else 1.0

    precision_denominator = true_positive + false_positive
    recall_denominator = true_positive + false_negative

    precision = (
        true_positive / precision_denominator
        if precision_denominator else 0.0
    )

    recall = (
        true_positive / recall_denominator
        if recall_denominator else 0.0
    )

    dice_denominator = (
        2 * true_positive + false_positive + false_negative
    )

    dice = (
        2 * true_positive / dice_denominator
        if dice_denominator else 1.0
    )

    results = {
        "true_positive": true_positive,
        "false_positive": false_positive,
        "false_negative": false_negative,
        "iou": round(iou, 4),
        "iou_percent": round(iou * 100, 2),
        "precision_percent": round(precision * 100, 2),
        "recall_percent": round(recall * 100, 2),
        "dice_percent": round(dice * 100, 2),
    }

    print("\nNUTRIGO SEGMENTATION EVALUATION")
    print("--------------------------------")
    for key, value in results.items():
        print(f"{key}: {value}")

    Path("iou_results.json").write_text(
        json.dumps(results, indent=4)
    )

    print("\nResults saved to iou_results.json")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument("--pred", required=True)
    parser.add_argument("--ref", required=True)

    args = parser.parse_args()

    evaluate(args.pred, args.ref)
