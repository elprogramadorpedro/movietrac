import * as UseCases from '../../core/use-cases';  
import React, { useEffect, useState } from 'react'
import { Movie } from '../../core/entities/movie.entity';
import { movieDBFetcher } from '../../config/adapters/movieDB.adapter';
import { AxiosAdapter } from '../../config/adapters/http/axios.adapter';

export const useMovies = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);

useEffect(() => {
    // Add your effect logic here
    initialLoad()

 
}, []);


const initialLoad = async () => {
    const newPlayingMovies = await UseCases.moviesNewPlayingUseCases(movieDBFetcher);
    
};

return {
    isLoading,
    nowPlaying,
};
}
