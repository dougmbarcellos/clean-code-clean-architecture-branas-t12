import CreatePassenger from './application/usecases/CreatePassenger';
import PassengerRepositoryDatabase from './infra/repository/PassengerRepositoryDatabase';

process.stdin.on('data', async (chunk) => {
  const command = chunk.toString().replace(/\n/, '');

  try {
    if (command.startsWith('create-passenger')) {
      const [name, email, document] = command.replace('create-passenger', '').trim().split(' ');
      const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
      const output = await usecase.execute({ name, email, document });
      console.log(output);
    }
  } catch (e: any) {
    console.error(e.message);
  }
});
