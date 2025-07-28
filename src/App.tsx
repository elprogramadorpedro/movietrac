import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { Navigation } from './presentation/navigation/Navigation';
import { CustomSplashScreen } from './presentation/screen/Splash/CustomSplashScreen';

export const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <NavigationContainer>
      {showSplash ? (
        <CustomSplashScreen onFinish={handleSplashFinish} />
      ) : (
        <Navigation />
      )}
    </NavigationContainer>
  );
};