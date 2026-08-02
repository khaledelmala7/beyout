import os
import shutil

src_root = r"d:\Ai\social"
beyout_dir = os.path.join(src_root, "beyout")
vexora_dir = os.path.join(src_root, "vexora")

# Create directories
os.makedirs(beyout_dir, exist_ok=True)
os.makedirs(vexora_dir, exist_ok=True)
os.makedirs(os.path.join(beyout_dir, "assets"), exist_ok=True)
os.makedirs(os.path.join(vexora_dir, "assets"), exist_ok=True)

# Copy files for Beyout
shutil.copy(os.path.join(src_root, "index.html"), os.path.join(beyout_dir, "index.html"))
shutil.copy(os.path.join(src_root, "style.css"), os.path.join(beyout_dir, "style.css"))
shutil.copy(os.path.join(src_root, "app.js"), os.path.join(beyout_dir, "app.js"))
shutil.copy(os.path.join(src_root, "logo_beyout.png"), os.path.join(beyout_dir, "logo_beyout.png"))

# Copy files for Vexora (rename vexora.html to index.html)
shutil.copy(os.path.join(src_root, "vexora.html"), os.path.join(vexora_dir, "index.html"))
shutil.copy(os.path.join(src_root, "style.css"), os.path.join(vexora_dir, "style.css"))
shutil.copy(os.path.join(src_root, "app.js"), os.path.join(vexora_dir, "app.js"))
shutil.copy(os.path.join(src_root, "logo_vexora.png"), os.path.join(vexora_dir, "logo_vexora.png"))

# Copy assets
assets_src = os.path.join(src_root, "assets")
for f in os.listdir(assets_src):
    src_f = os.path.join(assets_src, f)
    if os.path.isfile(src_f):
        # If it's a Beyout asset, copy to beyout/assets
        if "beyout_day" in f or "day7_beyout" in f or f == "logo_beyout.png":
            shutil.copy(src_f, os.path.join(beyout_dir, "assets", f))
        # If it's a Vexora asset, copy to vexora/assets
        elif "vexora_day" in f or "day6_vexora" in f or f == "logo_vexora.png":
            shutil.copy(src_f, os.path.join(vexora_dir, "assets", f))
        # Otherwise, copy to both for safety
        else:
            shutil.copy(src_f, os.path.join(beyout_dir, "assets", f))
            shutil.copy(src_f, os.path.join(vexora_dir, "assets", f))

print("Vercel folder structure initialized successfully!")
