import { getStore, setStore, listenTS, dispatchTS } from "./utils/code-utils";

figma.showUI(__html__, {
  themeColors: true,
  width: 550,
  height: 600,
});

listenTS("hello", (res) => {
  console.log("code.ts");
  alert(`Hello ${res.string}`);
  dispatchTS("helloCallback", { result: true });
});

listenTS("createColorGrid", (res) => {
  const frameMain = figma.createFrame();
  frameMain.name = "Color Grid";
  frameMain.x = 0;
  frameMain.y = 0;
  frameMain.layoutMode = "VERTICAL";
  frameMain.counterAxisSizingMode = "AUTO";
  frameMain.primaryAxisSizingMode = "AUTO";
  frameMain.itemSpacing = 20;
  frameMain.fills = [];

  const saturationArrays: number[] = calculateDividers(
    res.saturationMin,
    res.saturationMax,
    res.step
  );
  const brightnessArrays: number[] = calculateDividers(
    res.brightnessmin,
    res.brightnessmax,
    res.step
  ).reverse();

  brightnessArrays.forEach((brightness) => {
    const frame = figma.createFrame();
    frame.name = `brightness ${brightness}`;
    frame.layoutMode = "HORIZONTAL";
    frame.counterAxisSizingMode = "AUTO";
    frame.primaryAxisSizingMode = "AUTO";
    frame.itemSpacing = 20;
    frame.fills = [];

    saturationArrays.forEach((saturation) => {
      const rect = figma.createRectangle();
      rect.name = `(H: ${res.hue}, S: ${saturation}, B: ${brightness})`;

      rect.fills = [
        {
          type: "SOLID",
          color: {
            r: hsbToRgb(res.hue, saturation, brightness).r / 255,
            g: hsbToRgb(res.hue, saturation, brightness).g / 255,
            b: hsbToRgb(res.hue, saturation, brightness).b / 255,
          },
        },
      ];
      rect.cornerRadius = 5;
      rect.resize(100, 100);
      frame.appendChild(rect);
    });

    frameMain.appendChild(frame);
  });

  dispatchTS("createColorGridCallback", { result: true });
});

function calculateDividers(
  start: number,
  end: number,
  count: number
): number[] {
  const step = (end - start) / (count - 1);
  const result: number[] = [];

  for (let i = 0; i < count; i++) {
    const value = start + step * i;
    result.push(Math.round(value));
  }

  return result;
}

function hsbToRgb(h: number, s: number, b: number) {
  h = h / 360;
  s = s / 100;
  b = b / 100;

  let r: number, g: number, b_: number;

  if (s === 0) {
    r = g = b_ = b * 255;
    return { r, g, b: b_ };
  }

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = b * (1 - s);
  const q = b * (1 - f * s);
  const t = b * (1 - (1 - f) * s);

  switch (i % 6) {
    case 0:
      r = b;
      g = t;
      b_ = p;
      break;
    case 1:
      r = q;
      g = b;
      b_ = p;
      break;
    case 2:
      r = p;
      g = b;
      b_ = t;
      break;
    case 3:
      r = p;
      g = q;
      b_ = b;
      break;
    case 4:
      r = t;
      g = p;
      b_ = b;
      break;
    case 5:
      r = b;
      g = p;
      b_ = q;
      break;
    default:
      r = 0;
      g = 0;
      b_ = 0;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b_ * 255),
  };
}
