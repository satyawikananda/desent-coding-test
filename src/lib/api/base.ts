import { ofetch } from 'ofetch';

export class BaseApi {
  private fetch: typeof ofetch;

  constructor(baseURL: string) {
    this.fetch = ofetch.create({
      // baseURL: 'https://berita-indo-api-next.vercel.app/api/cnn-news/'
      baseURL
    });
  }

  public serialize(params: Record<string, string | number>) {
    return new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)]),
    ).toString();
  }

  async get<T>({
    url,
    headers,
    query,
  }: {
    url: string;
    headers?: Record<string, string>;
    query?: Record<string, string | number>;
  }): Promise<T> {
    const response = await this.fetch<T>(url, {
      headers,
      query,
    });
    return response;
  }

  async post<T, D = unknown>({
    url,
    data,
    headers,
  }: {
    url: string;
    data?: D;
    headers?: Record<string, string>;
  }): Promise<T> {
    const response = await this.fetch<T>(url, {
      method: 'POST',
      headers,
      body: data as BodyInit,
    });
    return response;
  }

  async put<T, D = unknown>({
    url,
    data,
    headers,
  }: {
    url: string;
    data?: D;
    headers?: Record<string, string>;
  }): Promise<T> {
    const response = await this.fetch<T>(url, {
      method: 'PUT',
      headers,
      body: data as BodyInit,
    });
    return response;
  }

  async delete<T>({
    url,
    headers,
  }: {
    url: string;
    headers?: Record<string, string>;
  }): Promise<T> {
    const response = await this.fetch<T>(url, {
      method: 'DELETE',
      headers,
    });
    return response;
  }

  async patch<T, D>({
    url,
    data,
    headers,
  }: {
    url: string;
    data: D;
    headers?: Record<string, string>;
  }): Promise<T> {
    const response = await this.fetch<T>(url, {
      method: 'PATCH',
      headers,
      body: data as BodyInit,
    });
    return response;
  }
}
