"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useAnimationFrame, AnimatePresence } from "framer-motion";
import {
  Radio,
  Activity,
  Wifi,
  Zap,
  Signal,
  Eye,
  TrendingUp,
} from "lucide-react";

// ─── Frequency Scanner (Canvas-based wave animation) ─────────────────────────

function FrequencyScanner() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);

  useAnimationFrame((t) => {
    timeRef.current = t;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    const time = t * 0.001;

    const waves = [
      { amp: 28, freq: 0.018, speed: 0.8, alpha: 0.7, width: 2.5 },
      { amp: 16, freq: 0.032, speed: 1.3, alpha: 0.45, width: 1.5 },
      { amp: 10, freq: 0.055, speed: 0.5, alpha: 0.25, width: 1 },
      { amp: 38, freq: 0.009, speed: 0.4, alpha: 0.15, width: 3.5 },
    ];

    waves.forEach(({ amp, freq, speed, alpha, width }) => {
      ctx.beginPath();
      ctx.lineWidth = width;

      const gradient = ctx.createLinearGradient(0, 0, W, 0);
      gradient.addColorStop(0, `rgba(250, 250, 250, 0)`);
      gradient.addColorStop(0.2, `rgba(250, 250, 250, ${alpha})`);
      gradient.addColorStop(0.5, `rgba(250, 250, 250, ${alpha * 1.4})`);
      gradient.addColorStop(0.8, `rgba(250, 250, 250, ${alpha})`);
      gradient.addColorStop(1, `rgba(250, 250, 250, 0)`);
      ctx.strokeStyle = gradient;

      for (let x = 0; x <= W; x += 2) {
        const envelope =
          Math.sin((x / W) * Math.PI) *
          (0.7 + 0.3 * Math.sin(time * 0.6 + x * 0.002));
        const y =
          H / 2 +
          Math.sin(x * freq + time * speed) * amp * envelope +
          Math.sin(x * freq * 2.1 + time * speed * 1.7) * (amp * 0.3) * envelope;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    });

    // Scanning line
    const scanX = (time * 80) % W;
    const scanGrad = ctx.createLinearGradient(scanX - 60, 0, scanX + 4, 0);
    scanGrad.addColorStop(0, "rgba(250,250,250,0)");
    scanGrad.addColorStop(1, "rgba(250,250,250,0.35)");
    ctx.fillStyle = scanGrad;
    ctx.fillRect(scanX - 60, 0, 64, H);
  });

  return (
    <canvas
      ref={canvasRef}
      width={900}
      height={160}
      className="w-full"
      style={{ display: "block" }}
    />
  );
}

// ─── Neural Core Visualizer ───────────────────────────────────────────────────

function NeuralCore({ load }: { load: number }) {
  // load: 0-100
  const pulseScale = 1 + (load / 100) * 0.12;
  const ringOpacity = 0.15 + (load / 100) * 0.35;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Label */}
      <div className="flex items-center gap-2">
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          className="h-1.5 w-1.5 rounded-full bg-zinc-100"
        />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-400">
          Neural Core
        </span>
        <motion.span
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="h-1.5 w-1.5 rounded-full bg-zinc-100"
        />
      </div>

      {/* Core geometry */}
      <div className="relative flex items-center justify-center" style={{ width: 180, height: 180 }}>
        {/* Outer rings */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-zinc-100"
            style={{
              width: 60 + i * 38,
              height: 60 + i * 38,
              opacity: ringOpacity / i,
            }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{
              duration: 8 + i * 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Pulsing core */}
        <motion.div
          className="relative flex items-center justify-center rounded-full border border-zinc-100"
          style={{ width: 72, height: 72, backgroundColor: "rgba(250,250,250,0.04)" }}
          animate={{ scale: [1, pulseScale, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Inner hexagon-like shape via clip */}
          <motion.div
            className="flex items-center justify-center"
            style={{
              width: 40,
              height: 40,
              background: "radial-gradient(circle, rgba(250,250,250,0.18) 0%, rgba(250,250,250,0.02) 100%)",
              clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>

        {/* Corner node dots */}
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180;
          const r = 82;
          const x = 90 + r * Math.cos(rad);
          const y = 90 + r * Math.sin(rad);
          return (
            <motion.div
              key={deg}
              className="absolute h-1.5 w-1.5 rounded-full bg-zinc-100"
              style={{ left: x - 3, top: y - 3 }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: (deg / 360) * 2,
              }}
            />
          );
        })}
      </div>

      {/* Neural Load bar */}
      <div className="w-full max-w-[200px]">
        <div className="mb-1.5 flex justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">
            Neural Load
          </span>
          <span className="text-[9px] font-bold tabular-nums text-zinc-300">
            {load}%
          </span>
        </div>
        <div className="h-0.5 w-full overflow-hidden rounded-full bg-zinc-800">
          <motion.div
            className="h-full rounded-full bg-zinc-100"
            animate={{ width: `${load}%` }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Live Data Stream ─────────────────────────────────────────────────────────

interface StreamValue {
  label: string;
  value: string;
  unit: string;
  history: number[];
}

function LiveDataStream({ stream }: { stream: StreamValue }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-500">
          {stream.label}
        </span>
        <span className="font-mono text-sm font-bold tabular-nums text-zinc-100">
          {stream.value}
          <span className="ml-0.5 text-[10px] font-normal text-zinc-500">{stream.unit}</span>
        </span>
      </div>
      {/* Mini sparkline */}
      <div className="flex h-6 items-end gap-px">
        {stream.history.map((v, i) => {
          const max = Math.max(...stream.history);
          const min = Math.min(...stream.history);
          const pct = max === min ? 0.5 : (v - min) / (max - min);
          return (
            <motion.div
              key={i}
              className="flex-1 rounded-sm bg-zinc-100"
              style={{ height: `${Math.max(15, pct * 100)}%`, opacity: 0.15 + pct * 0.7 }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
            />
          );
        })}
      </div>
    </div>
  );
}

// ─── Terminal Log Block ───────────────────────────────────────────────────────

const ALL_LOG_LINES = [
  "Initializing neural handshake...",
  "Signal integrity verified.",
  "Encryption layer: AES-512 active",
  "Latency probe: 11ms — nominal",
  "Node NEBULA-7 authenticated",
  "Throughput: 4.2 TB/s sustained",
  "Sync stability: 99.2% — locked",
  "Calibrating frequency bands...",
  "Backup channel standby: OK",
  "Neural mesh topology: stable",
  "Packet loss: 0.003% — optimal",
  "Handshake timeout: none",
  "Quantum key exchange: complete",
  "Signal routing: optimized",
  "Core temperature: nominal",
  "Memory allocation: 87% efficient",
];

function TerminalLog({ title, startIndex = 0 }: { title: string; startIndex?: number }) {
  const [lines, setLines] = useState<string[]>([]);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize with staggered lines to avoid hydration mismatch
    const initial = ALL_LOG_LINES.slice(startIndex, startIndex + 4);
    setLines(initial);
    setInitialized(true);

    const id = setInterval(() => {
      setLines((prev) => {
        const nextIdx = (ALL_LOG_LINES.indexOf(prev[prev.length - 1]) + 1) % ALL_LOG_LINES.length;
        return [...prev.slice(-3), ALL_LOG_LINES[nextIdx]];
      });
    }, 2800);

    return () => clearInterval(id);
  }, [startIndex]);

  if (!initialized) return null;

  return (
    <div
      className="rounded-lg border border-zinc-800 bg-zinc-950 p-3"
      style={{ fontFamily: "'JetBrains Mono', 'Fira Code', 'Courier New', monospace" }}
    >
      <div className="mb-2 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-zinc-600" />
        <span className="ml-1 text-[9px] font-bold uppercase tracking-widest text-zinc-600">
          {title}
        </span>
      </div>
      <div className="space-y-1 overflow-hidden">
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.p
              key={line + i}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: i === lines.length - 1 ? 1 : 0.4, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="truncate text-[10px] leading-relaxed text-zinc-500"
            >
              <span className="mr-1.5 text-zinc-700">›</span>
              {line}
            </motion.p>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Live metric that ticks slightly ─────────────────────────────────────────

function LiveMetric({
  label,
  value,
  unit,
  icon: Icon,
  delay = 0,
}: {
  label: string;
  value: string;
  unit?: string;
  icon: React.ElementType;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className="group relative overflow-hidden rounded-xl border px-6 py-6 transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border-color)",
        boxShadow: "var(--card-shadow)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
        e.currentTarget.style.borderColor = "var(--border-color-strong)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "var(--card-bg)";
        e.currentTarget.style.borderColor = "var(--border-color)";
      }}
    >
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle, rgba(250,250,250,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="flex items-start justify-between">
        <div>
          <p
            className="mb-3 text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-tertiary)" }}
          >
            {label}
          </p>
          <p
            className="text-3xl font-bold tracking-tight tabular-nums"
            style={{ color: "var(--text-primary)" }}
          >
            {value}
            {unit && (
              <span
                className="ml-1 text-base font-medium"
                style={{ color: "var(--text-tertiary)" }}
              >
                {unit}
              </span>
            )}
          </p>
        </div>
        <div
          className="rounded-lg p-2.5 transition-all duration-200 group-hover:scale-105"
          style={{ backgroundColor: "var(--background-elevated)" }}
        >
          <Icon
            className="h-5 w-5 shrink-0"
            strokeWidth={1.5}
            style={{ color: "var(--text-secondary)" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Signal Feed Item ─────────────────────────────────────────────────────────

interface FeedItem {
  id: string;
  source: string;
  message: string;
  time: string;
  strength: number;
  type: "incoming" | "outgoing" | "system";
}

const feedItems: FeedItem[] = [
  {
    id: "1",
    source: "NEBULA-7",
    message: "Handshake confirmed. Encryption layer active.",
    time: "11:58:42",
    strength: 98,
    type: "incoming",
  },
  {
    id: "2",
    source: "PHOENIX-3",
    message: "Payload delivered. Awaiting acknowledgment.",
    time: "11:57:19",
    strength: 74,
    type: "outgoing",
  },
  {
    id: "3",
    source: "SYS",
    message: "Neural link recalibrated. Latency optimized.",
    time: "11:55:01",
    strength: 100,
    type: "system",
  },
  {
    id: "4",
    source: "COSMOS-2",
    message: "Signal degraded. Switching to backup channel.",
    time: "11:52:33",
    strength: 41,
    type: "incoming",
  },
  {
    id: "5",
    source: "STELLAR-9",
    message: "Broadcast initiated. Frequency locked at 2.4 GHz.",
    time: "11:49:07",
    strength: 87,
    type: "outgoing",
  },
  {
    id: "6",
    source: "SYS",
    message: "Integrity check passed. All nodes synchronized.",
    time: "11:45:00",
    strength: 100,
    type: "system",
  },
];

const typeConfig = {
  incoming: { label: "IN", color: "var(--status-success)", bg: "var(--status-success-bg)" },
  outgoing: { label: "OUT", color: "var(--accent)", bg: "var(--accent-muted)" },
  system: { label: "SYS", color: "var(--text-tertiary)", bg: "var(--background-elevated)" },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SignalsPage() {
  const [tick, setTick] = useState(0);

  // Live data state — initialized in useEffect to avoid hydration mismatch
  const [latencyMs, setLatencyMs] = useState(11);
  const [throughput, setThroughput] = useState(4.2);
  const [syncStability, setSyncStability] = useState(99.2);
  const [neuralLoad, setNeuralLoad] = useState(62);
  const [latencyHistory, setLatencyHistory] = useState<number[]>([]);
  const [throughputHistory, setThroughputHistory] = useState<number[]>([]);
  const [syncHistory, setSyncHistory] = useState<number[]>([]);

  useEffect(() => {
    // Seed histories with deterministic-ish values to avoid hydration issues
    setLatencyHistory([11, 12, 10, 13, 11, 14, 12, 11, 13, 10, 12, 14, 11, 12, 10]);
    setThroughputHistory([4.1, 4.3, 4.2, 4.4, 4.1, 4.3, 4.2, 4.5, 4.2, 4.3, 4.1, 4.4, 4.2, 4.3, 4.2]);
    setSyncHistory([99.1, 99.3, 99.2, 99.4, 99.2, 99.1, 99.3, 99.2, 99.4, 99.2, 99.3, 99.1, 99.2, 99.3, 99.2]);

    const id = setInterval(() => {
      setTick((n) => n + 1);

      // Latency: 8–14 ms oscillation
      setLatencyMs((prev) => {
        const next = Math.round(8 + Math.random() * 6);
        setLatencyHistory((h) => [...h.slice(-14), next]);
        return next;
      });

      // Throughput: 4.0–4.6 TB/s
      setThroughput(() => {
        const next = parseFloat((4.0 + Math.random() * 0.6).toFixed(1));
        setThroughputHistory((h) => [...h.slice(-14), next]);
        return next;
      });

      // Sync stability: 98.8–99.6%
      setSyncStability(() => {
        const next = parseFloat((98.8 + Math.random() * 0.8).toFixed(1));
        setSyncHistory((h) => [...h.slice(-14), next]);
        return next;
      });

      // Neural load: 55–85%
      setNeuralLoad(Math.round(55 + Math.random() * 30));
    }, 2000);

    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="min-h-screen p-8 md:p-10"
      data-signals
      style={{ backgroundColor: "var(--background)" }}
    >
      {/* Header */}
      <div className="mb-10 flex items-start justify-between gap-6">
        <motion.header
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex-1 rounded-xl border px-7 py-6 transition-all duration-200"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          <h1
            className="text-lg font-semibold tracking-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Signal İstihbaratı. Sinir Bağlantısı Aktif.
          </h1>
          <p
            className="mt-1.5 text-sm"
            style={{ color: "var(--text-secondary)" }}>
            Frekansı izleme • Gerçek zamanlı telemetri
          </p>
        </motion.header>
      </div>

      {/* ── Frequency Scanner ──────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-10"
      >
        <div
          className="relative overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {/* Top bar */}
          <div
            className="flex items-center justify-between border-b px-7 py-4"
            style={{ borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-lg"
                style={{ backgroundColor: "var(--background-elevated)" }}
              >
                <Radio
                  className="h-4 w-4"
                  strokeWidth={1.5}
                  style={{ color: "var(--text-secondary)" }}
                />
              </div>
              <div>
                <p
                  className="text-sm font-bold tracking-tight"
                  style={{ color: "var(--text-primary)" }}
                >
                  Frekans Tarayıcısı
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--text-tertiary)" }}
                >
                  Hareket odaklı dalga formu analizi
                </p>
              </div>
            </div>
            {/* Live indicator */}
            <div className="flex items-center gap-2">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--status-success)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ color: "var(--status-success)" }}
              >
                Live
              </span>
            </div>
          </div>

          {/* Canvas wave */}
          <div className="px-4 py-6">
            <FrequencyScanner />
          </div>

          {/* Subtle vignette overlay */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 40%, var(--card-bg) 100%)",
              opacity: 0.4,
            }}
          />
        </div>
      </motion.section>

      {/* ── Neural Link Section ─────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="mb-10"
      >
        <div
          className="relative overflow-hidden rounded-2xl border"
          style={{
            backgroundColor: "#09090b", // zinc-950 hardcoded for cinematic feel
            borderColor: "var(--border-color)",
            boxShadow: "var(--shadow-md)",
          }}
        >
          {/* Section label */}
          <div
            className="flex items-center gap-3 border-b px-7 py-4"
            style={{ borderColor: "rgba(63,63,70,0.5)" }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900">
              <Zap className="h-4 w-4 text-zinc-400" strokeWidth={1.5} />
            </div>
            <div>
              <p className="text-sm font-bold tracking-tight text-zinc-100">
                Neural Link Interface
              </p>
              <p className="text-xs text-zinc-500">
                Live simulation — mesh topology active
              </p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 0.9, repeat: Infinity }}
                className="h-1.5 w-1.5 rounded-full bg-zinc-100"
              />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                Online
              </span>
            </div>
          </div>

          {/* Main content: Neural Core + Live Streams + Terminal Logs */}
          <div className="grid gap-0 lg:grid-cols-[1fr_auto_1fr]">
            {/* Left terminal */}
            <div className="flex flex-col justify-between gap-4 p-6">
              <TerminalLog title="SYS / CORE" startIndex={0} />
              <TerminalLog title="NET / LINK" startIndex={5} />
              <TerminalLog title="SEC / AUTH" startIndex={10} />
            </div>

            {/* Center: Neural Core */}
            <div
              className="flex flex-col items-center justify-center border-x px-8 py-8"
              style={{ borderColor: "rgba(63,63,70,0.4)" }}
            >
              <NeuralCore load={neuralLoad} />
            </div>

            {/* Right: Live Data Streams */}
            <div className="flex flex-col justify-center gap-6 p-6">
              <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <p className="mb-4 text-[9px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                  Live Data Streams
                </p>
                <div className="space-y-5">
                  <LiveDataStream
                    stream={{
                      label: "Latency",
                      value: String(latencyMs),
                      unit: "ms",
                      history: latencyHistory,
                    }}
                  />
                  <LiveDataStream
                    stream={{
                      label: "Neural Throughput",
                      value: throughput.toFixed(1),
                      unit: "TB/s",
                      history: throughputHistory,
                    }}
                  />
                  <LiveDataStream
                    stream={{
                      label: "Sync Stability",
                      value: syncStability.toFixed(1),
                      unit: "%",
                      history: syncHistory,
                    }}
                  />
                </div>
              </div>

              {/* Status grid */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Nodes", value: "14" },
                  { label: "Channels", value: "3" },
                  { label: "Packets/s", value: "8.4K" },
                  { label: "Errors", value: "0" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="rounded-md border border-zinc-800 bg-zinc-900/50 px-3 py-2"
                  >
                    <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                      {s.label}
                    </p>
                    <p className="mt-0.5 font-mono text-sm font-bold tabular-nums text-zinc-100">
                      {s.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── High-Tech Metrics ──────────────────────────────────────────────── */}
      <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <LiveMetric
          label="Signal Bütünlüğü"
          value="98.4"
          unit="%"
          icon={Signal}
          delay={0.15}
        />
        <LiveMetric
          label="Sinir Bağlantısı"
          value="Aktif"
          icon={Zap}
          delay={0.21}
        />
        <LiveMetric
          label="Gecikme"
          value={String(latencyMs)}
          unit="ms"
          icon={Activity}
          delay={0.27}
        />
      </div>

      {/* ── Signal Feed ────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2
            className="text-sm font-bold uppercase tracking-wider"
            style={{ color: "var(--text-primary)" }}
          >
            Signal Beslemesi
          </h2>
          <div className="flex items-center gap-2">
            <Eye
              className="h-4 w-4"
              strokeWidth={1.5}
              style={{ color: "var(--text-tertiary)" }}
            />
            <span
              className="text-xs font-medium"
              style={{ color: "var(--text-tertiary)" }}
            >
              6 kanal izleniyor
            </span>
          </div>
        </div>

        <div
          className="overflow-hidden rounded-xl border"
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--border-color)",
            boxShadow: "var(--card-shadow)",
          }}
        >
          {feedItems.map((item, index) => {
            const cfg = typeConfig[item.type];
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: 0.35 + index * 0.05,
                  ease: [0.4, 0, 0.2, 1],
                }}
                className="group flex items-center gap-5 px-6 py-4 transition-all duration-200"
                style={{
                  borderBottom:
                    index < feedItems.length - 1
                      ? "1px solid var(--border-color)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--card-bg-hover)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <span
                  className="shrink-0 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                  style={{ backgroundColor: cfg.bg, color: cfg.color }}
                >
                  {cfg.label}
                </span>

                <span
                  className="w-24 shrink-0 truncate text-xs font-bold tracking-wider"
                  style={{ color: "var(--text-primary)" }}
                >
                  {item.source}
                </span>

                <span
                  className="flex-1 truncate text-sm"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.message}
                </span>

                <div className="hidden items-center gap-2 sm:flex">
                  <div
                    className="h-1.5 w-20 overflow-hidden rounded-full"
                    style={{ backgroundColor: "var(--border-color-subtle)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${item.strength}%`,
                        backgroundColor:
                          item.strength > 70
                            ? "var(--status-success)"
                            : item.strength > 40
                              ? "var(--accent)"
                              : "var(--status-warning)",
                      }}
                    />
                  </div>
                  <span
                    className="w-8 text-right text-xs font-semibold tabular-nums"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {item.strength}%
                  </span>
                </div>

                <span
                  className="shrink-0 text-xs font-medium tabular-nums"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.time}
                </span>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ── Bottom stats row ───────────────────────────────────────────────── */}
      <div className="mt-8 grid gap-5 sm:grid-cols-3">
        {[
          { label: t.signalsPage.stats.activeChannels, value: "14", icon: Wifi },
          { label: t.signalsPage.stats.dataTransferred, value: "2.4 TB", icon: TrendingUp },
          { label: t.signalsPage.stats.uptime, value: "99.97%", icon: Activity },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + index * 0.07,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="group rounded-xl border px-6 py-5 transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border-color)",
                boxShadow: "var(--card-shadow)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg-hover)";
                e.currentTarget.style.borderColor =
                  "var(--border-color-strong)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--card-bg)";
                e.currentTarget.style.borderColor = "var(--border-color)";
              }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p
                    className="mb-2 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {stat.label}
                  </p>
                  <p
                    className="text-2xl font-bold tracking-tight tabular-nums"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {stat.value}
                  </p>
                </div>
                <div
                  className="rounded-lg p-2.5 transition-all duration-200 group-hover:scale-105"
                  style={{ backgroundColor: "var(--background-elevated)" }}
                >
                  <Icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={1.5}
                    style={{ color: "var(--text-secondary)" }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
