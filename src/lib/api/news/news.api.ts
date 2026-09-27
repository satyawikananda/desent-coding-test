import { BaseApi } from "../base"
import { NewsListResponse } from "./news.type"

const BASE_URL = "https://berita-indo-api-next.vercel.app/api/cnn-news"

class NewsApi extends BaseApi {
  constructor() {
    super(BASE_URL)
  }

  async getNews() {
    const result = await this.get<BaseApiResult<NewsListResponse>>({
      url: BASE_URL,
    })

    return result
  }
}

const newsApi = new NewsApi()

export { newsApi }