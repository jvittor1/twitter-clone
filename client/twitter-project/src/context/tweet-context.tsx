import { Tweet } from "@/models/tweet-model";
import { getFeed } from "@/services/tweet-service";
import { formatTweet } from "@/utils/tweet-formatter";
import { createContext, useContext, useEffect, useState } from "react";

type TweetContextType = {
  tweet: any;
  setTweet: (tweet: any) => void;
  loadTweets: () => void;
};

interface TweetProviderProps {
  children: React.ReactNode;
}

const TweetContext = createContext<TweetContextType | undefined>(undefined);

export const useTweet = () => {
  const context = useContext(TweetContext);
  if (!context) {
    throw new Error("useTweet must be used within a TweetProvider");
  }
  return context;
};

export const TweetProvider: React.FC<TweetProviderProps> = ({ children }) => {
  const [tweet, setTweet] = useState<Tweet[] | null>(null);
  const loadTweets = () => {
    const token = localStorage.getItem("token");
    if (token) {
      getFeed(token).then((data) => {
        if (data !== undefined) setTweet(formatTweet(data));
      });
    }
  };

  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <TweetContext.Provider value={{ tweet, setTweet, loadTweets }}>
      {children}
    </TweetContext.Provider>
  );
};
