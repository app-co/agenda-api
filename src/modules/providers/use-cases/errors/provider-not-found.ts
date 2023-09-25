export class ProviderNotFound extends Error {
  constructor() {
    super('Prestador não encontrado');
  }
}
