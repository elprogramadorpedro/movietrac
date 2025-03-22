import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { HttpAdapters } from './http.adapters';

interface Options {
  baseUrl: string;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

export class AxiosAdapter implements HttpAdapters {
  private axiosInstance: AxiosInstance;

  constructor(options: Options) {
    this.axiosInstance = axios.create({
      baseURL: options.baseUrl,
      params: options.params,
      headers: options.headers,
    });
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const { data } = await this.axiosInstance.get<T>(url, config);
      return data;
    } catch (error) {
      this.handleError(error, url);
    }
  }

  private handleError(error: unknown, url: string): never {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      throw new Error(`HTTP Error (${axiosError.response?.status}): ${axiosError.response?.statusText || 'Unknown error'} - ${url}`);
    }
    throw new Error(`Unexpected error fetching GET: ${url}`);
  }
}
