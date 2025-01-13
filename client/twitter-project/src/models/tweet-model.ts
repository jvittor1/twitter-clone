export interface Tweet {
  tweetId: number;
  content: string;
  username: string;
  email: string;
  likes: number;
  createdAt: string;
  timeAgo?: string;
}
