export class ProviderExist extends Error {
  constructor() {
    super('Provider alredy exists');
  }
}
