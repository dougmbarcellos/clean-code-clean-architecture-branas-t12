import { ObjectId } from 'mongodb';
import Driver from '../../application/domain/Driver';
import DriverRepository from '../../application/repository/DriverRepository';
import { client } from '../../db';

export default class DriverRepositoryDatabase implements DriverRepository {
  async save(driver: Driver) {
    await client.connect();
    const data = await client.db('db1').collection('drivers').insertOne({
      _id: driver._id,
      name: driver.name,
      email: driver.email.value,
      document: driver.document.value,
      carPlate: driver.carPlate.value,
    });
    await client.close();
    return { driverId: data.insertedId.toString() };
  }

  async get(driverId: string) {
    await client.connect();
    const data: any = await client
      .db('db1')
      .collection('drivers')
      .findOne({ _id: new ObjectId(driverId) });
    await client.close();
    return new Driver(data._id, data.name, data.email, data.document, data.carPlate);
  }
}
