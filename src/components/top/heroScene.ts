/**
 * ファーストビューの絵（全部コードで描く。Canvas 2D）
 *
 * 流れ（登場の開始からの秒）
 *   0.00–1.10 ミントの線が1本走って A のマークをなぞる（先頭に黄色の点）
 *   0.95–1.60 A がミントで塗られ、ぽんと弾む
 *   1.15–1.75 左右の人物が黄色い地面から弾んで立つ
 *   1.35–2.60 仕事の形（書類・吹き出し・表・カレンダー・メール・グラフ）が人物の端末や画面の外から A のまわりへ集まる
 *   2.10–3.20 A のまわりに点線の輪が描かれる
 *   2.70–     人物の端末から小さな形が A へ流れて吸い込まれる（2秒おき。吸い込むたびに A が小さく弾み、輪が広がる）
 * 登場の後は、形がふわっと浮き、ゆっくり流れて A に吸い込まれ続ける。
 * マウス・指に少し反応（形がよける・奥行きがずれる）。スクロールで A は奥へ、形は下へほどけて次のセクションへ流れる。
 *
 * 軽さのため: 形は最初に1回だけ小さな canvas に描いておき（sprite）、毎コマは貼るだけ。
 * 画面外（IntersectionObserver）とタブが隠れている時は止める。動きを減らす設定では止まった1枚の絵。
 */

const M = "#09a07e";
const Y = "#ffe45a";
const K = "#1c1c1c";
const WH = "#fff";
const GROUND = "#fff09a";
const SHADOW = "rgba(9,160,126,0.16)";

// ALPACA の A のマーク（public/images/logo/alpaca-mark.png を potrace でなぞった1本の輪郭。556×552。頂点から左の脚→下→アルパカ→右の脚→頂点）
const A_D =
  "M273.6 3.7C272.6 5.8 263.1 26.2 252.5 49.0C241.9 71.8 223.5 111.4 211.5 137.0C199.5 162.6 187.1 189.1 184.0 196.0C178.4 208.1 156.9 254.7 149.8 270.0C140.6 289.7 113.1 348.6 106.8 362.0C104.6 366.7 96.1 384.9 88.0 402.5C41.1 504.0 32.5 519.4 10.0 542.2L0.5 552.0L78.1 552.0C155.7 552.0 155.7 552.0 154.7 547.6C152.5 537.8 158.6 523.7 179.6 491.0C193.7 468.8 201.5 453.8 206.3 439.3C213.3 418.0 214.6 408.5 220.5 330.0C225.6 263.0 235.0 233.0 255.9 217.4C260.0 214.3 260.9 213.0 261.9 208.8C265.5 193.0 278.4 175.3 284.4 177.6C285.9 178.2 286.3 179.2 287.5 185.2C287.8 186.9 286.6 198.3 285.4 204.6C284.8 207.7 284.8 207.7 296.2 208.2C310.0 208.8 317.3 211.3 324.0 217.6C328.5 221.9 328.5 221.9 328.7 229.2C328.9 237.7 329.5 238.3 341.0 242.1C357.3 247.5 363.2 254.1 359.4 262.7C358.5 264.8 357.8 268.2 357.9 270.2C358.1 273.3 357.5 274.5 354.2 277.8C350.1 281.9 347.3 282.9 329.9 286.5C311.5 290.3 306.1 299.9 309.4 323.2C314.2 357.1 331.1 397.5 374.9 480.3C400.9 529.4 404.4 538.1 402.3 547.6C401.3 552.0 401.3 552.0 478.8 552.0L556.4 552.0L548.1 543.7C543.5 539.2 536.6 531.2 532.6 526.0C518.4 507.1 509.6 490.5 481.5 430.0C457.2 377.6 459.8 383.2 428.0 315.0C413.0 282.8 395.0 244.1 388.0 229.0C366.1 181.7 343.3 132.8 327.1 98.0C318.4 79.6 304.7 50.0 296.4 32.3C281.6 0.2 281.5 0.0 278.4 0.0C275.9 0.0 275.1 0.6 273.6 3.7Z";
const A_W = 556;
const A_H = 552;
const A_LEN = 2431;

// ---- イージング ----
const clamp = (v: number, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const seg = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const outCubic = (k: number) => 1 - (1 - k) ** 3;
const inOutCubic = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);
const inOutSine = (k: number) => -(Math.cos(Math.PI * k) - 1) / 2;
const outBack = (k: number, s = 1.6) => 1 + (s + 1) * (k - 1) ** 3 + s * (k - 1) ** 2;
const outElastic = (k: number, p = 0.42) =>
  k <= 0 ? 0 : k >= 1 ? 1 : 2 ** (-10 * k) * Math.sin(((k - p / 4) * 2 * Math.PI) / p) + 1;
const RAD = Math.PI / 180;

// ---- 仕事の形（1辺 s の中に収まる平たい絵。墨の線・ミント・黄・白だけ） ----
type Kind = "doc" | "chat" | "table" | "cal" | "mail" | "chart" | "check" | "clock";

function rr(c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  r = Math.min(r, w / 2, h / 2);
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}

/** 形の外形だけ（影と本体の両方に使う） */
function outline(c: CanvasRenderingContext2D, k: Kind, s: number) {
  switch (k) {
    case "doc": {
      const w = s * 0.74, h = s * 0.96, x = -w / 2, y = -h / 2, f = s * 0.22, r = s * 0.07;
      c.beginPath();
      c.moveTo(x + r, y);
      c.lineTo(x + w - f, y);
      c.lineTo(x + w, y + f);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
      break;
    }
    case "chat": {
      const w = s * 1.02, h = s * 0.7, x = -w / 2, y = -h / 2 - s * 0.06, r = s * 0.2;
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.lineTo(x + w * 0.36, y + h);
      c.lineTo(x + w * 0.16, y + h + s * 0.2);
      c.lineTo(x + w * 0.2, y + h);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
      break;
    }
    case "table":
      rr(c, -s * 0.52, -s * 0.4, s * 1.04, s * 0.8, s * 0.08);
      break;
    case "cal":
      rr(c, -s * 0.46, -s * 0.42, s * 0.92, s * 0.88, s * 0.1);
      break;
    case "mail":
      rr(c, -s * 0.5, -s * 0.34, s * 1.0, s * 0.68, s * 0.08);
      break;
    case "chart":
      rr(c, -s * 0.5, -s * 0.42, s * 1.0, s * 0.84, s * 0.1);
      break;
    case "check":
    case "clock":
      c.beginPath();
      c.arc(0, 0, s * 0.4, 0, Math.PI * 2);
      break;
  }
}

function drawKind(c: CanvasRenderingContext2D, k: Kind, s: number) {
  const lw = Math.max(1.2, s * 0.042);
  c.lineJoin = "round";
  c.lineCap = "round";
  // 平たい影（右下にずらしたミントの薄い面）
  c.save();
  c.translate(s * 0.06, s * 0.07);
  outline(c, k, s);
  c.fillStyle = SHADOW;
  c.fill();
  c.restore();

  const body = k === "chat" || k === "check" ? M : k === "mail" ? Y : WH;
  outline(c, k, s);
  c.fillStyle = body;
  c.fill();

  c.lineWidth = lw;
  c.strokeStyle = K;
  c.fillStyle = K;
  switch (k) {
    case "doc": {
      const w = s * 0.74, h = s * 0.96, x = -w / 2, y = -h / 2, f = s * 0.22;
      // 折り返しの角（黄）
      c.beginPath();
      c.moveTo(x + w - f, y);
      c.lineTo(x + w - f, y + f * 0.86);
      c.quadraticCurveTo(x + w - f, y + f, x + w - f * 0.86, y + f);
      c.lineTo(x + w, y + f);
      c.closePath();
      c.fillStyle = Y;
      c.fill();
      c.stroke();
      c.lineWidth = lw * 1.5;
      c.strokeStyle = M;
      c.beginPath();
      c.moveTo(x + w * 0.2, y + h * 0.3);
      c.lineTo(x + w * 0.52, y + h * 0.3);
      c.stroke();
      c.lineWidth = lw;
      c.strokeStyle = K;
      c.beginPath();
      for (let i = 0; i < 3; i++) {
        const yy = y + h * (0.5 + i * 0.15);
        c.moveTo(x + w * 0.2, yy);
        c.lineTo(x + w * (i === 2 ? 0.56 : 0.8), yy);
      }
      c.stroke();
      break;
    }
    case "chat": {
      c.fillStyle = WH;
      for (let i = -1; i <= 1; i++) {
        c.beginPath();
        c.arc(i * s * 0.22, -s * 0.06, s * 0.065, 0, Math.PI * 2);
        c.fill();
      }
      break;
    }
    case "table": {
      const x = -s * 0.52, y = -s * 0.4, w = s * 1.04, h = s * 0.8;
      c.save();
      rr(c, x, y, w, h, s * 0.08);
      c.clip();
      c.fillStyle = M;
      c.fillRect(x, y, w, h * 0.26);
      c.restore();
      c.beginPath();
      c.moveTo(x, y + h * 0.26);
      c.lineTo(x + w, y + h * 0.26);
      c.moveTo(x, y + h * 0.63);
      c.lineTo(x + w, y + h * 0.63);
      c.moveTo(x + w * 0.36, y);
      c.lineTo(x + w * 0.36, y + h);
      c.moveTo(x + w * 0.68, y);
      c.lineTo(x + w * 0.68, y + h);
      c.stroke();
      c.fillStyle = Y;
      c.fillRect(x + w * 0.68 + lw / 2, y + h * 0.63 + lw / 2, w * 0.32 - lw, h * 0.37 - lw);
      break;
    }
    case "cal": {
      const x = -s * 0.46, y = -s * 0.42, w = s * 0.92, h = s * 0.88;
      c.save();
      rr(c, x, y, w, h, s * 0.1);
      c.clip();
      c.fillStyle = Y;
      c.fillRect(x, y, w, h * 0.27);
      c.restore();
      c.beginPath();
      c.moveTo(x, y + h * 0.27);
      c.lineTo(x + w, y + h * 0.27);
      c.stroke();
      // 綴じ輪
      c.lineWidth = lw * 1.3;
      c.beginPath();
      c.moveTo(x + w * 0.28, y - s * 0.07);
      c.lineTo(x + w * 0.28, y + h * 0.1);
      c.moveTo(x + w * 0.72, y - s * 0.07);
      c.lineTo(x + w * 0.72, y + h * 0.1);
      c.stroke();
      // 日付の点と、ミントの丸の日
      c.fillStyle = K;
      for (let r = 0; r < 2; r++)
        for (let q = 0; q < 3; q++) {
          const px = x + w * (0.25 + q * 0.25), py = y + h * (0.5 + r * 0.25);
          if (r === 1 && q === 1) {
            c.fillStyle = M;
            c.beginPath();
            c.arc(px, py, s * 0.1, 0, Math.PI * 2);
            c.fill();
            c.fillStyle = K;
          } else {
            c.beginPath();
            c.arc(px, py, s * 0.04, 0, Math.PI * 2);
            c.fill();
          }
        }
      break;
    }
    case "mail": {
      const x = -s * 0.5, y = -s * 0.34, w = s, h = s * 0.68;
      c.beginPath();
      c.moveTo(x + s * 0.04, y + s * 0.05);
      c.lineTo(0, y + h * 0.58);
      c.lineTo(x + w - s * 0.04, y + s * 0.05);
      c.stroke();
      break;
    }
    case "chart": {
      const x = -s * 0.5, y = -s * 0.42, w = s, h = s * 0.84;
      const bars = [0.34, 0.56, 0.8];
      const col = [M, Y, M];
      const bw = w * 0.17;
      for (let i = 0; i < 3; i++) {
        const bh = h * 0.72 * bars[i];
        const bx = x + w * (0.2 + i * 0.235);
        const by = y + h * 0.84 - bh;
        c.fillStyle = col[i];
        rr(c, bx, by, bw, bh, s * 0.03);
        c.fill();
        c.stroke();
      }
      c.beginPath();
      c.moveTo(x + w * 0.12, y + h * 0.84);
      c.lineTo(x + w * 0.88, y + h * 0.84);
      c.stroke();
      break;
    }
    case "check": {
      c.strokeStyle = WH;
      c.lineWidth = s * 0.09;
      c.beginPath();
      c.moveTo(-s * 0.16, 0);
      c.lineTo(-s * 0.04, s * 0.12);
      c.lineTo(s * 0.18, -s * 0.12);
      c.stroke();
      c.strokeStyle = K;
      c.lineWidth = lw;
      break;
    }
    case "clock": {
      c.lineWidth = lw * 1.3;
      c.beginPath();
      c.moveTo(0, 0);
      c.lineTo(0, -s * 0.24);
      c.moveTo(0, 0);
      c.lineTo(s * 0.16, s * 0.08);
      c.stroke();
      c.fillStyle = M;
      c.beginPath();
      c.arc(0, 0, s * 0.06, 0, Math.PI * 2);
      c.fill();
      c.lineWidth = lw;
      break;
    }
  }
  // 最後に輪郭の墨の線
  outline(c, k, s);
  c.stroke();
}

type Sprite = { cv: HTMLCanvasElement; half: number };
function makeSprite(k: Kind, s: number, dpr: number): Sprite {
  const half = s * 0.72;
  const px = Math.ceil(half * 2 * dpr);
  const cv = document.createElement("canvas");
  cv.width = cv.height = px;
  const c = cv.getContext("2d")!;
  c.setTransform(dpr, 0, 0, dpr, half * dpr, half * dpr);
  drawKind(c, k, s);
  return { cv, half };
}

// ---- 人物（今のヒーローの切り抜き。端末の位置は画像の中の割合） ----
type PersonDef = { src: string; w: number; h: number; dev: [number, number]; head: number };
const PEOPLE: PersonDef[] = [
  { src: "/images/top/people/staff-laptop.webp", w: 252, h: 421, dev: [0.73, 0.43], head: 1 },
  { src: "/images/top/people/worker-phone.webp", w: 167, h: 354, dev: [0.17, 0.26], head: 1.12 },
];

// 集まる形（A のまわりの角度・奥行き・大きさ・傾き・どこから来るか）
type Orb = { k: Kind; ang: number; depth: number; size: number; tilt: number; from: number | [number, number]; phase: number };
const ORBS: Orb[] = [
  { k: "doc", ang: -150, depth: 1.1, size: 1, tilt: -8, from: 0, phase: 0.2 },
  { k: "chat", ang: -42, depth: 1.2, size: 1.02, tilt: 6, from: 1, phase: 1.3 },
  { k: "table", ang: -92, depth: 0.85, size: 0.94, tilt: 4, from: [0.2, -1.6], phase: 2.1 },
  { k: "cal", ang: 176, depth: 1.0, size: 0.96, tilt: -5, from: [-1.9, -0.3], phase: 0.9 },
  { k: "chart", ang: 2, depth: 0.95, size: 0.94, tilt: 7, from: [1.9, 0.1], phase: 2.7 },
  { k: "mail", ang: 90, depth: 1.25, size: 0.9, tilt: -4, from: [0, 1.7], phase: 1.7 },
];
const ORB_T0 = 1.35;
const ORB_GAP = 0.12;
const ORB_DUR = 0.8;

// 流れて吸い込まれる形
const STREAM_T0 = 2.7;
const STREAM_GAP = 2.0;
const STREAM_DUR = 1.3;
const STREAM_KINDS: Kind[] = ["check", "doc", "clock", "chat", "table", "mail", "cal", "chart"];

export type HeroScene = { play: () => void; destroy: () => void };

export function createHeroScene(canvas: HTMLCanvasElement, stage: HTMLElement, hero: HTMLElement, reduced: boolean): HeroScene {
  const ctx = canvas.getContext("2d");
  if (!ctx) return { play() {}, destroy() {} };
  const c = ctx;
  const aPath = new Path2D(A_D);

  let W = 0, H = 0, dpr = 1;
  // 配置（resize で決め直す）
  let cx = 0, cy = 0, ah = 0, aw = 0, rx = 0, ry = 0, P = 0, groundY = 0;
  const people = PEOPLE.map((d) => {
    const img = new Image();
    img.decoding = "async";
    img.src = d.src;
    const p = { d, img, ok: false, x: 0, h: 0, w: 0, loadedAt: -1 };
    img.onload = () => {
      p.ok = true;
      p.loadedAt = time;
      if (reduced) draw();
    };
    return p;
  });
  const sprites = new Map<string, Sprite>();
  const sprite = (k: Kind, s: number) => {
    const key = k + (s | 0);
    let sp = sprites.get(key);
    if (!sp) {
      sp = makeSprite(k, s, dpr);
      sprites.set(key, sp);
    }
    return sp;
  };

  function layout() {
    const hr = hero.getBoundingClientRect();
    const sr = stage.getBoundingClientRect();
    W = Math.max(1, Math.round(hr.width));
    H = Math.max(1, Math.round(hr.height));
    dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    const sx = sr.left - hr.left, sy = sr.top - hr.top, sw = sr.width, sh = sr.height;
    const narrow = sw < 520;
    ah = clamp(Math.min(sw * (narrow ? 0.34 : 0.36), sh * 0.4), 84, 220);
    aw = (ah * A_W) / A_H;
    P = Math.round(ah * (narrow ? 0.36 : 0.33));
    cx = sx + sw / 2;
    cy = sy + sh * (narrow ? 0.4 : 0.42);
    rx = Math.min(ah * 1.38, sw / 2 - P * 0.62);
    ry = ah * (narrow ? 0.86 : 0.98);
    groundY = sy + sh - Math.max(8, sh * 0.03);
    // 人物: 左に座ってパソコン、右に立ってスマホ。頭の大きさをそろえる
    const baseH = ah * (narrow ? 0.92 : 1.12);
    people.forEach((p, i) => {
      const sc = (baseH / p.d.h) * p.d.head;
      p.h = p.d.h * sc;
      p.w = p.d.w * sc;
      const off = Math.min(rx * (narrow ? 0.98 : 1.02), sw / 2 - p.w * 0.42);
      p.x = cx + (i === 0 ? -off : off);
    });
    sprites.clear();
  }

  // ---- 入力（マウス・指・スクロール） ----
  let ptrX = -9999, ptrY = -9999, ptrOn = 0; // 近くの形をよける
  let parX = 0, parY = 0, tParX = 0, tParY = 0; // 奥行きのずれ（-1〜1）
  let ptrOnS = 0;
  const onMove = (x: number, y: number) => {
    const r = hero.getBoundingClientRect();
    ptrX = x - r.left;
    ptrY = y - r.top;
    ptrOn = 1;
    tParX = clamp((ptrX / W) * 2 - 1, -1, 1);
    tParY = clamp((ptrY / H) * 2 - 1, -1, 1);
    wake();
  };
  const pm = (e: PointerEvent) => {
    if (e.pointerType === "mouse") onMove(e.clientX, e.clientY);
  };
  const pl = () => {
    ptrOn = 0;
    tParX = tParY = 0;
  };
  let touchTimer = 0;
  const tm = (e: TouchEvent) => {
    const t = e.touches[0];
    if (!t) return;
    onMove(t.clientX, t.clientY);
    clearTimeout(touchTimer);
  };
  const te = () => {
    clearTimeout(touchTimer);
    touchTimer = window.setTimeout(pl, 500);
  };
  if (!reduced) {
    hero.addEventListener("pointermove", pm, { passive: true });
    hero.addEventListener("pointerleave", pl, { passive: true });
    hero.addEventListener("touchstart", tm, { passive: true });
    hero.addEventListener("touchmove", tm, { passive: true });
    hero.addEventListener("touchend", te, { passive: true });
  }

  // ---- 時間 ----
  let time = 0; // 動いている間だけ進む秒
  let startAt = reduced ? -100 : Infinity; // 登場の開始（time の値）
  let last = 0;
  let raf = 0;
  let visible = true;
  let running = false;
  const offs = ORBS.map(() => ({ x: 0, y: 0 }));

  function wake() {
    if (reduced || running || !visible || document.hidden) return;
    running = true;
    last = performance.now();
    raf = requestAnimationFrame(tick);
  }
  function tick(now: number) {
    const dt = Math.min(0.05, Math.max(0, (now - last) / 1000));
    last = now;
    time += dt;
    // 奥行きのずれ・よける量をなめらかに追いかける（時間基準）
    const f = 1 - Math.exp(-dt * 5);
    parX += (tParX - parX) * f;
    parY += (tParY - parY) * f;
    ptrOnS += (ptrOn - ptrOnS) * f;
    draw(dt);
    if (running) raf = requestAnimationFrame(tick);
  }
  function sleep() {
    running = false;
    cancelAnimationFrame(raf);
  }

  // ---- 1コマ描く ----
  function drawA(t: number, x: number, y: number, scale: number) {
    const k = ah / A_H;
    const drawK = reduced ? 1 : seg(t, 0, 1.1);
    const fillK = reduced ? 1 : seg(t, 0.95, 1.3);
    if (drawK <= 0) return;
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    c.translate((-A_W / 2) * k, (-A_H / 2) * k);
    c.scale(k, k);
    if (fillK > 0) {
      c.globalAlpha = inOutSine(fillK);
      c.fillStyle = M;
      c.fill(aPath);
      c.globalAlpha = 1;
    }
    if (fillK < 1) {
      const p = inOutCubic(drawK);
      c.lineWidth = Math.max(2.4, ah * 0.016) / k;
      c.lineJoin = "round";
      c.lineCap = "round";
      c.strokeStyle = M;
      c.setLineDash([A_LEN * p, A_LEN + 10]);
      c.stroke(aPath);
      c.setLineDash([]);
    }
    c.restore();
    // 線の先の黄色い点（ペン先）
    if (drawK > 0 && drawK < 1 && !reduced) {
      const pt = penAt(inOutCubic(drawK));
      const px = x + (pt[0] - A_W / 2) * k * scale;
      const py = y + (pt[1] - A_H / 2) * k * scale;
      const r = Math.max(4, ah * 0.028);
      c.fillStyle = Y;
      c.strokeStyle = K;
      c.lineWidth = Math.max(1.4, ah * 0.009);
      c.beginPath();
      c.arc(px, py, r, 0, Math.PI * 2);
      c.fill();
      c.stroke();
    }
  }

  function drawSprite(k: Kind, s: number, x: number, y: number, rot: number, sc: number, alpha: number) {
    if (sc <= 0.01 || alpha <= 0.01) return;
    const sp = sprite(k, s);
    c.save();
    c.globalAlpha = alpha;
    c.translate(x, y);
    if (rot) c.rotate(rot);
    if (sc !== 1) c.scale(sc, sc);
    c.drawImage(sp.cv, -sp.half, -sp.half, sp.half * 2, sp.half * 2);
    c.restore();
  }

  function draw(dt = 0) {
    void dt;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, W, H);
    const t = reduced ? 30 : time - startAt; // 登場からの秒
    if (t < 0) return;
    const scrollY = reduced ? 0 : window.scrollY || 0;
    const s = clamp(scrollY / Math.max(1, H));
    const sE = s * s;

    // A の位置（奥の層: スクロールでゆっくり・マウスで少し）
    const floatY = reduced ? 0 : Math.sin(t * 1.6) * ah * 0.012;
    const ax = cx - parX * 6;
    const ay = cy + floatY - parY * 4 + scrollY * 0.3;
    // 吸い込みの弾み
    let pulse = 0;
    let ringK = -1;
    if (!reduced && t > STREAM_T0 + STREAM_DUR) {
      const n = Math.floor((t - STREAM_T0 - STREAM_DUR) / STREAM_GAP);
      const since = t - (STREAM_T0 + STREAM_DUR + n * STREAM_GAP);
      pulse = since < 0.5 ? Math.sin(seg(since, 0, 0.5) * Math.PI) * (1 - seg(since, 0, 0.5)) : 0;
      ringK = since < 0.9 ? since / 0.9 : -1;
    }
    const popK = reduced ? 1 : seg(t, 1.0, 1.7);
    const aScale = (0.94 + 0.06 * outElastic(popK, 0.35)) * (1 + pulse * 0.07) * (1 - s * 0.18);

    // 地面の影（A の下）
    const shK = reduced ? 1 : outCubic(seg(t, 1.0, 1.5));
    if (shK > 0) {
      c.fillStyle = "rgba(9,160,126,0.12)";
      c.beginPath();
      c.ellipse(ax, cy + ah * 0.62 + scrollY * 0.3, aw * 0.42 * shK * (1 - floatY / ah), ah * 0.05 * shK, 0, 0, Math.PI * 2);
      c.fill();
    }

    // 点線の輪
    const ringDraw = reduced ? 1 : outCubic(seg(t, 2.1, 3.2));
    if (ringDraw > 0) {
      c.save();
      c.strokeStyle = "rgba(9,160,126,0.38)";
      c.lineWidth = Math.max(1.5, ah * 0.01);
      c.lineCap = "round";
      c.setLineDash([0.1, Math.max(9, ah * 0.055)]);
      c.lineDashOffset = -t * 6;
      c.beginPath();
      const sp = 1 + s * 0.5;
      c.ellipse(ax, ay, rx * sp, ry * sp, 0, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ringDraw);
      c.stroke();
      c.restore();
    }
    // 吸い込んだ時に広がる輪
    if (ringK >= 0) {
      c.strokeStyle = M;
      c.globalAlpha = 0.45 * (1 - ringK);
      c.lineWidth = Math.max(1.5, ah * 0.012);
      c.beginPath();
      c.ellipse(ax, ay, aw * (0.45 + 0.55 * outCubic(ringK)), ah * (0.45 + 0.55 * outCubic(ringK)), 0, 0, Math.PI * 2);
      c.stroke();
      c.globalAlpha = 1;
    }

    // 人物（地面から弾んで立つ）
    people.forEach((p, i) => {
      const k0 = 1.15 + i * 0.14;
      const gk = reduced ? 1 : outCubic(seg(t, k0 - 0.1, k0 + 0.25));
      const px = p.x - parX * 3;
      if (gk > 0) {
        c.fillStyle = GROUND;
        c.beginPath();
        c.ellipse(px, groundY, p.w * 0.62 * gk, p.w * 0.12 * gk, 0, 0, Math.PI * 2);
        c.fill();
      }
      if (!p.ok) return;
      const bk = reduced ? 1 : seg(t, k0, k0 + 0.5);
      // 読み込みが遅れた時はふわっと出す
      const la = reduced ? 1 : clamp((time - p.loadedAt) / 0.3);
      if (bk <= 0) return;
      // 半透明の人物は色が濁るので、透明度ではなく足元から伸びて出す（読み込みが遅れた時だけ短く透明度を使う）
      const sy = outBack(bk, 1.3);
      const sx = 1 - (sy - 1) * 0.4;
      if (sy <= 0.02) return;
      c.save();
      c.globalAlpha = la;
      c.translate(px, groundY + p.h * 0.02);
      c.scale(sx, sy);
      c.drawImage(p.img, -p.w / 2, -p.h, p.w, p.h);
      c.restore();
    });
    const devPt = (i: number): [number, number] => {
      const p = people[i];
      return [p.x - parX * 3 + (p.d.dev[0] - 0.5) * p.w, groundY - p.h * (1 - p.d.dev[1])];
    };

    // 流れて吸い込まれる形（A より先に描く＝A の中へ消える）
    if (!reduced && t > STREAM_T0) {
      const nMax = Math.floor((t - STREAM_T0) / STREAM_GAP);
      for (let n = Math.max(0, nMax - 1); n <= nMax; n++) {
        const u = (t - (STREAM_T0 + n * STREAM_GAP)) / STREAM_DUR;
        if (u < 0 || u >= 1) continue;
        const [dx, dy] = devPt(n % 2);
        const tx = ax, ty = ay - ah * 0.25;
        const mxp = lerp(dx, tx, 0.5) + (n % 2 ? 1 : -1) * rx * 0.1;
        const myp = Math.min(dy, ty) - ah * 0.75;
        const e = inOutSine(u);
        const x = (1 - e) * (1 - e) * dx + 2 * (1 - e) * e * mxp + e * e * tx;
        const y = (1 - e) * (1 - e) * dy + 2 * (1 - e) * e * myp + e * e * ty;
        const sc = outBack(seg(u, 0, 0.25), 2) * (1 - 0.8 * seg(u, 0.55, 1));
        const k = STREAM_KINDS[n % STREAM_KINDS.length];
        drawSprite(k, Math.round(P * 0.62), x, y, (1 - e) * (n % 2 ? -0.5 : 0.5), sc, 1 - seg(u, 0.9, 1));
      }
    }

    drawA(t, ax, ay, aScale);

    // 集まってくる形
    ORBS.forEach((o, i) => {
      const t0 = ORB_T0 + i * ORB_GAP;
      const u = reduced ? 1 : seg(t, t0, t0 + ORB_DUR);
      if (u <= 0) return;
      const d = o.depth;
      const bob = reduced ? 0 : Math.sin(t * 1.25 + o.phase * 2.3) * P * 0.09;
      const wob = reduced ? 0 : Math.sin(t * 0.9 + o.phase) * 2.5;
      const spread = 1 + s * 0.7 * d;
      const a = o.ang * RAD;
      let hx = ax + Math.cos(a) * rx * spread - parX * 14 * d;
      let hy = ay + Math.sin(a) * ry * spread + bob - parY * 9 * d + sE * H * 0.45 * d;
      // よける（近いほど強く・最大 P*0.55）
      const off = offs[i];
      let ox = 0, oy = 0;
      if (ptrOnS > 0.01) {
        const vx = hx - ptrX, vy = hy - ptrY;
        const dist = Math.hypot(vx, vy) || 1;
        const R = P * 2.6;
        if (dist < R) {
          const f = (1 - dist / R) ** 2 * P * 0.9 * ptrOnS;
          ox = (vx / dist) * f;
          oy = (vy / dist) * f;
        }
      }
      off.x += (ox - off.x) * 0.18;
      off.y += (oy - off.y) * 0.18;
      hx += off.x;
      hy += off.y;
      // 出発点（人物の端末 or 画面の外）
      let fx: number, fy: number;
      if (typeof o.from === "number") [fx, fy] = devPt(o.from);
      else [fx, fy] = [ax + o.from[0] * rx, ay + o.from[1] * ry];
      const e = outCubic(u);
      const mx = lerp(fx, hx, 0.5) - (hy - fy) * 0.25;
      const my = lerp(fy, hy, 0.5) + (hx - fx) * 0.25;
      const x = (1 - e) * (1 - e) * fx + 2 * (1 - e) * e * mx + e * e * hx;
      const y = (1 - e) * (1 - e) * fy + 2 * (1 - e) * e * my + e * e * hy;
      const sc = (typeof o.from === "number" ? 0.25 + 0.75 * outBack(u, 1.8) : outBack(u, 1.5)) * o.size;
      const rot = (o.tilt + wob + (1 - e) * (i % 2 ? 70 : -70) + s * 50 * d * (i % 2 ? 1 : -1)) * RAD;
      drawSprite(o.k, P, x, y, rot, sc, seg(u, 0, 0.12));
    });
  }

  // 線の先の点の位置（パスを細かく刻んだ表を1回だけ作る）
  let penTable: [number, number][] | null = null;
  function penAt(p: number): [number, number] {
    if (!penTable) penTable = buildPenTable();
    const i = clamp(p) * (penTable.length - 1);
    const a = penTable[Math.floor(i)], b = penTable[Math.min(penTable.length - 1, Math.floor(i) + 1)];
    const f = i - Math.floor(i);
    return [lerp(a[0], b[0], f), lerp(a[1], b[1], f)];
  }

  // ---- 見える間だけ動かす ----
  const io = new IntersectionObserver(
    (en) => {
      visible = en[0]?.isIntersecting ?? true;
      if (visible) wake();
      else sleep();
    },
    { rootMargin: "100px" }
  );
  io.observe(hero);
  const onVis = () => (document.hidden ? sleep() : wake());
  document.addEventListener("visibilitychange", onVis);
  const ro = new ResizeObserver(() => {
    layout();
    draw();
  });
  ro.observe(hero);
  const onScroll = () => {
    if (!reduced) wake();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  layout();
  draw();

  return {
    play() {
      if (reduced || startAt !== Infinity) return;
      startAt = time;
      wake();
    },
    destroy() {
      sleep();
      io.disconnect();
      ro.disconnect();
      clearTimeout(touchTimer);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("scroll", onScroll);
      hero.removeEventListener("pointermove", pm);
      hero.removeEventListener("pointerleave", pl);
      hero.removeEventListener("touchstart", tm);
      hero.removeEventListener("touchmove", tm);
      hero.removeEventListener("touchend", te);
    },
  };
}

/** A の輪郭を長さの等しい点の列に（線の先の点を線と同じ速さで動かすため） */
function buildPenTable(): [number, number][] {
  const nums = A_D.match(/[MLCZ]|-?\d+\.?\d*/g) || [];
  const pts: [number, number][] = [];
  let i = 0, cur: [number, number] = [0, 0], cmd = "";
  const rd = () => parseFloat(nums[i++]);
  while (i < nums.length) {
    if (/[MLCZ]/.test(nums[i])) cmd = nums[i++];
    if (cmd === "Z") break;
    if (cmd === "M" || cmd === "L") {
      const p: [number, number] = [rd(), rd()];
      if (cmd === "L") for (let k = 1; k <= 8; k++) pts.push([lerp(cur[0], p[0], k / 8), lerp(cur[1], p[1], k / 8)]);
      else pts.push(p);
      cur = p;
    } else if (cmd === "C") {
      const b: [number, number] = [rd(), rd()], d: [number, number] = [rd(), rd()], e: [number, number] = [rd(), rd()];
      for (let k = 1; k <= 12; k++) {
        const t = k / 12, m = 1 - t;
        pts.push([
          m * m * m * cur[0] + 3 * m * m * t * b[0] + 3 * m * t * t * d[0] + t * t * t * e[0],
          m * m * m * cur[1] + 3 * m * m * t * b[1] + 3 * m * t * t * d[1] + t * t * t * e[1],
        ]);
      }
      cur = e;
    }
  }
  // 長さで等分し直す
  const acc = [0];
  for (let k = 1; k < pts.length; k++) acc.push(acc[k - 1] + Math.hypot(pts[k][0] - pts[k - 1][0], pts[k][1] - pts[k - 1][1]));
  const L = acc[acc.length - 1];
  const out: [number, number][] = [];
  let j = 0;
  for (let n = 0; n <= 400; n++) {
    const want = (L * n) / 400;
    while (j < acc.length - 2 && acc[j + 1] < want) j++;
    const f = (want - acc[j]) / (acc[j + 1] - acc[j] || 1);
    out.push([lerp(pts[j][0], pts[j + 1][0], f), lerp(pts[j][1], pts[j + 1][1], f)]);
  }
  return out;
}
