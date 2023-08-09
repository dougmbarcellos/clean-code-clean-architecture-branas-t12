import { ObjectId } from 'mongodb';
import CPFValidator from './CPFValidator';

export default class Passenger {
  constructor(
    private name: string,
    private email: string,
    private document: string,
    private id?: ObjectId
  ) {
    this.validateRequired();
    new CPFValidator(this.document).validate();
  }

  validateRequired() {
    if (!this.name) throw new Error('Name is required');
    if (!this.email) throw new Error('Email is required');
  }
}
