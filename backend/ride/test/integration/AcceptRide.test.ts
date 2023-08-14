import UUIDGenerator from '../../src/application/domain/UUIDGenerator';
import AcceptRide from '../../src/application/usecases/AcceptRide';
import GetRide from '../../src/application/usecases/GetRide';
import RequestRide from '../../src/application/usecases/RequestRide';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve aceitar uma corrida', async () => {
  const usecaseRequestRide = new RequestRide(new RideRepositoryDatabase());
  const inputRequestRide = {
    passengerId: UUIDGenerator.create().toString(),
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const outputRequestRide = await usecaseRequestRide.execute(inputRequestRide);

  const usecase = new AcceptRide(new RideRepositoryDatabase());
  const input = {
    rideId: outputRequestRide.rideId,
    driverId: UUIDGenerator.create().toString(),
  };
  const output = await usecase.execute(input);
  expect(output.acceptDate).toBeDefined();
  expect(output.rideStatus).toBe('accepted');

  const usecaseGedRide = new GetRide(new RideRepositoryDatabase());
  const outputGedRide = await usecaseGedRide.execute(outputRequestRide);
  expect(outputGedRide.driverId).not.toBeNull();
  expect(outputGedRide.requestDate).not.toBeNull();
});
