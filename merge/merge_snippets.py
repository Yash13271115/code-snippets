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
origin_map = defaultdict(dict)   # NEW: track which file provided which snippet key
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

                # (1) detect duplicates inside same file
                if detect_duplicates_in_same_file(data, file_path):
                    errors_found = True
                    continue

                # (2) validate & normalize "File"
                target_name = data.get("File")
                if not target_name:
                    errors_found = True
                    print(f"ERROR: Missing 'File' key in {file_path}")
                    continue

                target_name = target_name.strip()

                # remove File key
                snippet_data = {k: v for k, v in data.items() if k != "File"}

                # (3) detect duplicates across files for same target
                for key in snippet_data:
                    if key in merged_targets[target_name]:
                        original_file = origin_map[target_name].get(key, "Unknown file")
                        print(f"ERROR: Duplicate snippet key '{key}' found in:")
                        print(f"   → {original_file}")
                        print(f"   → {file_path}")
                        errors_found = True
                        break
                else:
                    # no duplicates → merge
                    merged_targets[target_name].update(snippet_data)

                    # track origin
                    for key in snippet_data:
                        origin_map[target_name][key] = file_path

            except json.JSONDecodeError as e:
                errors_found = True
                print(f"ERROR: JSON decode error in {file_path}: {e}")

            except Exception as e:
                errors_found = True
                print(f"ERROR: Unexpected error in {file_path}: {e}")

# Write merged output files
if not errors_found:
    for target_name, merged_data in merged_targets.items():
        target_path = os.path.join('.', target_name)
        try:
            with open(target_path, 'w', encoding='utf-8') as f:
                json.dump(merged_data, f, indent=4)
        except Exception as e:
            errors_found = True
            print(f"ERROR: Failed to write {target_path}: {e}")

# Final message
if not errors_found and total_json_files > 0:
    print("SUCCESS: All snippet files processed and merged successfully.")
elif total_json_files == 0:
    print("ERROR: No JSON snippet files found in techstack.")
