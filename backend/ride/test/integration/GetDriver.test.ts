import CreateDriver from '../../src/application/usecases/CreateDriver';
import GetDriver from '../../src/application/usecases/GetDriver';

test('Deve cadastrar e obter o motorista', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
    carPlate: 'XYZ1230',
  };
  const usecaseCreate = new CreateDriver();
  const outputCreate = await usecaseCreate.execute(input);
  const usecase = new GetDriver();
  const output = await usecase.execute(outputCreate);
  expect(output).toEqual({ ...input, ...outputCreate });
});
