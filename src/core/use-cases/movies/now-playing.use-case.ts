import { HttpAdapters } from "../../../config/adapters/http/http.adapters";
import { NowPlayingResponse } from "../../../infrastructure/interfaces/movie-db.responses";
import { Movie } from '../../entities/movie.entity';

export const moviesNowPlaying = async (fetcher : HttpAdapters ):Promise<Movie[]> =>{

   try {

      const nowPlaying = await fetcher.get<NowPlayingResponse>('/now_playing');
     console.log({nowPlaying});
     return[]

    
   } catch (error) {
    console.log(error);
    throw new Error("Error fetching now playing movies - NowPlaying");
   }

}