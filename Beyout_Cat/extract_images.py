import fitz
import os

pdf_path = "Home Sense New Price List & Device Specifications May-2026.pdf"
out_dir = "catalog_images"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

# To find logos, we can keep track of image hashes or sizes
image_counts = {}
for i in range(len(doc)):
    for img in doc.get_page_images(i):
        xref = img[0]
        image_counts[xref] = image_counts.get(xref, 0) + 1

# If an image appears on more than 5 pages, it's probably a logo or background
logo_xrefs = {xref for xref, count in image_counts.items() if count > 5}

for i in range(2, len(doc)): # start from page 3 (index 2)
    page = doc[i]
    images = doc.get_page_images(i)
    
    product_images = []
    for img in images:
        xref = img[0]
        if xref not in logo_xrefs:
            # Extract image
            base_image = doc.extract_image(xref)
            image_bytes = base_image["image"]
            ext = base_image["ext"]
            # Filter out very small images
            if len(image_bytes) > 5000: # larger than 5KB
                product_images.append((xref, image_bytes, ext))
    
    # Save the product images
    for j, (xref, image_bytes, ext) in enumerate(product_images):
        img_filename = f"page_{i+1}_img_{j+1}.{ext}"
        with open(os.path.join(out_dir, img_filename), "wb") as f:
            f.write(image_bytes)
        print(f"Saved {img_filename}")

print("Done extracting images.")
