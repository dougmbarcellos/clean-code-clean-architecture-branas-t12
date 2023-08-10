import CreatePassenger from '../../src/application/usecases/CreatePassenger';
import GetPassenger from '../../src/application/usecases/GetPassenger';

test('Deve cadastrar e obter o passageiro', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
  };
  const usecaseCreate = new CreatePassenger();
  const outputCreate = await usecaseCreate.execute(input);
  const usecase = new GetPassenger();
  const output = await usecase.execute(outputCreate);
  expect(output).toEqual({ ...input, ...outputCreate });
});
