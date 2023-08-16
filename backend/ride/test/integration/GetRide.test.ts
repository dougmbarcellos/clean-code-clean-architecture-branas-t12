import UUIDGenerator from '../../src/application/domain/UUIDGenerator';
import GetRide from '../../src/application/usecases/GetRide';
import RequestRide from '../../src/application/usecases/RequestRide';
import MongoClientAdapter from '../../src/infra/database/MongoClientAdapter';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];
const connection = new MongoClientAdapter();

test('Deve obter os dados da corrida', async () => {
  const usecaseRequestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const input = {
    passengerId: UUIDGenerator.create().toString(),
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const outputRequestRide = await usecaseRequestRide.execute(input);

  const usecase = new GetRide(new RideRepositoryDatabase(connection));
  const output = await usecase.execute({ rideId: outputRequestRide._id });
  expect(output._id.toString()).toBe(outputRequestRide._id.toString());
  expect(output.passengerId).toBe(input.passengerId);
  expect(output.rideStatus).toBe('waiting_driver');
  expect(output.requestDate).toBeDefined();
  expect(output.positions.length).toBe(2);
  expect(output.acceptDate).toBeNull();
  expect(output.driverId).toBeNull();
});
