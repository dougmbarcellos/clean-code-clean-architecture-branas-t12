import CreateDriver from '../../src/application/usecases/CreateDriver';

test('Deve cadastrar um motorista', async function () {
  const input = {
    name: 'Douglass',
    email: 'doug@doug.brr',
    document: '111.444.777-35',
    carPlate: 'XYZ1230',
  };

  const usecase = new CreateDriver();
  const output = await usecase.execute(input);
  expect(output.driverId).toBeDefined();
});
