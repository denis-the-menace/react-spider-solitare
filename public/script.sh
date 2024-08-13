#!/bin/bash

# Directory containing the images
input_dir="cards"
output_dir="cards_out"

mkdir -p "$output_dir"

for img in "$input_dir"/*.{jpg,png}; do
   waifu2x-ncnn-vulkan -i "$img" -o "$output_dir/$(basename "$img")" -s 2 -n 0
done
