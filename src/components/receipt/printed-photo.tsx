"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

const W = 168;
const H = 210;

// Placeholder portrait, drawn with soft light so the dither has tones to work with.
function drawPlaceholder(ctx: CanvasRenderingContext2D) {
  const light = ctx.createRadialGradient(W * 0.38, H * 0.3, 10, W * 0.5, H * 0.5, W);
  light.addColorStop(0, "#d8d8d8");
  light.addColorStop(1, "#6a6a6a");
  ctx.fillStyle = light;
  ctx.fillRect(0, 0, W, H);
  const skin = ctx.createRadialGradient(W * 0.44, H * 0.34, 4, W * 0.5, H * 0.4, 52);
  skin.addColorStop(0, "#7a7a7a");
  skin.addColorStop(1, "#262626");
  ctx.fillStyle = skin;
  ctx.beginPath();
  ctx.ellipse(W / 2, H * 0.4, 36, 44, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1c1c1c";
  ctx.beginPath();
  ctx.ellipse(W / 2, H * 1.02, 78, 86, 0, Math.PI, 0);
  ctx.fill();
}

// Atkinson dithering to 1-bit, the way a thermal printer renders a photo.
function dither(ctx: CanvasRenderingContext2D) {
  const img = ctx.getImageData(0, 0, W, H);
  const gray = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) gray[i] = img.data[i * 4] * 0.3 + img.data[i * 4 + 1] * 0.59 + img.data[i * 4 + 2] * 0.11;
  const spread = [
    [1, 0],
    [2, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [0, 2],
  ];
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const i = y * W + x;
      const value = gray[i] < 128 ? 0 : 255;
      const err = (gray[i] - value) / 8;
      gray[i] = value;
      for (const [dx, dy] of spread) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx >= 0 && nx < W && ny < H) gray[ny * W + nx] += err;
      }
    }
  }
  for (let i = 0; i < W * H; i++) {
    // Paper stays transparent so the receipt's own paper shows through.
    img.data.set(gray[i] === 0 ? [21, 20, 19, 255] : [0, 0, 0, 0], i * 4);
  }
  ctx.putImageData(img, 0, 0);
}

// shortcut: ?photo=1 previews the portrait slot with a placeholder; swap for a real photo later.
const wantsPhoto = () => new URLSearchParams(window.location.search).get("photo") === "1";
const subscribe = () => () => {};

// The portrait printed on the receipt. Only shown with ?photo=1 until there's a real photo.
export function PrintedPhoto() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const show = useSyncExternalStore(subscribe, wantsPhoto, () => false);

  useEffect(() => {
    const ctx = canvas.current?.getContext("2d", { willReadFrequently: true });
    if (!show || !ctx) return;
    drawPlaceholder(ctx);
    dither(ctx);
  }, [show]);

  if (!show) return null;
  return (
    <figure className="receipt-photo">
      <canvas ref={canvas} width={W} height={H} aria-label="Portrait placeholder" role="img" />
      <figcaption>Served by: Mudassir</figcaption>
    </figure>
  );
}
