# Python script to find JSON snippet files in the 'laravel' and 'nextjs' folders,
# parse the JSON content which includes a "File" key for the target name (skipping comment lines),
# copy the parsed JSON data excluding the "File" key to the target file in the root directory
# Save this as merge_snippets.py and run it with: python merge_snippets.py

import os
import json
from collections import defaultdict

techstack_path = './techstack'

# Locate subfolders
if os.path.exists(techstack_path):
    subfolders = [
        os.path.join(techstack_path, d)
        for d in os.listdir(techstack_path)
        if os.path.isdir(os.path.join(techstack_path, d))
    ]
else:
    subfolders = []
    print(f"ERROR: '{techstack_path}' folder does not exist.")

merged_targets = defaultdict(dict)
total_json_files = 0
errors_found = False

def detect_duplicates_in_same_file(data, file_path):
    keys = list(data.keys())
    seen = set()
    duplicates = []

    for k in keys:
        if k == "File":
            continue
        if k in seen:
            duplicates.append(k)
        seen.add(k)

    if duplicates:
        print(f"ERROR: Duplicate snippet keys inside file '{file_path}': {', '.join(duplicates)}")
        return True
    return False


for folder_path in subfolders:
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if not file.endswith('.json'):
                continue

            total_json_files += 1
            file_path = os.path.join(root, file)

            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    lines = f.readlines()

                # remove comment lines
                cleaned_lines = [
                    line for line in lines if not line.lstrip().startswith('//')
                ]
                data = json.loads(''.join(cleaned_lines))

                # detect duplicates *inside same file only*
                if detect_duplicates_in_same_file(data, file_path):
                    errors_found = True
                    continue

                # validate & normalize "File"
                target_name = data.get("File")
                if not target_name:
                    errors_found = True
                    print(f"ERROR: Missing 'File' key in {file_path}")
                    continue

                target_name = target_name.strip()

                # remove File key
                snippet_data = {k: v for k, v in data.items() if k != "File"}

                # merge without cross-file duplicate checking
                merged_targets[target_name].update(snippet_data)

            except json.JSONDecodeError as e:
                errors_found = True
                print(f"ERROR: JSON decode error in {file_path}: {e}")

            except Exception as e:
                errors_found = True
                print(f"ERROR: Unexpected error in {file_path}: {e}")

# Write merged output files
for target_name, merged_data in merged_targets.items():
    target_path = os.path.join('.', target_name)
    try:
        with open(target_path, 'w', encoding='utf-8') as f:
            json.dump(merged_data, f, indent=4)
    except Exception as e:
        errors_found = True
        print(f"ERROR: Failed to write {target_path}: {e}")

# Final success message
if not errors_found and total_json_files > 0:
    print("SUCCESS: All snippet files processed and merged successfully.")
elif total_json_files == 0:
    print("ERROR: No JSON snippet files found in techstack.")
