import { IUsersRepository } from '@/modules/repositories/IUser-repository';
import { User } from '@prisma/client';
import { compare } from 'bcryptjs';

import { InvalidCredentials } from './errors/invalide-auth-credentials';

interface IProps {
  email: string;
  password: string;
}
interface IResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ email, password }: IProps): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new InvalidCredentials();
    }

    const compareHash = await compare(password, user.password_hash);

    if (!compareHash) {
      throw new InvalidCredentials();
    }

    return {
      user,
    };
  }
}
