import { ObjectId } from 'mongodb';
import UUIDGenerator from '../identity/UUIDGenerator';
import Cpf from '../person/Cpf';
import Email from '../person/Email';
import CarPlate from './CarPlate';

export default class Driver {
  email: Email;
  document: Cpf;
  carPlate: CarPlate;

  constructor(
    readonly _id: ObjectId,
    readonly name: string,
    email: string,
    document: string,
    carPlate: string
  ) {
    this.email = new Email(email);
    this.document = new Cpf(document);
    this.carPlate = new CarPlate(carPlate);
  }

  static create(name: string, email: string, document: string, carPlate: string) {
    const _id = UUIDGenerator.create();
    return new Driver(_id, name, email, document, carPlate);
  }
}
