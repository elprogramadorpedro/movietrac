
import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { View, Text } from 'react-native'
import { RootStackParams } from '../../navigation/Navigation';
import { useMovie } from '../../hooks/useMovie';
import { MovieHeader } from '../../movie/MovieHeader';
import { MovieDetails } from '../../movie/MovieDetails';
import { ScrollView } from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

export const DetailsScreen = ({route}: Props) => {

        const {movieId} = route.params;

        const {isLoading, movie, cast} = useMovie(movieId);



        if(isLoading){
            return (
        
                    <Text>Loading...</Text>
          
            )
        }








  return (
    <ScrollView>
      
        <MovieHeader 
        originalTitle={movie!.originalTitle} 
        title={movie!.title}
        poster={movie!.poster} 
        />

        <MovieDetails movie={movie!} cast={cast || []}/>


    </ScrollView>
  )
}
