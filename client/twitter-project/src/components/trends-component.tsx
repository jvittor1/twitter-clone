import { trends } from "@/utils/mock-trends";
import { FaGear } from "react-icons/fa6";

interface TrendsItemProps {
  title: string;
  tweets: number;
}

function TrendsItem({ title, tweets }: TrendsItemProps) {
  return (
    <div className="space-1 flex flex-col border-t border-zinc-700 px-4 py-2">
      <span className="text-xs font-semibold text-zinc-600">Trending</span>
      <h3 className="text-md font-bold text-zinc-300">#{title}</h3>
      <span className="text-xs font-semibold text-zinc-600">
        {tweets} Tweets
      </span>
    </div>
  );
}

export default function TrendsComponent() {
  const data_trends = trends;
  return (
    <div className="max-h-[85dvh] flex-col items-start space-y-2 overflow-y-auto rounded-xl border border-zinc-700 bg-zinc-800 py-2">
      <h2 className="text-md flex w-full items-center justify-between px-4 font-semibold text-white">
        Trends for you
        <span>
          {" "}
          <FaGear className="text-sm text-blue-500" />
        </span>
      </h2>

      <div className="flex w-full flex-col space-y-2">
        {data_trends.map((trend, index) => (
          <TrendsItem key={index} title={trend.title} tweets={trend.tweets} />
        ))}
      </div>

      <span className="block w-full border-t border-zinc-700 px-4 py-2 text-sm text-blue-500">
        Show more
      </span>
    </div>
  );
}
