
import React, { useEffect, useRef } from 'react'
import { View, Text, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { Movie } from '../../core/entities/movie.entity';
import { FlatList } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';


interface Props{
movies:Movie[];
title:string;
loadNextPage?:()=>void;
}





 

export const HorizontalCaousel = ({movies, title, loadNextPage}:Props) => {

    const isLoading = useRef (false);
    useEffect(() => {
        isLoading.current = false;
    }, [movies]);   
    

    const onScroll = (event:NativeSyntheticEvent<NativeScrollEvent>) => {

        if (isLoading.current) return;
        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    
        const isEnReached = contentOffset.x + layoutMeasurement.width >= contentSize.width;
        if(!isEnReached) return;

        isLoading.current = true;


        //cargo la siguientes peliculas
        loadNextPage && loadNextPage();


    };



  return (
    <View
    style={{ height: title? 260:220 }}
    >
        {
            title && (
                <Text
                style={{ 
                    fontSize: 30,
                    fontWeight: 'bold',
                    marginLeft: 10,
                    marginBottom: 10
                }}
                
                >
                    {title}
                </Text>
            )
        }


<FlatList

data = {movies}
renderItem={({item})=>(
   <MoviePoster movie={item} width={140} height={200} />
)}  

keyExtractor={(item, index)=>`${item.id}-${index}`}   
horizontal
showsHorizontalScrollIndicator={false}  
onScroll={onScroll}
/>





    
    </View>
  )
}
