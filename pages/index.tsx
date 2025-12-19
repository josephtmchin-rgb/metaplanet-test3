import useSWR from "swr";
import StockCard from "../components/StockCard";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/stocks", fetcher, { refreshInterval: 5000 });
  if (error) return <div className="p-10">Error loading stocks</div>;
  if (!data) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center py-10">
      <h1 className="text-4xl mb-8">Global Stock Dashboard</h1>
      <div className="flex flex-wrap justify-center">
        {data.map((stock: any) => (<StockCard key={stock.symbol} {...stock} />))}
      </div>
    </div>
  );
}