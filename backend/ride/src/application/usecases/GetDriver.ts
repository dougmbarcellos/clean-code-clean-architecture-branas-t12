import { ObjectId } from 'mongodb';
import Driver from '../../Driver';
import { client } from '../../db';

export default class GetDriver {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    await client.connect();
    const data = await client
      .db('db1')
      .collection<Driver>('drivers')
      .findOne({ _id: new ObjectId(input.driverId) });
    if (!data) throw new Error('Not found');
    await client.close();
    return {
      driverId: data._id.toString(),
      name: data.name,
      email: data.email,
      document: data.document,
      carPlate: data.carPlate,
    };
  }
}

type Input = {
  driverId: string;
};

type Output = {
  driverId: string;
  name: string;
  email: string;
  document: string;
  carPlate: string;
};
