import { ObjectId } from 'mongodb';
import Cpf from './Cpf';
import Email from './Email';
import UUIDGenerator from './UUIDGenerator';

export default class Passenger {
  email: Email;
  document: Cpf;

  constructor(readonly _id: ObjectId, readonly name: string, email: string, document: string) {
    this.email = new Email(email);
    this.document = new Cpf(document);
  }

  static create(name: string, email: string, document: string) {
    const _id = UUIDGenerator.create();
    return new Passenger(_id, name, email, document);
  }
}
