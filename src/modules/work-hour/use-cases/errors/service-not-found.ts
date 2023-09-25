export class ServiceNotFound extends Error {
  constructor() {
    super('Serviço não encontrado');
  }
}
