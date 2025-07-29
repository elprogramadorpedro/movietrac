import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { SecureInput } from '../../components/SecureInput';
import { LoadingButton } from '../../components/LoadingButton';
import { ValidationService } from '../../../core/validators';
import { useAuth } from '../../../context';

interface Props {
  onSwitchToLogin: () => void;
}

export const RegisterScreen = ({ onSwitchToLogin }: Props) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const { register } = useAuth();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    const nameValidation = ValidationService.validateName(formData.name);
    if (!nameValidation.isValid) {
      newErrors.name = nameValidation.error!;
    }

    const emailValidation = ValidationService.validateEmail(formData.email);
    if (!emailValidation.isValid) {
      newErrors.email = emailValidation.error!;
    }

    const passwordValidation = ValidationService.validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      newErrors.password = passwordValidation.error!;
    }

    const confirmPasswordValidation = ValidationService.validateConfirmPassword(
      formData.password, 
      formData.confirmPassword
    );
    if (!confirmPasswordValidation.isValid) {
      newErrors.confirmPassword = confirmPasswordValidation.error!;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    const result = await register(formData.email, formData.password, formData.name);
    setIsLoading(false);

    if (result.success) {
      Alert.alert(
        '¡Cuenta creada!', 
        'Tu cuenta ha sido creada exitosamente. ¡Bienvenido a MovieTrac!',
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert('Error al crear cuenta', result.error || 'Error desconocido');
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
            <Text style={styles.title}>🎬 Únete a MovieTrac</Text>
            <Text style={styles.subtitle}>
              Crea tu cuenta y descubre un mundo de películas
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <SecureInput
              label="Nombre completo"
              value={formData.name}
              onChangeText={(value) => handleInputChange('name', value)}
              placeholder="Tu nombre completo"
              autoCapitalize="words"
              error={errors.name}
            />

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
              placeholder="Mínimo 8 caracteres"
              secureTextEntry
              showPasswordToggle
              error={errors.password}
            />

            <SecureInput
              label="Confirmar contraseña"
              value={formData.confirmPassword}
              onChangeText={(value) => handleInputChange('confirmPassword', value)}
              placeholder="Repite tu contraseña"
              secureTextEntry
              showPasswordToggle
              error={errors.confirmPassword}
            />

            {/* Password requirements */}
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>La contraseña debe contener:</Text>
              <Text style={[styles.requirement, /[a-z]/.test(formData.password) && styles.requirementMet]}>
                • Al menos una letra minúscula
              </Text>
              <Text style={[styles.requirement, /[A-Z]/.test(formData.password) && styles.requirementMet]}>
                • Al menos una letra mayúscula
              </Text>
              <Text style={[styles.requirement, /\d/.test(formData.password) && styles.requirementMet]}>
                • Al menos un número
              </Text>
              <Text style={[styles.requirement, /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) && styles.requirementMet]}>
                • Al menos un carácter especial
              </Text>
              <Text style={[styles.requirement, formData.password.length >= 8 && styles.requirementMet]}>
                • Mínimo 8 caracteres
              </Text>
            </View>

            <LoadingButton
              title="Crear Cuenta"
              onPress={handleRegister}
              loading={isLoading}
              disabled={!formData.name || !formData.email || !formData.password || !formData.confirmPassword}
            />

            {/* Login link */}
            <View style={styles.loginContainer}>
              <Text style={styles.normalText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={onSwitchToLogin}>
                <Text style={styles.linkTextBold}>Inicia sesión</Text>
              </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF0000',
    marginBottom: 10,
    textAlign: 'center',
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
  requirementsContainer: {
    backgroundColor: '#111',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333',
  },
  requirementsTitle: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  requirement: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  requirementMet: {
    color: '#00FF00',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  normalText: {
    color: '#999',
    fontSize: 14,
  },
  linkTextBold: {
    color: '#FF0000',
    fontSize: 14,
    fontWeight: '600',
  },
});