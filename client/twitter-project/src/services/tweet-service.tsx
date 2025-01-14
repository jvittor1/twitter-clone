import { Tweet } from "@/models/tweet-model";
import { ApiService } from "./api-service";
import { HttpMethod } from "@/enums/http-methods";

interface FeedResponse {
  feedItens: Tweet[];
  page: number;
  totalPages: number;
  size: number;
  totalElements: number;
}

export async function getFeed(token: string) {
  const response = await ApiService<FeedResponse>({
    action: "feed",
    method: HttpMethod.GET,
    auth: true,
    customToken: token,
  });

  if (response.status === 200) {
    return response.data!.feedItens;
  }
}

export async function createTweet(
  token: string,
  content: string,
  loadTweets: () => void,
) {
  const response = await ApiService<Tweet>({
    action: "tweet",
    method: HttpMethod.POST,
    auth: true,
    customToken: token,
    body: { content },
  });
  if (response.status !== 200) return false;
  loadTweets();
  return true;
}
