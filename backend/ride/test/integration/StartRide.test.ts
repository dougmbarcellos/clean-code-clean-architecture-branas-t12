import UUIDGenerator from '../../src/application/domain/identity/UUIDGenerator';
import AcceptRide from '../../src/application/usecases/AcceptRide';
import RequestRide from '../../src/application/usecases/RequestRide';
import StartRide from '../../src/application/usecases/StartRide';
import MongoClientAdapter from '../../src/infra/database/MongoClientAdapter';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];
const connection = new MongoClientAdapter();

test('Deve iniciar uma corrida', async () => {
  const usecaseRequestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const inputRequestRide = {
    passengerId: UUIDGenerator.create().toString(),
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const outputRequestRide = await usecaseRequestRide.execute(inputRequestRide);

  const usecaseAcceptRide = new AcceptRide(new RideRepositoryDatabase(connection));
  const inputAcceptRide = {
    rideId: outputRequestRide._id,
    driverId: UUIDGenerator.create().toString(),
  };
  const outputAcceptRide = await usecaseAcceptRide.execute(inputAcceptRide);

  const usecase = new StartRide(new RideRepositoryDatabase(connection));
  const input = {
    rideId: outputAcceptRide._id,
  };
  const output = await usecase.execute(input);
  expect(output.rideStatus).toBe('started');
  expect(output.startDate).toBeDefined();
});
