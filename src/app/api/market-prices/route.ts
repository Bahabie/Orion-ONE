import { NextRequest, NextResponse } from "next/server";

/**
 * GET /api/market-prices?symbols=AAPL,TSLA,VTI
 *
 * Fetches real-time stock quotes via Stooq public CSV API.
 * No API key required. No rate limiting for reasonable usage.
 * Returns: { AAPL: 263.88, TSLA: 410.63, VTI: 337.07 }
 *
 * Stooq CSV format: Symbol,Date,Time,Open,High,Low,Close,Volume
 */

// Stooq uses lowercase ticker.us for US stocks/ETFs
function toStooqSymbol(ticker: string): string {
  return `${ticker.toLowerCase()}.us`;
}

async function fetchStooqQuote(symbol: string): Promise<number | null> {
  try {
    const stooqSym = toStooqSymbol(symbol);
    const url = `https://stooq.com/q/l/?s=${stooqSym}&f=sd2t2ohlcv&h&e=csv`;
    const res = await fetch(url, { cache: "no-store" });

    if (!res.ok) return null;

    const text = await res.text();
    // CSV: header line + data line
    // "Symbol,Date,Time,Open,High,Low,Close,Volume"
    // "AAPL.US,2026-02-17,22:00:19,258.05,266.29,255.54,263.88,58469094"
    const lines = text.trim().split("\n");
    if (lines.length < 2) return null;

    const cols = lines[1].split(",");
    // Close is index 6
    const close = parseFloat(cols[6]);
    return isNaN(close) || close <= 0 ? null : close;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const rawSymbols = searchParams.get("symbols") ?? "";
  const symbols = rawSymbols
    .split(",")
    .map((s) => s.trim().toUpperCase())
    .filter(Boolean);

  if (symbols.length === 0) {
    return NextResponse.json({ error: "symbols required" }, { status: 400 });
  }

  // Fetch all symbols in parallel — Stooq handles concurrent requests fine
  const entries = await Promise.all(
    symbols.map(async (sym) => [sym, await fetchStooqQuote(sym)] as const)
  );

  const result = Object.fromEntries(entries);

  return NextResponse.json(result, {
    headers: { "Cache-Control": "no-store" },
  });
}
