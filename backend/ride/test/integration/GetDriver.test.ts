import { ObjectId } from 'mongodb';
import Driver from '../../src/application/domain/driver/Driver';
import DriverRepository from '../../src/application/repository/DriverRepository';
import CreateDriver from '../../src/application/usecases/CreateDriver';
import GetDriver from '../../src/application/usecases/GetDriver';
import MongoClientAdapter from '../../src/infra/database/MongoClientAdapter';
import DriverRepositoryDatabase from '../../src/infra/repository/DriverRepositoryDatabase';

const connection = new MongoClientAdapter();

// afterAll(async () => {
//   await connection.close();
// });

// broad integration test
test('Deve cadastrar um motorista', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
    carPlate: 'XYZ1230',
  };
  const usecase = new CreateDriver(new DriverRepositoryDatabase(connection));
  const output = await usecase.execute(input);
  expect(output.driverId).toBeDefined();
});

// narrow integration test
test('Deve obter o motorista', async function () {
  const input = {
    name: 'Doug',
    email: 'doug@doug.com',
    document: '111.444.777-35',
    carPlate: 'XYZ1230',
  };

  // Fake test pattern
  const driverRepository: DriverRepository = {
    async save(driver: Driver) {
      return { driverId: new ObjectId().toString() };
    },
    async get(driverId: string) {
      return Driver.create(input.name, input.email, input.document, input.carPlate);
    },
  };

  // @ts-ignore
  const usecaseCreate = new CreateDriver(driverRepository);
  const outputCreate = await usecaseCreate.execute(input);
  // @ts-ignore
  const usecase = new GetDriver(driverRepository);
  const output = await usecase.execute(outputCreate);
  expect(output.driverId).toBeDefined();
  expect(output.name).toBe(input.name);
  expect(output.email).toBe(input.email);
  expect(output.document).toBe(input.document);
});
