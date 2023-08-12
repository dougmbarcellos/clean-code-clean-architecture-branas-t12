import { ObjectId } from 'mongodb';
import Cpf from './Cpf';
import Email from './Email';

export default class Passenger {
  cpf: Cpf;
  email: Email;

  constructor(public _id: ObjectId, public name: string, email: string, document: string) {
    this.cpf = new Cpf(document);
    this.email = new Email(email);
  }

  static create(name: string, email: string, document: string) {
    const _id = new ObjectId();
    return new Passenger(_id, name, email, document);
  }
}
