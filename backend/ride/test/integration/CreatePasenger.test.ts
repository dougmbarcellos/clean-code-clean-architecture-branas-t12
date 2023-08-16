import CreatePassenger from '../../src/application/usecases/CreatePassenger';
import MongoClientAdapter from '../../src/infra/database/MongoClientAdapter';
import PassengerRepositoryDatabase from '../../src/infra/repository/PassengerRepositoryDatabase';

const connection = new MongoClientAdapter();

// afterAll(async () => {
//   await connection.close();
// });

test('Deve cadastrar um passageiro', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
  };

  const usecase = new CreatePassenger(new PassengerRepositoryDatabase(connection));
  const output = await usecase.execute(input);
  expect(output.passengerId).toBeDefined();
});

test('Não deve cadastrar um passageiro com documento inválido', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.com',
    document: '111.444.777-36',
  };

  const usecase = new CreatePassenger(new PassengerRepositoryDatabase(connection));
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error('Invalid document'));
});

test('Não deve cadastrar um passageiro com email inválido', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug',
    document: '111.444.777-35',
  };

  const usecase = new CreatePassenger(new PassengerRepositoryDatabase(connection));
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error('Invalid email'));
});
