import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Navigation } from './presentation/navigation/Navigation';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthContainer } from './context/AuthContainer';
import { InitialSplashScreen } from './presentation/screen/InitialSplashScreen';
import { CustomSplashScreen } from './presentation/screen/Splash/CustomSplashScreen';

const AppContent = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const [splashPhase, setSplashPhase] = useState<'initial' | 'animated' | 'app'>('initial');

  useEffect(() => {
    if (!isLoading && splashPhase === 'initial') {
      // Permitir que InitialSplash termine naturalmente
    }
  }, [isLoading, splashPhase]);

  // Fase 1: Logo minimalista (3s)
  if (splashPhase === 'initial') {
    return (
      <InitialSplashScreen 
        onFinish={() => setSplashPhase('animated')} 
      />
    );
  }

  // Fase 2: Splash animado (3s)
  if (splashPhase === 'animated') {
    return (
      <CustomSplashScreen 
        onFinish={() => setSplashPhase('app')} 
      />
    );
  }

  // Fase 3: App principal
  if (!isAuthenticated) {
    return <AuthContainer />;
  }

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};