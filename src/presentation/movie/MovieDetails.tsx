import React from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { FullMovie } from '../../core/entities/movie.entity';
import { Formatter } from '../../config/helpers/formatter';
import { Cast } from '../../core/entities/cast.entity';
import { CastActor } from '../cast/CastActor';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

export const MovieDetails = ({ movie, cast }: Props) => {
  return (
    <>
      <View style={styles.container}>
        {/* Rating y Géneros */}
        <View style={styles.ratingContainer}>
          <Text style={styles.rating}>⭐ {movie.rating.toFixed(1)}</Text>
          <Text style={styles.genres}>- {movie.genres.join(', ')}</Text>
        </View>

        {/* Historia */}
        <Text style={styles.sectionTitle}>Historia</Text>
        <Text style={styles.description}>{movie.description}</Text>

        {/* Presupuesto */}
        <Text style={styles.sectionTitle}>Presupuesto</Text>
        <Text style={styles.budget}>
          {Formatter.currency(movie.budget)}
        </Text>
      </View>

      {/* Casting */}
      <View style={styles.castContainer}>
        <Text style={styles.castTitle}>Actores</Text>
        
        <FlatList
          data={cast}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <CastActor actor={item} />}
          contentContainerStyle={styles.castList}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700', // Dorado para el rating
  },
  genres: {
    marginLeft: 8,
    fontSize: 16,
    color: '#999',
  },
  sectionTitle: {
    fontSize: 22,
    marginTop: 20,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#FFF', // Blanco para títulos
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#DDD', // Gris claro para descripción
    textAlign: 'justify',
  },
  budget: {
    fontSize: 18,
    fontWeight: '600',
    color: '#00FF00', // Verde para el presupuesto
    marginBottom: 10,
  },
  castContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
  castTitle: {
    fontSize: 22,
    marginVertical: 15,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: '#FFF',
  },
  castList: {
    paddingLeft: 20,
  },
});