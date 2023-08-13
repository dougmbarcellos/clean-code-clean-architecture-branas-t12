import { ObjectId } from 'mongodb';
import CarPlate from './CarPlate';
import Cpf from './Cpf';
import Email from './Email';
import UUIDGenerator from './UUIDGenerator';

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
