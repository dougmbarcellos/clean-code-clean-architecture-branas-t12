import UUIDGenerator from '../../src/application/domain/identity/UUIDGenerator';
import AcceptRide from '../../src/application/usecases/AcceptRide';
import GetRide from '../../src/application/usecases/GetRide';
import RequestRide from '../../src/application/usecases/RequestRide';
import MongoClientAdapter from '../../src/infra/database/MongoClientAdapter';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];
const connection = new MongoClientAdapter();

test('Deve aceitar uma corrida', async () => {
  const usecaseRequestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const inputRequestRide = {
    passengerId: UUIDGenerator.create().toString(),
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const outputRequestRide = await usecaseRequestRide.execute(inputRequestRide);

  const usecase = new AcceptRide(new RideRepositoryDatabase(connection));
  const input = {
    rideId: outputRequestRide._id,
    driverId: UUIDGenerator.create().toString(),
  };
  const output = await usecase.execute(input);
  expect(output.acceptDate).toBeDefined();
  expect(output.rideStatus).toBe('accepted');

  const usecaseGedRide = new GetRide(new RideRepositoryDatabase(connection));
  const outputGedRide = await usecaseGedRide.execute({ rideId: outputRequestRide._id });
  expect(outputGedRide.driverId).not.toBeNull();
  expect(outputGedRide.requestDate).not.toBeNull();
});
