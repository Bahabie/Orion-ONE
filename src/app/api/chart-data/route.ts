import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/chart-data?symbol=BTC&range=1m
 *
 * All assets are crypto — uses Binance /api/v3/klines (public, no key).
 * Returns: { symbol, range, data: [{ x: timestamp_ms, y: closePrice }] }
 */

type DataPoint = { x: number; y: number };

const BINANCE_BASE = "https://data-api.binance.vision";

// All 5 holdings → Binance trading pairs
const BINANCE_PAIRS: Record<string, string> = {
  BTC: "BTCUSDT",
  ETH: "ETHUSDT",
  SOL: "SOLUSDT",
  BNB: "BNBUSDT",
  XRP: "XRPUSDT",
};

// Range → Binance kline interval + lookback days
const RANGE_CONFIG: Record<string, { days: number; interval: string }> = {
  "1d": { days: 1,   interval: "1h"  },
  "1w": { days: 7,   interval: "1h"  },
  "1m": { days: 30,  interval: "4h"  },
  "3m": { days: 90,  interval: "1d"  },
  "1y": { days: 365, interval: "1d"  },
};

async function fetchBinanceKlines(
  pair: string,
  interval: string,
  days: number
): Promise<DataPoint[]> {
  const startTime = Date.now() - days * 24 * 60 * 60 * 1000;
  const limit = Math.min(
    1000,
    days * (interval === "1h" ? 24 : interval === "4h" ? 6 : 1)
  );

  const url = `${BINANCE_BASE}/api/v3/klines?symbol=${pair}&interval=${interval}&startTime=${startTime}&limit=${limit}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) throw new Error(`Binance klines ${res.status}`);

  // Binance klines: [openTime, open, high, low, close, volume, ...]
  const raw: [number, string, string, string, string, ...unknown[]][] =
    await res.json();

  return raw.map(([openTime, , , , close]) => ({
    x: openTime,
    y: parseFloat(close as string),
  }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = (searchParams.get("symbol") ?? "").toUpperCase();
  const range = searchParams.get("range") ?? "1m";
  const config = RANGE_CONFIG[range] ?? RANGE_CONFIG["1m"];

  if (!symbol) {
    return NextResponse.json({ error: "symbol required" }, { status: 400 });
  }

  const pair = BINANCE_PAIRS[symbol];
  if (!pair) {
    return NextResponse.json(
      { symbol, range, data: [], error: `Unknown symbol: ${symbol}` },
      { status: 200 }
    );
  }

  try {
    const data = await fetchBinanceKlines(pair, config.interval, config.days);
    return NextResponse.json(
      { symbol, range, data },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      { symbol, range, data: [], error: String(err) },
      { status: 200 }
    );
  }
}
