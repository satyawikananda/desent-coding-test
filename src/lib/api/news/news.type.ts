export type NewsResponse = {
  title: string
  link: string
  contentSnippet: string
  isoDate: string
  image: {
    small: string
    large: string
  }
}

export type NewsListResponse = NewsResponse[]
