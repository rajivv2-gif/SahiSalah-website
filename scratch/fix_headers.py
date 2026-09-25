import os

directory = r"d:\WebProject Folder\StudyIndia"
fixed_files = []

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        bad_tag = 'href="https://cdnjs.cloudflare.com>'
        good_tag = 'href="https://cdnjs.cloudflare.com">'
        
        if bad_tag in content:
            content = content.replace(bad_tag, good_tag)
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            fixed_files.append(filename)

print(f"Fixed {len(fixed_files)} files.")
