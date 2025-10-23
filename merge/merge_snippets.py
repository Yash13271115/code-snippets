# Python script to find JSON snippet files in the 'laravel' and 'nextjs' folders,
# parse the JSON content which includes a "File" key for the target name (skipping comment lines),
# copy the parsed JSON data excluding the "File" key to the target file in the root directory
# Save this as merge_snippets.py and run it with: python merge_snippets.py

import os
import json

# Set the paths to the folders (adjust if they're not in the current directory)
folders = ['./laravel', './nextjs']

# Check each folder and process JSON files
total_json_files = 0
for folder_path in folders:
    if os.path.exists(folder_path):
        # Find all .json files recursively
        json_files = []
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                if file.endswith('.json'):
                    json_files.append(os.path.join(root, file))
        
        # Display the results for this folder
        if json_files:
            print(f"Found {len(json_files)} JSON files in '{folder_path}':")
            total_json_files += len(json_files)
            for file_path in json_files:
                file_name = os.path.basename(file_path)
                print(f"\nProcessing '{file_name}' from '{folder_path}':")
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
                    
                    # Write the snippet JSON to the target file in root
                    target_path = os.path.join('.', target_name)
                    with open(target_path, 'w', encoding='utf-8') as f:
                        json.dump(snippet_data, f, indent=4)
                    
                    print(f"Successfully copied snippet JSON data to root '{target_name}'.")
                    
                except json.JSONDecodeError as e:
                    print(f"Error parsing JSON in '{file_name}': {e}")
                except Exception as e:
                    print(f"Unexpected error processing '{file_name}': {e}")
        else:
            print(f"No JSON files found in '{folder_path}'.")
    else:
        print(f"The '{folder_path}' folder does not exist at the specified path.")

if total_json_files == 0:
    print("No JSON files found in any of the specified folders.")