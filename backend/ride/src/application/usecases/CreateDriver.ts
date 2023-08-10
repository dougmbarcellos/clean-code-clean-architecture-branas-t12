import Driver from '../../Driver';
import { client } from '../../db';

export default class CreateDriver {
  constructor() {}

  async execute(input: Input): Promise<Output> {
    try {
      const driver = new Driver(input.name, input.email, input.document, input.carPlate);
      await client.connect();
      const data = await client.db('db1').collection('drivers').insertOne(driver);
      return { driverId: data.insertedId.toString() };
    } finally {
      await client.close();
    }
  }
}

type Input = {
  name: string;
  email: string;
  document: string;
  carPlate: string;
};

type Output = {
  driverId: string;
};
