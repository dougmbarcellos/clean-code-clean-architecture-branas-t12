import { ObjectId } from 'mongodb';
import Passenger from '../../Passenger';
import PassengerRepository from '../../application/repository/PassengerRepository';
import { client } from '../../db';

export default class PassengerRepositoryDatabase implements PassengerRepository {
  async save(passenger: Passenger) {
    await client.connect();
    const data = await client.db('db1').collection('passengers').insertOne(passenger);
    await client.close();
    return { passengerId: data.insertedId.toString() };
  }

  async get(passengerId: string) {
    await client.connect();
    const data = await client
      .db('db1')
      .collection<Passenger>('passengers')
      .findOne({ _id: new ObjectId(passengerId) });
    await client.close();
    return data;
  }
}
