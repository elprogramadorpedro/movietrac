import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { LoginScreen } from '../presentation/screen/Login'; 
import { RegisterScreen } from '../presentation/screen/Register'; 
import { ForgotPasswordScreen } from '../presentation/screen/ForgotPass'; 

type AuthScreenType = 'login' | 'register' | 'forgotPassword';

export const AuthContainer = () => {
  const [currentScreen, setCurrentScreen] = useState<AuthScreenType>('login');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onSwitchToRegister={() => {
              console.log('Switching to register...'); // Debug
              setCurrentScreen('register');
            }}
            onForgotPassword={() => {
              console.log('Switching to forgot password...'); // Debug
              setCurrentScreen('forgotPassword');
            }}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onSwitchToLogin={() => {
              console.log('Switching to login...'); // Debug
              setCurrentScreen('login');
            }}
          />
        );
      case 'forgotPassword':
        return (
          <ForgotPasswordScreen
            onBackToLogin={() => {
              console.log('Back to login...'); // Debug
              setCurrentScreen('login');
            }}
          />
        );
      default:
        return (
          <LoginScreen
            onSwitchToRegister={() => setCurrentScreen('register')}
            onForgotPassword={() => setCurrentScreen('forgotPassword')}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      {renderScreen()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});