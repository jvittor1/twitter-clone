import { Tweet } from "@/models/tweet-model";

export function formatTweet(tweets: Tweet[]) {
  const currentTime = new Date().getTime();

  return tweets.map((tweet) => {
    const tweetTime = new Date(tweet.createdAt).getTime();
    const timeDifference = currentTime - tweetTime;

    // Função para calcular o tempo decorrido em texto
    const formatTimeAgo = (timeDiff: number): string => {
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const months = Math.floor(days / 30);
      const years = Math.floor(days / 365);

      if (seconds < 60) return `${seconds} seconds ago`;
      if (minutes < 60) return `${minutes} minutes ago`;
      if (hours < 24) return `${hours} hours ago`;
      if (days < 30) return `${days} days ago`;
      if (months < 12) return `${months} months ago`;
      return `${years} years ago`;
    };

    // Formatar a data para algo mais legível
    const formattedDate = new Date(tweet.createdAt).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      ...tweet,
      createdAtFormatted: formattedDate,
      timeAgo: formatTimeAgo(timeDifference),
    };
  });
}
