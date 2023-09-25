export class CpfAlredyExist extends Error {
  constructor() {
    super('CPF alredy exists');
  }
}
