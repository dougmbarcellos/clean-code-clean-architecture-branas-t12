import UUIDGenerator from '../../src/application/domain/UUIDGenerator';
import AcceptRide from '../../src/application/usecases/AcceptRide';
import EndRide from '../../src/application/usecases/EndRide';
import RequestRide from '../../src/application/usecases/RequestRide';
import StartRide from '../../src/application/usecases/StartRide';
import MongoClientAdapter from '../../src/infra/database/MongoClientAdapter';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];
const connection = new MongoClientAdapter();

test('Deve encerrar a corrida', async () => {
  const usecaseRequestRide = new RequestRide(new RideRepositoryDatabase(connection));
  const inputRequestRide = {
    passengerId: UUIDGenerator.create().toString(),
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const { _id: rideId } = await usecaseRequestRide.execute(inputRequestRide);

  const usecaseAcceptRide = new AcceptRide(new RideRepositoryDatabase(connection));
  const inputAcceptRide = {
    rideId,
    driverId: UUIDGenerator.create().toString(),
  };
  await usecaseAcceptRide.execute(inputAcceptRide);

  const usecaseStartRide = new StartRide(new RideRepositoryDatabase(connection));
  const inputStartRide = { rideId };
  await usecaseStartRide.execute(inputStartRide);

  const usecase = new EndRide(new RideRepositoryDatabase(connection));
  const input = { rideId };
  const output = await usecase.execute(input);
  expect(output.rideStatus).toBe('ended');
  expect(output.endDate).toBeDefined();
  expect(output.waitingDuration).toBeDefined();
});
