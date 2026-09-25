import os

directory = r"d:\WebProject Folder\StudyIndia"
changed_files = []

for filename in os.listdir(directory):
    if filename.endswith(".html"):
        filepath = os.path.join(directory, filename)
        with open(filepath, "r", encoding="utf-8") as f:
            content = f.read()
        
        # Skip if dns-prefetch tags are already present
        if "dns-prefetch" in content:
            continue
            
        modified = False
        
        # Scenario 1: Page has preconnect pair
        pair_to_find = '<link rel="preconnect" href="https://fonts.googleapis.com">\n    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        # Also handle potential direct/no-indent variant
        pair_to_find_alt = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
        
        # Replacement markup
        replacement = (
            '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
            '    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
            '    <link class="prefetch-tag" rel="dns-prefetch" href="https://fonts.googleapis.com">\n'
            '    <link class="prefetch-tag" rel="dns-prefetch" href="https://cdnjs.cloudflare.com">'
        )
        
        # Normalized replacement matching indentation
        if pair_to_find in content:
            content = content.replace(pair_to_find, replacement)
            modified = True
        elif pair_to_find_alt in content:
            content = content.replace(pair_to_find_alt, replacement)
            modified = True
        elif '<link rel="preconnect" href="https://fonts.googleapis.com">' in content:
            content = content.replace(
                '<link rel="preconnect" href="https://fonts.googleapis.com">',
                replacement
            )
            modified = True
        elif 'href="https://fonts.googleapis.com/css2' in content:
            # Scenario 2: Page does not have preconnect but has Google Font stylesheet link (like landing pages)
            # Find the Google Font stylesheet tag and prepend preconnect/prefetch links
            font_link = None
            for line in content.split("\n"):
                if 'href="https://fonts.googleapis.com/css2' in line:
                    font_link = line
                    break
            
            if font_link:
                indent = len(font_link) - len(font_link.lstrip())
                prefix = " " * indent
                preconnect_block = (
                    f'{prefix}<link rel="preconnect" href="https://fonts.googleapis.com">\n'
                    f'{prefix}<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
                    f'{prefix}<link class="prefetch-tag" rel="dns-prefetch" href="https://fonts.googleapis.com">\n'
                    f'{prefix}<link class="prefetch-tag" rel="dns-prefetch" href="https://cdnjs.cloudflare.com">\n'
                )
                content = content.replace(font_link, preconnect_block + font_link)
                modified = True
        
        if modified:
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            changed_files.append(filename)

print(f"Successfully updated headers in {len(changed_files)} files:")
for f in changed_files:
    print(f" - {f}")
