import CreateDriver from '../../src/application/usecases/CreateDriver';
import DriverRepositoryDatabase from '../../src/infra/repository/DriverRepositoryDatabase';

// broad integration test
test('Deve cadastrar um motorista', async function () {
  const input = {
    name: 'Doug',
    email: 'doug@doug.com',
    document: '111.444.777-35',
    carPlate: 'XYZ1230',
  };

  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  const output = await usecase.execute(input);
  expect(output.driverId).toBeDefined();
});

test('Não deve cadastrar um passageiro com documento inválido', async function () {
  const input = {
    name: 'Doug',
    email: 'doug@doug.com',
    document: '111.444.777-36',
    carPlate: 'XYZ1230',
  };
  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error('Invalid document'));
});

test('Não deve cadastrar um passageiro com email inválido', async function () {
  const input = {
    name: 'Doug',
    email: 'doug@doug',
    document: '111.444.777-35',
    carPlate: 'XYZ1230',
  };

  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error('Invalid email'));
});

test('Não deve cadastrar um passageiro com placa do carro inválida', async function () {
  const input = {
    name: 'Doug',
    email: 'doug@doug.com',
    document: '111.444.777-35',
    carPlate: 'XYZ123',
  };

  const usecase = new CreateDriver(new DriverRepositoryDatabase());
  await expect(() => usecase.execute(input)).rejects.toThrow(new Error('Invalid car plate'));
});
