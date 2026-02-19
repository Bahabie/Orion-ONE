import { NextResponse } from "next/server";

/**
 * GET /api/crypto-prices
 *
 * Fetches real-time prices for BTC, ETH, SOL, BNB, XRP from Binance public API.
 * No API key required. Returns CoinGecko-compatible shape for page.tsx.
 *
 * Returns: { bitcoin: { usd: 95000 }, ethereum: { usd: 3200 }, ... }
 */

const BINANCE_BASE = "https://data-api.binance.vision";

// Our 5 holdings → Binance trading pairs
const PAIRS = [
  { id: "bitcoin",  symbol: "BTC", pair: "BTCUSDT" },
  { id: "ethereum", symbol: "ETH", pair: "ETHUSDT" },
  { id: "solana",   symbol: "SOL", pair: "SOLUSDT" },
  { id: "bnb",      symbol: "BNB", pair: "BNBUSDT" },
  { id: "ripple",   symbol: "XRP", pair: "XRPUSDT" },
];

export async function GET() {
  try {
    // Single batch request — all symbols at once
    const symbols = PAIRS.map((p) => `"${p.pair}"`).join(",");
    const url = `${BINANCE_BASE}/api/v3/ticker/price?symbols=[${symbols}]`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Binance API error" }, { status: 502 });
    }

    const data: { symbol: string; price: string }[] = await res.json();

    // Build a map: BTCUSDT → price
    const priceMap: Record<string, number> = {};
    for (const item of data) {
      priceMap[item.symbol] = parseFloat(item.price);
    }

    // Return in CoinGecko-compatible shape so page.tsx needs no changes
    const result: Record<string, { usd: number }> = {};
    for (const { id, pair } of PAIRS) {
      const price = priceMap[pair];
      if (price && !isNaN(price)) {
        result[id] = { usd: price };
      }
    }

    return NextResponse.json(result, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return NextResponse.json({ error: "Connection failed" }, { status: 502 });
  }
}
