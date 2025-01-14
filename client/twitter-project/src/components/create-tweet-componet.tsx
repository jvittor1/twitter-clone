import { FaRegImage } from "react-icons/fa6";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Textarea } from "./ui/textarea";
import { CiTextAlignLeft } from "react-icons/ci";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { Button } from "./ui/button";
import { TweetDto } from "@/models/tweet-dto";
import { useState } from "react";
import { createTweet } from "@/services/tweet-service";
import { useTweet } from "@/context/tweet-context";

export default function CreateTweetComponent() {
  const [tweet, setTweet] = useState<TweetDto>({ content: "" });
  const { loadTweets } = useTweet();
  const handleTweet = () => {
    if (tweet.content.length === 0) {
      return;
    }

    const token = localStorage.getItem("token") || "";
    createTweet(token, tweet.content, loadTweets).then((response) => {
      if (response) setTweet({ content: "" });
    });
  };

  return (
    <div className="flex w-full justify-between space-x-2 border-b-8 border-t border-zinc-700 p-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src="https://github.com/jvittor1.png" alt="User Image" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex h-28 w-full flex-col space-y-2">
        <Textarea
          placeholder="What's happening?"
          className="resize-none border-none"
          onChange={(e) => setTweet({ content: e.target.value })}
          value={tweet.content}
        />

        <div className="flex space-x-4 p-2 text-blue-500">
          <FaRegImage />
          <CiTextAlignLeft />
          <MdOutlineEmojiEmotions />
        </div>
      </div>

      <Button
        className="text-md w-20 self-end rounded-full font-bold"
        onClick={handleTweet}
        variant="secondary"
      >
        Tweet
      </Button>
    </div>
  );
}
