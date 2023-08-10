import CPFValidator from './CPFValidator';

export default class Driver {
  constructor(
    public name: string,
    public email: string,
    public document: string,
    public carPlate: string
  ) {
    this.validateRequired();
    new CPFValidator(this.document).validate();
  }

  private validateRequired() {
    if (!this.name) throw new Error('Name is required');
    if (!this.email) throw new Error('Email is required');
    if (!this.carPlate) throw new Error('Car plate is required');
  }
}
