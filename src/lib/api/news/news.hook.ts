import { useQuery } from "@tanstack/react-query"
import { newsApi } from "./news.api"

enum NEWS_KEY {
  GET_NEWS = "GET_NEWS",
}

export function useNewsFetcher() {
  const useGetNews = () => {
    const fetcher = useQuery({
      queryKey: [NEWS_KEY.GET_NEWS],
      queryFn: async () => {
        const result = await newsApi.getNews()

        return result
      },
    })

    return fetcher
  }

  return {
    useGetNews
  }
}
