import { User } from '@prisma/client';
import { UserRepository, CreateUserData } from '../repositories/userRepository';
import { hashPassword, comparePasswords, generateToken } from '../utils/auth';

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  // getUserByid
  async getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(data: CreateUserData): Promise<User> {
    // Verificar se já existe um usuário com este email
    const existingUser = await this.userRepository.findByEmail(data.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // Criptografar a senha antes de salvar
    const hashedPassword = await hashPassword(data.password);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }

  async authenticateUser(email: string, password: string): Promise<{ user: Omit<User, 'password'>; token: string }> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const passwordMatch = await comparePasswords(password, user.password);

    if (!passwordMatch) {
      throw new Error('Invalid credentials');
    }

    const token = generateToken({ id: user.id });

    // Remover a senha do objeto de usuário antes de retornar
    const userWithoutPassword = {
      id: user.id,
      email: user.email,
      name: user.name,
      username: user.username,
      admin: false,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return {
      user: userWithoutPassword,
      token,
    };
  }
}
