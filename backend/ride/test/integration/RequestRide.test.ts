import UUIDGenerator from '../../src/application/domain/identity/UUIDGenerator';
import RequestRide from '../../src/application/usecases/RequestRide';
import MongoClientAdapter from '../../src/infra/database/MongoClientAdapter';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];
const connection = new MongoClientAdapter();

test('Deve solicitar uma corrida', async () => {
  const usecase = new RequestRide(new RideRepositoryDatabase(connection));
  const input = {
    passengerId: UUIDGenerator.create().toString(),
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const output = await usecase.execute(input);
  expect(output._id).toBeDefined();
});
