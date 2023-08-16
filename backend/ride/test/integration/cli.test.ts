import CreatePassenger from '../../src/application/usecases/CreatePassenger';
import CLIController from '../../src/infra/cli/CLIController';
import InputOutput from '../../src/infra/cli/InputOutput';
import MongoClientAdapter from '../../src/infra/database/MongoClientAdapter';
import PassengerRepositoryDatabase from '../../src/infra/repository/PassengerRepositoryDatabase';

test('Deve criar um passageiro usando o CLI', async () => {
  const output: any[] = [];
  const connection = new MongoClientAdapter();
  const passengerRepository = new PassengerRepositoryDatabase(connection);
  const createPassenger = new CreatePassenger(passengerRepository);
  const inputOutput = new (class extends InputOutput {
    write(text: string): void {
      output.push(JSON.parse(text));
    }
  })();
  new CLIController(inputOutput, createPassenger);
  await inputOutput.type('create-passenger doug doug@doug.com 111.444.777-35');
  expect(output.at(0).passengerId).toBeDefined();
  await connection.close();
});
