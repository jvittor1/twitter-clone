import { useUser } from "@/context/user-context";
import { FaSquareXTwitter } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { SideBarComponent } from "@/components/sidebar-component";
import { Input } from "@/components/ui/input";
import TrendsComponent from "@/components/trends-component";
import { HiOutlineSparkles } from "react-icons/hi";
import CreateTweetComponent from "@/components/create-tweet-componet";
import PageTitleComponent from "@/components/page-title-component";
import FeedComponent from "@/components/feed-component";

export default function Home() {
  const { user } = useUser();

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-xl font-semibold text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full justify-between space-x-6 px-8">
      <aside className="h-full w-56 space-y-8 px-8 py-4">
        <FaSquareXTwitter className="text-2xl text-zinc-400" />

        <SideBarComponent />

        <Button className="w-full rounded-full" variant={"secondary"}>
          Tweet
        </Button>
      </aside>

      <main className="flex max-w-[52rem] flex-1 flex-col space-y-3 border-l border-r border-zinc-700 py-4 pb-0 text-white">
        <PageTitleComponent title="Home" icon={HiOutlineSparkles} />

        <CreateTweetComponent />

        <FeedComponent />
      </main>

      <aside className="h-full w-64 space-y-4 py-4">
        <Input
          placeholder="Search Twitter"
          type="search"
          className="w-full rounded-full border-none bg-zinc-800 px-4 py-2 text-sm text-zinc-400 outline-none"
        />

        <TrendsComponent />
      </aside>
    </div>
  );
}
