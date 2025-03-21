import React from 'react';
import {View, Text} from 'react-native';
import {useMovies} from '../../hooks/useMovies';
import {ScrollView} from 'react-native-gesture-handler';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { PosterCarousel } from '../../movies/PosterCarousel';
import { HorizontalCaousel } from '../../movies/HorizontalCaousel';
import { FullScreenLoaders } from '../../loaders/FullScreenLoaders';

export const HomeScreen = () => {
  const {top} = useSafeAreaInsets();

  const {isLoading, nowPlaying, popular, topRated, upcoming, popularNextPage} = useMovies();

 

  if(isLoading){
    return (<FullScreenLoaders/>);
  }

  return (
    <ScrollView>
      <View style={{marginTop: top + 20, paddingBottom: 30}}>


        {/* Principal */}
        <PosterCarousel 
          movies = {nowPlaying}
        />

       {/* Popular */}
       <HorizontalCaousel movies={popular} title="Populares"/>

        {/* Top Rated */}
        <HorizontalCaousel movies={topRated} title="Populares"/>

        {/* Proximamente */}
        <HorizontalCaousel 
        movies={upcoming} 
        title="Proximamente"
        loadNextPage={popularNextPage}
        
        />



       

      </View>
    </ScrollView>
  );
};
