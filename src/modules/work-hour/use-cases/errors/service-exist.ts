export class ServiceExist extends Error {
  constructor() {
    super('Service alredy exists');
  }
}
