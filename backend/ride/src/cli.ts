import CreatePassenger from './application/usecases/CreatePassenger';
import MongoClientAdapter from './infra/database/MongoClientAdapter';
import PassengerRepositoryDatabase from './infra/repository/PassengerRepositoryDatabase';

process.stdin.on('data', async (chunk) => {
  const command = chunk.toString().replace(/\n/, '');
  const connection = new MongoClientAdapter();
  try {
    if (command.startsWith('create-passenger')) {
      const [name, email, document] = command.replace('create-passenger', '').trim().split(' ');
      const usecase = new CreatePassenger(new PassengerRepositoryDatabase(connection));
      const output = await usecase.execute({ name, email, document });
      connection.close();
      console.log(output);
    }
  } catch (e: any) {
    console.error(e.message);
  }
});
