import { ObjectId } from 'mongodb';
import UUIDGenerator from '../identity/UUIDGenerator';
import Cpf from '../person/Cpf';
import Email from '../person/Email';

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
