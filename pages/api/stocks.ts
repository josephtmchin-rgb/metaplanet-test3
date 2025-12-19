import type { NextApiRequest, NextApiResponse } from "next";
const TICKERS = ["AAPL", "MSFT", "TSLA", "AMZN", "GOOG"];

type Market = { openHourUTC: number; openMinuteUTC: number; closeHourUTC: number; closeMinuteUTC: number; };
const MARKET_HOURS: Record<string, Market> = {
  "AAPL": {openHourUTC:14,openMinuteUTC:30,closeHourUTC:21,closeMinuteUTC:0},
  "MSFT": {openHourUTC:14,openMinuteUTC:30,closeHourUTC:21,closeMinuteUTC:0},
  "TSLA": {openHourUTC:14,openMinuteUTC:30,closeHourUTC:21,closeMinuteUTC:0},
  "AMZN": {openHourUTC:14,openMinuteUTC:30,closeHourUTC:21,closeMinuteUTC:0},
  "GOOG": {openHourUTC:14,openMinuteUTC:30,closeHourUTC:21,closeMinuteUTC:0}
};

function isMarketOpen(market: Market, now: Date) {
  const openTime = new Date(now); openTime.setUTCHours(market.openHourUTC, market.openMinuteUTC,0,0);
  const closeTime=new Date(now); closeTime.setUTCHours(market.closeHourUTC, market.closeMinuteUTC,0,0);
  return now>=openTime && now<=closeTime;
}

export default async function handler(req: NextApiRequest,res:NextApiResponse){
  try {
    const response=await fetch(`https://query1.finance.yahoo.com/v7/finance/quote?symbols=${TICKERS.join(",")}`);
    const json=await response.json();
    const results=json.quoteResponse.result.map((stock:any)=>{
      const now=new Date();
      const marketOpen=isMarketOpen(MARKET_HOURS[stock.symbol],now);
      return {
        symbol:stock.symbol,
        price:stock.regularMarketPrice,
        change:stock.regularMarketChange,
        changePercent:stock.regularMarketChangePercent,
        lastUpdated:now.toLocaleTimeString(),
        marketOpen
      };
    });
    res.status(200).json(results);
  } catch(error){ console.error(error); res.status(500).json({error:"Failed to fetch stock data"}); }
}