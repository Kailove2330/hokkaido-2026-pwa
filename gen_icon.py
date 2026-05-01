from PIL import Image, ImageDraw
import math

def make_icon(size):
    k = size / 512
    s = size

    # ── Soft sky-blue background (rounded corners) ──────
    img = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    corner_r = int(108 * k)

    # Subtle vertical gradient: lighter top → slightly deeper bottom
    bg = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    for y in range(s):
        t = y / (s - 1)
        r_ = int(195 + (175 - 195) * t)
        g_ = int(225 + (210 - 225) * t)
        b_ = int(242 + (232 - 242) * t)
        bg_draw.line([(0, y), (s, y)], fill=(r_, g_, b_, 255))
    bg_mask = Image.new('L', (s, s), 0)
    ImageDraw.Draw(bg_mask).rounded_rectangle([0, 0, s-1, s-1], radius=corner_r, fill=255)
    img.paste(bg, mask=bg_mask)

    draw = ImageDraw.Draw(img)

    # Globe parameters
    gcx = int(248 * k)
    gcy = int(278 * k)
    gr  = int(183 * k)

    # ── Globe shadow ─────────────────────────────────────
    shadow = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    ImageDraw.Draw(shadow).ellipse(
        [gcx - gr + int(10*k), gcy - gr + int(10*k),
         gcx + gr + int(10*k), gcy + gr + int(10*k)],
        fill=(100, 155, 185, 55))
    img = Image.alpha_composite(img, shadow)
    draw = ImageDraw.Draw(img)

    # ── Globe base (ocean) on a separate layer ───────────
    globe_layer = Image.new('RGBA', (s, s), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(globe_layer)
    gdraw.ellipse([gcx-gr, gcy-gr, gcx+gr, gcy+gr], fill=(115, 185, 215, 255))

    # Subtle latitude/longitude grid
    for lat in range(-3, 4):
        y = gcy + int(lat * 55 * k)
        if abs(y - gcy) < gr:
            hw = int(math.sqrt(max(0, gr**2 - (y - gcy)**2)))
            gdraw.line([(gcx-hw, y), (gcx+hw, y)], fill=(85, 150, 190, 55), width=max(1, int(k)))
    for lon in range(-3, 4):
        x = gcx + int(lon * 55 * k)
        if abs(x - gcx) < gr:
            hh = int(math.sqrt(max(0, gr**2 - (x - gcx)**2)))
            gdraw.line([(x, gcy-hh), (x, gcy+hh)], fill=(85, 150, 190, 55), width=max(1, int(k)))

    # Land masses (soft green)
    lc = (142, 200, 158, 255)
    gdraw.ellipse([int(82*k),  int(168*k), int(186*k), int(262*k)], fill=lc)
    gdraw.ellipse([int(100*k), int(248*k), int(192*k), int(360*k)], fill=lc)
    gdraw.ellipse([int(268*k), int(128*k), int(408*k), int(238*k)], fill=lc)
    gdraw.ellipse([int(305*k), int(205*k), int(395*k), int(315*k)], fill=lc)
    gdraw.ellipse([int(248*k), int(348*k), int(358*k), int(435*k)], fill=lc)

    # Clip globe layer to circle
    globe_mask = Image.new('L', (s, s), 0)
    ImageDraw.Draw(globe_mask).ellipse([gcx-gr, gcy-gr, gcx+gr, gcy+gr], fill=255)
    img.paste(globe_layer, mask=globe_mask)
    draw = ImageDraw.Draw(img)

    # Globe outline
    draw.ellipse([gcx-gr, gcy-gr, gcx+gr, gcy+gr],
                 outline=(78, 142, 178, 180), width=max(2, int(3*k)))

    # ── Orbital ring (sweeps over upper globe) ────────────
    orx = int(218 * k)
    ory = int(68 * k)
    ocx = gcx + int(8 * k)
    ocy = gcy - int(28 * k)
    ring_w = int(20 * k)
    ring_color = (245, 215, 182, 210)
    draw.arc([ocx-orx, ocy-ory, ocx+orx, ocy+ory],
             start=22, end=202, fill=ring_color, width=ring_w)

    # ── Mt. Fuji (lower-right of globe) ──────────────────
    fx   = int(332 * k)
    fby  = int(375 * k)
    fty  = int(258 * k)
    fbw  = int(92 * k)
    draw.polygon([(fx-fbw, fby), (fx+fbw, fby), (fx, fty)],
                 fill=(172, 178, 190))
    sh = int(36 * k); sbw = int(36 * k)
    draw.polygon([(fx-sbw, fty+sh), (fx+sbw, fty+sh), (fx, fty)],
                 fill=(240, 245, 250))

    # ── Torii gate ────────────────────────────────────────
    tgx  = int(412 * k)
    tgby = int(390 * k)
    tgh  = int(58 * k)
    tgw  = int(36 * k)
    tc   = (192, 88, 95)
    pw   = max(3, int(7*k))
    draw.line([(tgx - tgw//2, tgby - tgh), (tgx - tgw//2, tgby)], fill=tc, width=pw)
    draw.line([(tgx + tgw//2, tgby - tgh), (tgx + tgw//2, tgby)], fill=tc, width=pw)
    draw.line([(tgx - tgw//2 - int(9*k), tgby - tgh),
               (tgx + tgw//2 + int(9*k), tgby - tgh)], fill=tc, width=pw)
    draw.line([(tgx - tgw//2, tgby - tgh + int(15*k)),
               (tgx + tgw//2, tgby - tgh + int(15*k))], fill=tc, width=max(2, int(4*k)))

    # ── Cherry blossom tree ───────────────────────────────
    trx  = int(392 * k)
    trby = int(388 * k)
    trty = int(298 * k)
    draw.line([(trx, trby), (trx, trty)], fill=(152, 108, 75), width=max(2, int(5*k)))
    bp = (238, 178, 198)
    for bx2, by2, br2 in [
        (trx,          trty,           int(26*k)),
        (trx - int(22*k), trty + int(18*k), int(20*k)),
        (trx + int(18*k), trty + int(14*k), int(18*k)),
        (trx - int(8*k),  trty + int(32*k), int(15*k)),
    ]:
        draw.ellipse([bx2-br2, by2-br2, bx2+br2, by2+br2], fill=bp)

    # ── Location pin ─────────────────────────────────────
    px = int(232 * k)
    py = int(350 * k)
    pr = int(23 * k)
    pc_col = (195, 92, 112)
    draw.ellipse([px-pr, py-pr, px+pr, py+pr], fill=pc_col)
    draw.ellipse([px-int(10*k), py-int(10*k), px+int(10*k), py+int(10*k)],
                 fill=(245, 228, 232))
    draw.polygon([(px-int(pr*0.55), py+int(pr*0.45)),
                  (px+int(pr*0.55), py+int(pr*0.45)),
                  (px, py+pr+int(15*k))], fill=pc_col)

    # ── Hot air balloon ───────────────────────────────────
    bax  = int(150 * k)
    bay  = int(318 * k)
    barx = int(27 * k)
    bary = int(33 * k)
    draw.ellipse([bax-barx, bay-bary, bax+barx, bay+bary], fill=(225, 195, 172))
    draw.ellipse([bax-int(barx*0.38), bay-bary+int(2*k),
                  bax+int(barx*0.38), bay+bary-int(2*k)], fill=(198, 165, 145))
    for lxi in [-1, 1]:
        lx2 = bax + int(lxi * barx * 0.65)
        draw.line([(lx2, bay-bary+int(4*k)), (lx2, bay+bary-int(4*k))],
                  fill=(178, 145, 125, 140), width=max(1, int(2*k)))
    bkt_y = bay + bary + int(5*k)
    bkt_w = int(16 * k); bkt_h = int(10 * k)
    draw.rectangle([bax-bkt_w//2, bkt_y, bax+bkt_w//2, bkt_y+bkt_h],
                   fill=(152, 112, 72))
    draw.line([(bax-int(barx*0.5), bay+bary), (bax-bkt_w//2, bkt_y)],
              fill=(128, 92, 58), width=max(1, int(2*k)))
    draw.line([(bax+int(barx*0.5), bay+bary), (bax+bkt_w//2, bkt_y)],
              fill=(128, 92, 58), width=max(1, int(2*k)))

    # ── Airplane (upper-right, slight tilt) ──────────────
    ps = int(160 * k)
    plane_layer = Image.new('RGBA', (ps*2, ps*2), (0, 0, 0, 0))
    pdraw = ImageDraw.Draw(plane_layer)
    pc2   = ps
    plc   = (245, 182, 145)
    blen  = int(58 * k)
    bh    = int(13 * k)
    pdraw.ellipse([pc2-blen, pc2-bh, pc2+blen, pc2+bh], fill=plc)
    pdraw.polygon([(pc2+blen, pc2), (pc2+blen+int(20*k), pc2-int(5*k)),
                   (pc2+blen+int(20*k), pc2+int(5*k))], fill=plc)
    pdraw.polygon([
        (pc2+int(5*k),  pc2-bh),
        (pc2-int(12*k), pc2-bh-int(46*k)),
        (pc2-int(34*k), pc2-bh-int(30*k)),
        (pc2-int(4*k),  pc2-bh),
    ], fill=plc)
    pdraw.polygon([
        (pc2-blen,            pc2-bh),
        (pc2-blen-int(12*k),  pc2-bh-int(22*k)),
        (pc2-blen+int(12*k),  pc2-bh),
    ], fill=plc)
    for i in range(3):
        wx2 = pc2 - int(18*k) + int(i * 16*k)
        pdraw.ellipse([wx2-int(4*k), pc2-int(5*k), wx2+int(4*k), pc2+int(5*k)],
                      fill=(255, 248, 240))
    plane_rot = plane_layer.rotate(28, resample=Image.BICUBIC, expand=False)
    plane_x = int(345*k) - ps
    plane_y = int(78*k)  - ps
    img.paste(plane_rot, (plane_x, plane_y), plane_rot)

    # ── Final rounded-corner clip ─────────────────────────
    final_mask = Image.new('L', (s, s), 0)
    ImageDraw.Draw(final_mask).rounded_rectangle([0, 0, s-1, s-1], radius=corner_r, fill=255)
    r2, g2, b2, _ = img.split()
    img = Image.merge('RGBA', (r2, g2, b2, final_mask))

    return img

import os
os.makedirs('icons', exist_ok=True)
for sz in [192, 512]:
    make_icon(sz).save(f'icons/icon-{sz}.png')
    print(f'[OK] icon-{sz}.png')
