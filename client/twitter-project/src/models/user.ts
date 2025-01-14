export interface User {
  username: string;
  email: string;
  likedTweets: LikedTweets[] | null;
}

export interface LikedTweets {
  id: number;
  authorUsername: string;
  content: string;
  likes: number;
}
