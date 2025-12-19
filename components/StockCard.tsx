type StockCardProps={symbol:string;price:number;change:number;changePercent:number;lastUpdated:string;marketOpen:boolean;};
export default function StockCard({symbol,price,change,changePercent,lastUpdated,marketOpen}:StockCardProps){
  return (
    <div className="p-4 m-2 rounded-lg bg-gray-800 w-64 flex flex-col items-center">
      <h2 className="text-xl font-bold">{symbol}</h2>
      <p className="text-2xl mt-2">${price.toFixed(2)}</p>
      <p className={`mt-1 ${change>=0?"text-green-400":"text-red-400"}`}>{change>=0?"+":""}{change.toFixed(2)} ({changePercent.toFixed(2)}%)</p>
      <p className="mt-1 text-sm">Last updated: {lastUpdated}</p>
      <p className={`mt-1 font-semibold ${marketOpen?"text-green-400":"text-red-400"}`}>{marketOpen?"Market Open":"Market Closed"}</p>
    </div>
  );
}