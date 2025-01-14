import { Tweet } from "@/models/tweet-model";
import { getFeed } from "@/services/tweet-service";
import { formatTweet } from "@/utils/tweet-formatter";
import { createContext, useContext, useEffect, useState } from "react";

type TweetContextType = {
  tweet: any;
  setTweet: (tweet: any) => void;
  loadTweets: () => void;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState(true);

  const loadTweets = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        getFeed(token).then((data) => {
          if (data !== undefined) {
            setTweet(formatTweet(data));
          }
        });
      } catch (error) {
        console.error("Get feed error: ", error);
        setTweet([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    loadTweets();
  }, []);

  return (
    <TweetContext.Provider value={{ tweet, setTweet, loadTweets, isLoading }}>
      {children}
    </TweetContext.Provider>
  );
};
