import { IoChatbubble } from "react-icons/io5";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { BiRepost } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { useState } from "react";
import { IoMdHeart } from "react-icons/io";
import { useTweet } from "@/context/tweet-context";
import { Tweet } from "@/models/tweet-model";

interface FeedItemComponentProps {
  username: string;
  email: string;
  timeAgo?: string;
  content: string;
}

function FeedComponentItem({
  username,
  email,
  timeAgo,
  content,
}: FeedItemComponentProps) {
  return (
    <div className="flex items-start justify-between space-x-3 border-b border-zinc-700 px-2 py-2">
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col space-y-3">
        <div className="flex items-center space-x-2">
          <h3 className="text-md font-bold text-white">{username}</h3>
          <p className="text-md text-zinc-700">{email}</p>
          <p className="text-md text-zinc-700">·</p>
          <p className="text-md text-zinc-700">{timeAgo}</p>
        </div>

        <p className="text-md text-white">{content}</p>
        <FeedButtonComponent />
      </div>
    </div>
  );
}

function FeedButtonComponent() {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
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
  const { tweet } = useTweet();

  if (!tweet) {
    return (
      <div className="flex h-screen w-full items-center justify-center text-xl font-semibold text-zinc-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-2 overflow-y-auto">
      {tweet.map((tweet: Tweet) => (
        <FeedComponentItem
          key={tweet.tweetId}
          username={tweet.username}
          email={tweet.email}
          timeAgo={tweet.timeAgo}
          content={tweet.content}
        />
      ))}
    </div>
  );
}
