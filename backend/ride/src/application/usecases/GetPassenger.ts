import { ObjectId } from 'mongodb';
import Passenger from '../../Passenger';
import { client } from '../../db';

export default class GetPassenger {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    try {
      await client.connect();
      const data = await client
        .db('db1')
        .collection<Passenger>('passengers')
        .findOne({ _id: new ObjectId(input.passengerId) });
      if (!data) throw new Error('Not found');
      return {
        passengerId: data._id.toString(),
        name: data.name,
        email: data.email,
        document: data.document,
      };
    } finally {
      await client.close();
    }
  }
}

type Input = {
  passengerId: string;
};

type Output = {
  passengerId: string;
  name: string;
  email: string;
  document: string;
};
