import { useUser } from "@/context/user-context";
import { FaSquareXTwitter } from "react-icons/fa6";
import { SideBarComponent } from "@/components/sidebar-component";
import { Input } from "@/components/ui/input";
import TrendsComponent from "@/components/trends-component";
import { HiOutlineSparkles } from "react-icons/hi";
import CreateTweetComponent from "@/components/create-tweet-componet";
import PageTitleComponent from "@/components/page-title-component";
import FeedComponent from "@/components/feed-component";
import SideBarButtonsComponent from "@/components/sidebar-buttons-component";

export default function Home() {
  const { isLoading } = useUser();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-xl font-semibold text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full justify-between px-4 md:space-x-6 md:px-8">
      <aside className="hidden h-full w-56 space-y-8 px-8 py-4 md:block">
        <FaSquareXTwitter className="text-2xl text-zinc-400" />

        <SideBarComponent />

        <SideBarButtonsComponent />
      </aside>

      <main className="flex flex-1 flex-col space-y-3 overflow-y-auto border-zinc-700 py-4 pb-0 text-white md:border-l md:border-r xl:max-w-[52rem] 2xl:max-w-[64rem]">
        <PageTitleComponent title="Home" icon={HiOutlineSparkles} />

        <CreateTweetComponent />

        <FeedComponent />
      </main>

      <aside className="hidden h-full w-64 space-y-4 py-4 lg:block">
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
