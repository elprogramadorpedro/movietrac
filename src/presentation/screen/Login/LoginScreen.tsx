import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { SecureInput } from '../../components/SecureInput';
import { LoadingButton } from '../../components/LoadingButton';
import { ValidationService } from '../../../core/validators'; 
import { useAuth } from '../../../context';

interface Props {
  onSwitchToRegister: () => void;
  onForgotPassword: () => void;
}

export const LoginScreen = ({ onSwitchToRegister, onForgotPassword }: Props) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const emailValidation = ValidationService.validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!;
    }

    const passwordValidation = ValidationService.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await login(formData.email, formData.password);
    setIsLoading(false);

    if (!result.success) {
      Alert.alert('Error de autenticación', result.error || 'Error desconocido');
    }
  };

  const handleRegisterPress = () => {
    console.log('🔥 Register button pressed in LoginScreen');
    console.log('🔥 onSwitchToRegister type:', typeof onSwitchToRegister);
    if (onSwitchToRegister) {
      console.log('🔥 Calling onSwitchToRegister...');
      onSwitchToRegister();
    } else {
      console.log('❌ onSwitchToRegister is null/undefined');
    }
  };

  const handleForgotPasswordPress = () => {
    console.log('🔥 Forgot password button pressed');
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.titleWithLogo}>
              <Image 
                source={require('../../../assets/images/logo.png')}
                style={styles.headerLogo}
                resizeMode="contain"
              />
              <Text style={styles.title}>MovieTrac</Text>
            </View>
            <Text style={styles.subtitle}>
              Inicia sesión para descubrir películas increíbles
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <SecureInput
              label="Email"
              value={formData.email}
              onChangeText={(value) => handleInputChange('email', value)}
              placeholder="tucorreo@ejemplo.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />

            <SecureInput
              label="Contraseña"
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
              placeholder="Tu contraseña"
              secureTextEntry
              showPasswordToggle
              error={errors.password}
            />

            <LoadingButton
              title="Iniciar Sesión"
              onPress={handleLogin}
              loading={isLoading}
              disabled={!formData.email || !formData.password}
            />

            {/* Links */}
            <View style={styles.linksContainer}>
              <TouchableOpacity 
                onPress={handleForgotPasswordPress}
                activeOpacity={0.7}
              >
                <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>
              </TouchableOpacity>

              <View style={styles.signupContainer}>
                <Text style={styles.normalText}>¿No tienes cuenta? </Text>
                <TouchableOpacity 
                  onPress={handleRegisterPress}
                  activeOpacity={0.7}
                  style={styles.registerButton}
                >
                  <Text style={styles.linkTextBold}>Regístrate</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContainer: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titleWithLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerLogo: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF0000',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    lineHeight: 22,
  },
  form: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  linksContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 15,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  normalText: {
    color: '#999',
    fontSize: 14,
  },
  registerButton: {
    padding: 5,
  },
  linkTextBold: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  },
});