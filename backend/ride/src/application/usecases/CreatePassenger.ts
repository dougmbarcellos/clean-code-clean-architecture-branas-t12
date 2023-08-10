import Passenger from '../../Passenger';
import { client } from '../../db';

export default class CreatePassenger {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    try {
      const passenger = new Passenger(input.name, input.email, input.document);
      await client.connect();
      const data = await client.db('db1').collection('passengers').insertOne(passenger);
      return { passengerId: data.insertedId.toString() };
    } finally {
      await client.close();
    }
  }
}

type Input = {
  name: string;
  email: string;
  document: string;
};

type Output = {
  passengerId: string;
};
