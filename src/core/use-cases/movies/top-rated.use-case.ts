import { HttpAdapters } from '../../../config/adapters/http/http.adapters';
import { MovieDBMoviesResponse } from '../../../infrastructure/interfaces/movie-db.responses';
import { MovieMapper } from '../../../infrastructure/mappers/movie.mapper';
import type { Movie } from '../../entities/movie.entity';



export const moviesTopRatedUseCase = async ( fetcher: HttpAdapters  ):Promise<Movie[]> => {
  
  try {

    const topRated = await fetcher.get<MovieDBMoviesResponse>('/top_rated');

    return topRated.results.map(  MovieMapper.fromMovieDBResultToEntity );

  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - TopRated');
  }


}
