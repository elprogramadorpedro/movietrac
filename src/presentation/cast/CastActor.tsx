import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Cast } from '../../core/entities/cast.entity';

interface Props {
  actor: Cast;
}

export const CastActor = ({ actor }: Props) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: actor.avatar }}
        style={styles.actorImage}
        resizeMode="cover"
      />
      <View style={styles.actorInfo}>
        <Text style={styles.actorName} numberOfLines={2}>
          {actor.name}
        </Text>
        <Text style={styles.characterName} numberOfLines={2}>
          {actor.character}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    paddingLeft: 10,
    display: 'flex',
    flexDirection: 'column',
    width: 100,
  },
  actorImage: {
    width: 100,
    height: 150,
    borderRadius: 10,
    backgroundColor: '#333', // Color de fondo mientras carga la imagen
  },
  actorInfo: {
    marginLeft: 10,
    marginTop: 4,
  },
  actorName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFF', // Texto blanco para tema oscuro
    textAlign: 'left',
  },
  characterName: {
    fontSize: 12,
    opacity: 0.7,
    color: '#DDD', // Gris claro para el personaje
    textAlign: 'left',
    marginTop: 2,
  },
});