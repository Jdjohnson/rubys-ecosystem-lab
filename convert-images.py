#!/usr/bin/env python3
"""Move generated PNGs to correct directories and convert to WebP."""

import os
import shutil
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).parent

# Organism IDs (from organisms.ts)
ORGANISMS = [
    'white-oak', 'big-bluestem', 'algae', 'cattail', 'black-eyed-susan',
    'eastern-cottontail', 'field-mouse', 'white-tailed-deer', 'grasshopper',
    'mayfly', 'minnow', 'crayfish', 'red-tailed-hawk', 'coyote', 'copperhead',
    'largemouth-bass', 'bullfrog', 'garden-spider', 'green-darner',
    'great-blue-heron', 'great-horned-owl', 'raccoon', 'box-turtle',
    'turkey-vulture', 'shelf-fungus', 'earthworm',
]

# Abiotic factor IDs
ABIOTIC = [
    'sunlight', 'water', 'air', 'soil', 'rocks', 'temperature',
    'rain', 'wind', 'oxygen-in-water', 'mud',
]

# Scene IDs
SCENES = ['woods', 'pond-creek', 'field-prairie', 'hero']

def convert_png_to_webp(src: Path, dst: Path, quality: int = 85):
    """Convert a PNG to WebP."""
    img = Image.open(src)
    img.save(dst, 'webp', quality=quality)
    print(f"  {src.name} -> {dst.name} ({dst.stat().st_size // 1024}KB)")

def process_group(ids: list, dest_dir: Path, quality: int = 85):
    """Move PNGs from root to dest_dir and convert to WebP."""
    dest_dir.mkdir(parents=True, exist_ok=True)
    converted = 0
    missing = []

    for item_id in ids:
        png_path = ROOT / f"{item_id}.png"
        if not png_path.exists():
            missing.append(item_id)
            continue

        webp_path = dest_dir / f"{item_id}.webp"
        convert_png_to_webp(png_path, webp_path, quality)
        png_path.unlink()  # Remove source PNG
        converted += 1

    return converted, missing

def main():
    print("Converting organism images...")
    org_dir = ROOT / "public" / "images" / "organisms"
    converted, missing = process_group(ORGANISMS + ABIOTIC, org_dir)
    print(f"  {converted} converted, {len(missing)} missing: {missing}")

    print("\nConverting scene images...")
    scene_dir = ROOT / "public" / "images" / "scenes"
    converted, missing = process_group(SCENES, scene_dir, quality=90)
    print(f"  {converted} converted, {len(missing)} missing: {missing}")

    print("\nDone!")

if __name__ == "__main__":
    main()
