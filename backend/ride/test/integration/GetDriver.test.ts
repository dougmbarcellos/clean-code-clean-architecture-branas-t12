import { ObjectId } from 'mongodb';
import Driver from '../../src/Driver';
import DriverRepository from '../../src/application/repository/DriverRepository';
import CreateDriver from '../../src/application/usecases/CreateDriver';
import GetDriver from '../../src/application/usecases/GetDriver';

// narrow integration test
test('Deve cadastrar e obter o motorista', async function () {
  const driverRepository: DriverRepository = {
    async save(driver: Driver) {
      return { driverId: new ObjectId().toString() };
    },
    async get(driverId: string) {
      return {
        _id: new ObjectId(driverId),
        name: 'Douglas',
        email: 'doug@doug.br',
        document: '111.444.777-35',
        carPlate: 'XYZ1230',
      };
    },
  };
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
    carPlate: 'XYZ1230',
  };
  const usecaseCreate = new CreateDriver(driverRepository);
  const outputCreate = await usecaseCreate.execute(input);
  const usecase = new GetDriver(driverRepository);
  const output = await usecase.execute(outputCreate);
  expect(output).toEqual({ ...input, ...outputCreate });
});