import { ObjectId } from 'mongodb';
import Passenger from '../../application/domain/Passenger';
import PassengerRepository from '../../application/repository/PassengerRepository';
import DatabaseConnection from '../database/DatabaseConnection';

// Interface Adapter
export default class PassengerRepositoryDatabase implements PassengerRepository {
  constructor(readonly connection: DatabaseConnection) {}
  async save(passenger: Passenger) {
    const data = await this.connection.insertOne('passengers', {
      _id: passenger._id,
      name: passenger.name,
      document: passenger.document.value,
      email: passenger.email.value,
    });
    await this.connection.close();
    return { passengerId: data.insertedId.toString() };
  }

  async get(passengerId: string) {
    const data: any = await this.connection.findOne('passengers', {
      _id: new ObjectId(passengerId),
    });
    await this.connection.close();
    return new Passenger(data._id, data.name, data.email, data.document);
  }
}
