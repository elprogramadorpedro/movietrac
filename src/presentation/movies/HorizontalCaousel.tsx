
import React from 'react'
import { View, Text } from 'react-native'
import { Movie } from '../../core/entities/movie.entity';
import { FlatList } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';


interface Props{
    //sintaxis
movies:Movie[];
title:string;

}

export const HorizontalCaousel = ({movies, title}:Props) => {
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

keyExtractor={(item)=>item.id.toString()}   
horizontal
showsHorizontalScrollIndicator={false}  
/>





    
    </View>
  )
}
