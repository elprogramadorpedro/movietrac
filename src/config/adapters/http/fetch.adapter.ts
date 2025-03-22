import { HttpAdapters } from './http.adapters';

export class FetchAdapter implements HttpAdapters {
  async get<T>(url: string, options?: Record<string, unknown>): Promise<T> {
    try {
      const response = await fetch(url, options as RequestInit);
      
      if (!response.ok) {
        throw new Error(`Error fetching GET: ${url}, Status: ${response.status}`);
      }

      const data = await response.json();
      return data as T;
      
    } catch (error) {
      throw new Error(`FetchAdapter Error: ${error}`);
    }
  }
}
