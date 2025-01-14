import { IoChatbubble } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BiRepost } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { useTweet } from "@/context/tweet-context";
import { Tweet } from "@/models/tweet-model";
import { useUser } from "@/context/user-context";
import { LikedTweets } from "@/models/user";
import { deleteTweet, likeTweet, unlikeTweet } from "@/services/tweet-service";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import { CiMenuKebab } from "react-icons/ci";
import { Button } from "./ui/button";
import { FaTrash } from "react-icons/fa6";

interface FeedItemComponentProps {
  id: number;
  username: string;
  email: string;
  timeAgo?: string;
  content: string;
}

function FeedComponentItem({
  id,
  username,
  email,
  timeAgo,
  content,
}: FeedItemComponentProps) {
  const { user } = useUser();
  const { loadTweets } = useTweet();
  const isOwner = user?.username === username;

  const handleDelete = () => {
    const token = localStorage.getItem("token") || "";
    try {
      deleteTweet(token, id, loadTweets);
    } catch (error) {
      console.error("Delete tweet error: ", error);
    }
  };

  return (
    <div className="flex items-start justify-between space-x-3 border-b border-zinc-700 px-2 py-2">
      <Avatar className="h-10 w-10">
        <AvatarImage
          src={
            username == user.username
              ? "https://github.com/jvittor1.png"
              : "https://github.com/shadcn.png"
          }
          alt="profile picture"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-md font-bold text-white">{username}</h3>
          <p className="text-md text-zinc-700">{email}</p>
          <p className="text-md text-zinc-700">·</p>
          <p className="text-md text-zinc-700">{timeAgo}</p>

          {isOwner && (
            <div className="text-md flex flex-1 items-center justify-end text-zinc-700">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-transparent hover:bg-transparent focus:bg-transparent active:bg-transparent">
                    <CiMenuKebab className="cursor-pointer text-lg text-zinc-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={handleDelete}
                    className="flex cursor-pointer items-center rounded-md border border-zinc-600 bg-zinc-800 px-3 py-1 text-zinc-400 transition-colors duration-150 ease-in-out hover:bg-zinc-600 hover:text-white"
                  >
                    <FaTrash className="mr-1 inline-block" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <p className="text-md text-white">{content}</p>
        <FeedButtonComponent tweetId={id} />
      </div>
    </div>
  );
}

function FeedButtonComponent({ tweetId }: { tweetId: number }) {
  const { user } = useUser();
  const [isLiked, setIsLiked] = useState(() =>
    user?.likedTweets.some((tweet: LikedTweets) => tweet.id === tweetId),
  );
  const handleLike = () => {
    const token = localStorage.getItem("token") || "";
    if (isLiked) {
      unlikeTweet(token, tweetId).then((data) => {
        if (data) setIsLiked(false);
        return;
      });
    }
    likeTweet(token, tweetId).then((data) => {
      if (data) setIsLiked(true);
    });
  };

  return (
    <div className="flex w-full items-center justify-around text-zinc-700">
      <IoChatbubble className="cursor-pointer text-xl transition-colors duration-150 ease-in-out hover:text-zinc-400" />
      <BiRepost className="cursor-pointer text-2xl transition-colors duration-150 ease-in-out hover:text-green-600" />
      {isLiked ? (
        <IoMdHeart
          onClick={handleLike}
          className="cursor-pointer text-2xl text-rose-500"
        />
      ) : (
        <IoMdHeartEmpty
          onClick={handleLike}
          className="cursor-pointer text-2xl transition-colors duration-150 ease-in-out hover:text-rose-500"
        />
      )}
    </div>
  );
}

export default function FeedComponent() {
  const { tweet, isLoading } = useTweet();
  if (isLoading || !tweet) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-xl font-semibold text-zinc-400">
        Loading...
      </div>
    );
  }

  if (tweet.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-xl font-semibold text-zinc-400">
        No tweets found.
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2">
      {tweet?.map((tweet: Tweet) => (
        <FeedComponentItem
          key={tweet.tweetId}
          id={tweet.tweetId}
          username={tweet.username || ""}
          email={tweet.email || ""}
          timeAgo={tweet.timeAgo || ""}
          content={tweet.content || ""}
        />
      ))}
    </div>
  );
}
