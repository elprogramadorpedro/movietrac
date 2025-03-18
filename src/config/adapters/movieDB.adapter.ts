import { AxiosAdapter } from './http/axios.adapter';


export const movieDBFetcher = new AxiosAdapter({
  baseUrl: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: '77fc11aa1095f2855cb11603044f530e',
    language: 'es'
  }
});