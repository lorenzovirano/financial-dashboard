import YahooFinance from 'yahoo-finance2';
import MarketPrice from './marketPrice.model';

const yahooFinance = new YahooFinance();

const CACHE_DURATION_MS = 15 * 60 * 1000; 

export const getLivePrice = async (symbol: string, type: string): Promise<number> => {
  try {
    const cached = await MarketPrice.findOne({ symbol });
    const now = new Date();

    if (cached && (now.getTime() - cached.lastUpdated.getTime()) < CACHE_DURATION_MS) {
      return cached.currentPrice;
    }
    let fetchSymbol = symbol;
    if (type === 'crypto' && !symbol.includes('-USD')) {
      fetchSymbol = `${symbol}-USD`;
    }

    const quote = (await yahooFinance.quote(fetchSymbol)) as any;
    console.log(`Dati Yahoo per ${fetchSymbol}:`, quote);
    const currentPrice = quote.regularMarketPrice || 0;

    if (currentPrice > 0) {
      await MarketPrice.findOneAndUpdate(
        { symbol },
        { currentPrice, lastUpdated: now },
        { upsert: true, new: true }
      );
    }

    return currentPrice;

  } catch (error) {
    console.error(`⚠️ Errore API per ${symbol}:`, error);
    
   
    const fallback = await MarketPrice.findOne({ symbol });
    return fallback ? fallback.currentPrice : 0;
  }
};