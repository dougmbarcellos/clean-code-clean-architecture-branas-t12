import CreatePassenger from '../../src/application/usecases/CreatePassenger';

test('Deve cadastrar um passageiro', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
  };

  const usecase = new CreatePassenger();
  const output = await usecase.execute(input);
  expect(output.passengerId).toBeDefined();
});
