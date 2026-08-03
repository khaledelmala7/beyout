import fitz

doc = fitz.open('Home Sense New Price List & Device Specifications May-2026.pdf')
for p in [3, 9, 12, 15, 26, 42, 61, 82]:
    print(f"=== PAGE {p} ===")
    page = doc[p-1]
    blocks = page.get_text('dict')['blocks']
    for b in blocks:
        if 'lines' in b:
            for l in b['lines']:
                for s in l['spans']:
                    txt = s['text'].strip()
                    if txt:
                        font_name = s['font']
                        size = s['size']
                        bbox = [round(x,1) for x in s['bbox']]
                        print(f"Size: {size:.1f} | Font: {font_name} | Y: {bbox[1]} | Text: {txt}")
