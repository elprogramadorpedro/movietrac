import React from 'react';
import { TouchableOpacity, Text, Alert, StyleSheet, View, Image } from 'react-native'; // ← Solo agregué View, Image
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../../context/AuthContext';
import { HomeScreen } from '../screen/Home/HomeScreen';
import { DetailsScreen } from '../screen/details/DetailsScreen';

const Stack = createStackNavigator<RootStackParams>();

export type RootStackParams = {
  Home: undefined;
  Details: { movieId: number };
};

export const Navigation = () => {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      `¿Estás seguro que quieres cerrar sesión, ${user?.name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Cerrar Sesión', onPress: logout, style: 'destructive' }
      ]
    );
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#000',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 18,
        },
        cardStyle: { backgroundColor: '#000' },
      }}
      initialRouteName="Home"
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          headerTitle: () => ( // ← Solo cambié esto
            <View style={styles.headerContainer}>
              <Image 
                source={require('../../assets/images/logo.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />
              <Text style={styles.headerText}>MovieTrac</Text>
            </View>
          ),
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
              <Text style={styles.logoutText}>Salir</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen 
        name="Details" 
        component={DetailsScreen}
        options={{
          headerShown: false,
          presentation: 'card',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  // ← Solo agregué estos 3 estilos nuevos
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerLogo: {
    width: 20,  // Mismo tamaño que el emoji
    height: 20,
    marginRight: 6,
  },
  headerText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // ← Estilos originales intactos
  logoutButton: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoutText: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  },
});