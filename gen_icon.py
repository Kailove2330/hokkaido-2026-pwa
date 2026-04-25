from PIL import Image, ImageDraw
import math

def gradient_image(size, c1, c2, corner_r):
    """Vertical gradient with rounded corners mask."""
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    for y in range(size):
        t = y / (size - 1)
        r = int(c1[0]*(1-t) + c2[0]*t)
        g = int(c1[1]*(1-t) + c2[1]*t)
        b = int(c1[2]*(1-t) + c2[2]*t)
        row = Image.new('RGBA', (size, 1), (r, g, b, 255))
        img.paste(row, (0, y))
    # Rounded corners mask
    mask = Image.new('L', (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, size-1, size-1], radius=corner_r, fill=255)
    img.putalpha(mask)
    return img

def make_icon(size):
    k = size / 512
    s = size

    # ── Warm gradient background: sunrise coral → amber ──────
    img = gradient_image(s, (255, 107, 86), (255, 185, 60), int(108*k))
    draw = ImageDraw.Draw(img)

    # ── Suitcase body ────────────────────────────────────────
    sx1 = int(88*k);  sx2 = s - int(88*k)
    sy1 = int(148*k); sy2 = s - int(82*k)
    sw  = sx2 - sx1
    sr  = int(32*k)

    # Soft shadow
    draw.rounded_rectangle(
        [sx1+int(8*k), sy1+int(8*k), sx2+int(8*k), sy2+int(8*k)],
        radius=sr, fill=(0, 0, 0, 55))
    # Body
    draw.rounded_rectangle([sx1, sy1, sx2, sy2], radius=sr, fill=(255, 252, 245))

    # ── Handle ───────────────────────────────────────────────
    hcx = s // 2
    hcy = sy1          # pivot at top of suitcase
    hw  = int(80*k)    # half-width of arc bounding box
    hrise = int(68*k)  # how high the handle rises
    ht  = int(16*k)    # stroke thickness
    # draw as thick arc
    draw.arc(
        [hcx - hw, hcy - hrise, hcx + hw, hcy + hrise],
        start=200, end=340,
        fill=(255, 252, 245), width=ht
    )

    # ── Horizontal stripe (band) ──────────────────────────────
    mid_y   = (sy1 + sy2) // 2
    band_h  = int(30*k)
    STRIPE  = (255, 107, 86, 200)   # warm coral, semi-transparent
    draw.rectangle([sx1+sr, mid_y - band_h//2, sx2-sr, mid_y + band_h//2], fill=STRIPE)
    # round the left/right ends of the stripe
    for ex in [sx1 + sr, sx2 - sr]:
        draw.ellipse([ex - band_h//2, mid_y - band_h//2,
                      ex + band_h//2, mid_y + band_h//2], fill=STRIPE)

    # ── Latch ─────────────────────────────────────────────────
    lx, ly = s//2, mid_y
    lw, lh = int(20*k), int(20*k)
    draw.rounded_rectangle([lx-lw, ly-lh, lx+lw, ly+lh],
                           radius=int(7*k), fill=(220, 210, 195))
    draw.rounded_rectangle([lx-int(11*k), ly-int(11*k), lx+int(11*k), ly+int(11*k)],
                           radius=int(4*k), fill=(195, 180, 160))

    # ── Wheels ────────────────────────────────────────────────
    wr = int(20*k)
    wy = sy2 + int(6*k)
    for wx in [sx1 + int(65*k), sx2 - int(65*k)]:
        draw.ellipse([wx-wr, wy-wr, wx+wr, wy+wr], fill=(240, 230, 215))
        draw.ellipse([wx-int(9*k), wy-int(9*k), wx+int(9*k), wy+int(9*k)],
                     fill=(180, 165, 145))

    # ── Small stars (travel sparkle) ─────────────────────────
    def star(cx, cy, r, color):
        for angle in range(0, 360, 72):
            a = math.radians(angle - 90)
            x1 = cx + r * math.cos(a)
            y1 = cy + r * math.sin(a)
            draw.ellipse([x1-int(r*0.3), y1-int(r*0.3),
                          x1+int(r*0.3), y1+int(r*0.3)], fill=color)
        draw.ellipse([cx-int(r*0.35), cy-int(r*0.35),
                      cx+int(r*0.35), cy+int(r*0.35)], fill=color)

    star(int(148*k), int(108*k), int(16*k), (255, 255, 255, 180))
    star(int(372*k), int(90*k),  int(11*k), (255, 255, 255, 140))
    star(int(400*k), int(130*k), int(7*k),  (255, 255, 255, 110))

    return img

import os
os.makedirs('icons', exist_ok=True)
for sz in [192, 512]:
    make_icon(sz).save(f'icons/icon-{sz}.png')
    print(f'[OK] icon-{sz}.png')
