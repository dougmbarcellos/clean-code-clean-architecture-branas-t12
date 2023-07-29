import Passenger from './Passenger';
import { client } from './db';

process.stdin.on('data', async (chunk) => {
  const command = chunk.toString().replace(/\n/, '');

  try {
    if (command.startsWith('create-passenger')) {
      const [name, email, document] = command.replace('create-passenger', '').trim().split(' ');
      console.log(name, email, document);
      const passenger = new Passenger(name, email, document);
      await client.connect();
      await client.db('db1').collection('passengers').insertOne(passenger);
      await client.close();
    }
  } catch (e: any) {
    console.error(e.message);
  }
});
