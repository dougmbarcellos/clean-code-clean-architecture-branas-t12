import { ObjectId } from 'mongodb';
import Passenger from '../../application/domain/Passenger';
import PassengerRepository from '../../application/repository/PassengerRepository';
import { client } from '../../db';

export default class PassengerRepositoryDatabase implements PassengerRepository {
  async save(passenger: Passenger) {
    await client.connect();

    const data = await client.db('db1').collection('passengers').insertOne({
      _id: passenger._id,
      name: passenger.name,
      document: passenger.document.value,
      email: passenger.email.value,
    });
    await client.close();
    return { passengerId: data.insertedId.toString() };
  }

  async get(passengerId: string) {
    await client.connect();
    const data: any = await client
      .db('db1')
      .collection('passengers')
      .findOne({ _id: new ObjectId(passengerId) });
    await client.close();
    return new Passenger(data._id, data.name, data.email, data.document);
  }
}
