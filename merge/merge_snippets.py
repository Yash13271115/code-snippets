# Python script to find JSON snippet files in the 'laravel' and 'nextjs' folders,
# parse the JSON content which includes a "File" key for the target name (skipping comment lines),
# copy the parsed JSON data excluding the "File" key to the target file in the root directory
# Save this as merge_snippets.py and run it with: python merge_snippets.py

import os
import json
from collections import defaultdict

# Set the path to the techstack folder
techstack_path = './techstack'

# Dynamically find all subfolders in techstack
if os.path.exists(techstack_path):
    subfolders = [os.path.join(techstack_path, d) for d in os.listdir(techstack_path) if os.path.isdir(os.path.join(techstack_path, d))]
else:
    subfolders = []
    print(f"The '{techstack_path}' folder does not exist at the specified path.")

# Dictionary to hold merged data for each target
merged_targets = defaultdict(dict)

# Check each subfolder and process JSON files
total_json_files = 0
for folder_path in subfolders:
    folder_name = os.path.basename(folder_path)
    # Find all .json files recursively
    json_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.json'):
                json_files.append(os.path.join(root, file))
    
    # Display the results for this folder
    if json_files:
        print(f"Found {len(json_files)} JSON files in '{folder_name}' ('{folder_path}'):")
        total_json_files += len(json_files)
        for file_path in json_files:
            file_name = os.path.basename(file_path)
            print(f"\nProcessing '{file_name}' from '{folder_name}':")
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()
                
                # Filter out comment lines (lines that start with // after lstrip)
                cleaned_lines = [line for line in lines if not line.lstrip().startswith('//')]
                json_str = ''.join(cleaned_lines)
                data = json.loads(json_str)
                
                # Extract target file name from "File" key
                target_name = data.get("File")
                if not target_name:
                    print("No 'File' key found in the JSON. Skipping.")
                    continue
                print(f"Extracted target file name from 'File' key: {target_name}")
                
                # Create a copy excluding the "File" key
                snippet_data = {k: v for k, v in data.items() if k != "File"}
                
                # Check for duplicates in the merged data for this target
                duplicates = set(snippet_data.keys()) & set(merged_targets[target_name].keys())
                if duplicates:
                    print(f"Error: Duplicate snippet keys found in '{target_name}': {', '.join(duplicates)}. Skipping this snippet.")
                    continue
                
                # Merge the snippet data into the target's dict
                merged_targets[target_name].update(snippet_data)
                print(f"Successfully added snippet JSON data to merged '{target_name}'.")
                
            except json.JSONDecodeError as e:
                print(f"Error parsing JSON in '{file_name}': {e}")
            except Exception as e:
                print(f"Unexpected error processing '{file_name}': {e}")
    else:
        print(f"No JSON files found in '{folder_name}'.")

# Write the merged data to target files in root
if merged_targets:
    print("\nWriting merged data to target files:")
    for target_name, merged_data in merged_targets.items():
        target_path = os.path.join('.', target_name)
        try:
            with open(target_path, 'w', encoding='utf-8') as f:
                json.dump(merged_data, f, indent=4)
            print(f"Successfully wrote merged JSON data to root '{target_name}'.")
        except Exception as e:
            print(f"Unexpected error writing '{target_name}': {e}")
else:
    print("No valid snippets to merge.")

if total_json_files == 0:
    print("No JSON files found in any of the subfolders in 'techstack'.")