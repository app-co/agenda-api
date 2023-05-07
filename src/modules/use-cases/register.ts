import { IUsersRepository } from '@/modules/repositories/IUser-repository';
import { User } from '@prisma/client';
import { hash } from 'bcryptjs';

import { UserAlredyExist } from './errors/user-alredy-existes-error';

interface IProsp {
  nome: string;
  email: string;
  password: string;
}

interface IResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: IUsersRepository) {}

  async execute({ nome, email, password }: IProsp): Promise<IResponse> {
    const password_hash = await hash(password, 6);

    const findUser = await this.userRepository.findByEmail(email);
    if (findUser) {
      throw new UserAlredyExist();
    }

    const user = await this.userRepository.create({
      nome,
      email,
      password_hash,
    });

    return {
      user,
    };
  }
}
