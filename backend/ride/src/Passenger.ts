import CPFValidator from './CPFValidator';

export default class Passenger {
  passengerId: string = '';

  constructor(private name: string, private email: string, private document: string) {
    this.validateRequired();
    new CPFValidator(this.document).validate();
  }

  validateRequired() {
    if (!this.name) throw new Error('Name is required');
    if (!this.email) throw new Error('Email is required');
  }
}
