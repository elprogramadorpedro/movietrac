import { HttpAdapters } from "../../../config/adapters/http/http.adapters";
import { MovieDBMovie } from "../../../infrastructure/interfaces/movie-db.responses";
import { MovieMapper } from "../../../infrastructure/mappers/movie.mapper";
import { FullMovie } from "../../entities/movie.entity";


export const getMovieByIdUseCase =async (fetcher: HttpAdapters, MovieId: number): Promise<FullMovie> => {

    try {
        //fetcher
        const movie = await fetcher.get<MovieDBMovie>(`/${MovieId}`);
        const fullMovie = MovieMapper.fromMovieDBToEntity(movie);
        return fullMovie;
     
    } catch (error) {
        
    }


}