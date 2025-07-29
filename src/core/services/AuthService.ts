import { User, AuthResponse } from '../entities';
import { TokenService } from './TokenService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = 'app_users';

export class AuthService {
  // Simular base de datos de usuarios en AsyncStorage
  static async saveUser(user: User, password: string): Promise<void> {
    try {
      const users = await this.getUsers();
      const hashedPassword = await this.hashPassword(password);
      
      users[user.email] = {
        ...user,
        password: hashedPassword
      };
      
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (error) {
      console.error('Error saving user:', error);
      throw error;
    }
  }

  static async getUsers(): Promise<Record<string, any>> {
    try {
      const users = await AsyncStorage.getItem(USERS_KEY);
      return users ? JSON.parse(users) : {};
    } catch (error) {
      return {};
    }
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay de red

      const users = await this.getUsers();
      const user = users[email];

      if (!user) {
        return {
          success: false,
          error: 'Usuario no encontrado'
        };
      }

      const isPasswordValid = await this.verifyPassword(password, user.password);
      if (!isPasswordValid) {
        return {
          success: false,
          error: 'Contraseña incorrecta'
        };
      }

      const token = this.generateMockToken({
        id: user.id,
        email: user.email,
        name: user.name
      });

      const { password: _, ...userWithoutPassword } = user;

      return {
        success: true,
        user: userWithoutPassword,
        token
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión'
      };
    }
  }

  static async register(email: string, password: string, name: string): Promise<AuthResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular delay de red

      const users = await this.getUsers();
      
      // Verificar si el usuario ya existe
      if (users[email]) {
        return {
          success: false,
          error: 'El email ya está registrado'
        };
      }

      const newUser: User = {
        id: Date.now().toString(),
        email,
        name,
        emailVerified: false,
        createdAt: new Date()
      };

      await this.saveUser(newUser, password);

      const token = this.generateMockToken({
        id: newUser.id,
        email: newUser.email,
        name: newUser.name
      });

      return {
        success: true,
        user: newUser,
        token
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error al crear la cuenta'
      };
    }
  }

  static async forgotPassword(email: string): Promise<AuthResponse> {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const users = await this.getUsers();
      if (!users[email]) {
        return {
          success: false,
          error: 'Email no encontrado'
        };
      }

      // En producción, aquí enviarías un email
      return {
        success: true
      };
    } catch (error) {
      return {
        success: false,
        error: 'Error de conexión'
      };
    }
  }

  // Simulaciones de hash/verify (en producción usar bcrypt)
  private static async hashPassword(password: string): Promise<string> {
    // Simulación simple - EN PRODUCCIÓN USAR BCRYPT
    return btoa(password + 'salt');
  }

  private static async verifyPassword(password: string, hash: string): Promise<boolean> {
    // Simulación simple - EN PRODUCCIÓN USAR BCRYPT
    return btoa(password + 'salt') === hash;
  }

  private static generateMockToken(payload: any): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payloadWithExp = {
      ...payload,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 horas
      iat: Math.floor(Date.now() / 1000)
    };
    const encodedPayload = btoa(JSON.stringify(payloadWithExp));
    const signature = btoa('mock-signature');
    
    return `${header}.${encodedPayload}.${signature}`;
  }
}