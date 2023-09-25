import { Client } from '@prisma/client';
import { compare } from 'bcryptjs';

import { IRepoClient } from '../repositories/repo-client';
import { InvalidCredentials } from './errors/invalide-auth-credentials';

interface IProps {
  email: string;
  password: string;
}
interface IResponse {
  client: Client;
}

export class AuthenticateUseCase {
  constructor(private userRepository: IRepoClient) {}

  async execute({ email, password }: IProps): Promise<IResponse> {
    const client = await this.userRepository.findByEmail(email);

    if (!client) {
      throw new InvalidCredentials();
    }

    const compareHash = await compare(password, client.password);

    if (!compareHash) {
      throw new InvalidCredentials();
    }

    return {
      client,
    };
  }
}
