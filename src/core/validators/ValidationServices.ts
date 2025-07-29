export class ValidationService {
  static validateEmail(email: string): { isValid: boolean; error?: string } {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      return { isValid: false, error: 'El email es requerido' };
    }
    
    if (!emailRegex.test(email)) {
      return { isValid: false, error: 'Formato de email inválido' };
    }
    
    return { isValid: true };
  }

  static validatePassword(password: string): { isValid: boolean; error?: string } {
    if (!password) {
      return { isValid: false, error: 'La contraseña es requerida' };
    }

    if (password.length < 8) {
      return { isValid: false, error: 'Mínimo 8 caracteres' };
    }

    if (!/[a-z]/.test(password)) {
      return { isValid: false, error: 'Debe contener una letra minúscula' };
    }

    if (!/[A-Z]/.test(password)) {
      return { isValid: false, error: 'Debe contener una letra mayúscula' };
    }

    if (!/\d/.test(password)) {
      return { isValid: false, error: 'Debe contener un número' };
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return { isValid: false, error: 'Debe contener un carácter especial (!@#$%^&*...)' };
    }

    return { isValid: true };
  }

  static validateName(name: string): { isValid: boolean; error?: string } {
    if (!name.trim()) {
      return { isValid: false, error: 'El nombre es requerido' };
    }

    if (name.trim().length < 2) {
      return { isValid: false, error: 'Mínimo 2 caracteres' };
    }

    if (name.trim().length > 50) {
      return { isValid: false, error: 'Máximo 50 caracteres' };
    }

    return { isValid: true };
  }

  static validateConfirmPassword(password: string, confirmPassword: string): { isValid: boolean; error?: string } {
    if (!confirmPassword) {
      return { isValid: false, error: 'Confirmar contraseña es requerido' };
    }

    if (password !== confirmPassword) {
      return { isValid: false, error: 'Las contraseñas no coinciden' };
    }

    return { isValid: true };
  }
}