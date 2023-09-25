import { IRepoProvider } from '@/modules/providers/repositories/repo-providers';
import { AppError } from '@/shared/app-error/AppError';
import { Client, Provider } from '@prisma/client';
import { compare } from 'bcryptjs';

import { InvalidCredentials } from './errors/invalide-auth-credentials';

interface IProps {
  email: string;
  password: string;
}
interface IResponse {
  provider: Provider;
}

export class AuthenticateProviderUseCase {
  constructor(private repoProvider: IRepoProvider) {}

  async execute({ email, password }: IProps): Promise<IResponse> {
    const provider = await this.repoProvider.findByEmail(email);

    if (!provider) {
      throw new AppError('Prestador não encontrado');
    }

    const compareHash = await compare(password, provider.password);

    if (!compareHash) {
      throw new AppError('Senha inválida');
    }

    return {
      provider,
    };
  }
}
