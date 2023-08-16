import { ObjectId } from 'mongodb';
import Driver from '../../application/domain/driver/Driver';
import DriverRepository from '../../application/repository/DriverRepository';
import DatabaseConnection from '../database/DatabaseConnection';

// Interface Adapter
export default class DriverRepositoryDatabase implements DriverRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async save(driver: Driver) {
    const data = await this.connection.insertOne('drivers', {
      _id: driver._id,
      name: driver.name,
      email: driver.email.value,
      document: driver.document.value,
      carPlate: driver.carPlate.value,
    });
    await this.connection.close();
    return { driverId: data.insertedId.toString() };
  }

  async get(driverId: string) {
    const data: any = await await this.connection.findOne('drivers', {
      _id: new ObjectId(driverId),
    });
    await this.connection.close();
    return new Driver(data._id, data.name, data.email, data.document, data.carPlate);
  }
}
