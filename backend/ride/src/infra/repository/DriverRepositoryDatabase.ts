import { ObjectId } from 'mongodb';
import Driver from '../../Driver';
import DriverRepository from '../../application/repository/DriverRepository';
import { client } from '../../db';

export default class DriverRepositoryDatabase implements DriverRepository {
  async save(driver: Driver) {
    await client.connect();
    const data = await client.db('db1').collection('drivers').insertOne(driver);
    await client.close();
    return { driverId: data.insertedId.toString() };
  }

  async get(driverId: string) {
    await client.connect();
    const data = await client
      .db('db1')
      .collection<Driver>('drivers')
      .findOne({ _id: new ObjectId(driverId) });
    await client.close();
    return data;
  }
}
