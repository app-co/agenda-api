export class CnpjAlredyExist extends Error {
  constructor() {
    super('CNPJ alredy exists');
  }
}
