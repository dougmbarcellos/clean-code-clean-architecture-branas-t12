import CreatePassenger from '../../src/application/usecases/CreatePassenger';
import GetPassenger from '../../src/application/usecases/GetPassenger';
import PassengerRepositoryDatabase from '../../src/infra/repository/PassengerRepositoryDatabase';

test('Deve cadastrar e obter o passageiro', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
  };
  const usecaseCreate = new CreatePassenger(new PassengerRepositoryDatabase());
  const outputCreate = await usecaseCreate.execute(input);
  const usecase = new GetPassenger(new PassengerRepositoryDatabase());
  const output = await usecase.execute(outputCreate);
  expect(output).toEqual({ ...input, passengerId: outputCreate.passengerId });
});
