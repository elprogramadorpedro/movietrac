import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useMovies } from '../../hooks/useMovies';


interface Props {
  onFinish: () => void;
}

export const CustomSplashScreen = ({ onFinish }: Props) => {
  const [showSplash, setShowSplash] = useState(true);
  const { isLoading } = useMovies();

  useEffect(() => {
    // Timer de 5 segundos obligatorio
    const timer = setTimeout(() => {
      setShowSplash(false);
      onFinish();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onFinish]);

  if (!showSplash) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MovieTrac</Text>
      <Text style={styles.subtitle}>
        {isLoading ? 'Cargando películas...' : '¡Listo!'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF0000',  // Pantalla roja
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});