import UUIDGenerator from '../../src/application/domain/UUIDGenerator';
import GetRide from '../../src/application/usecases/GetRide';
import RequestRide from '../../src/application/usecases/RequestRide';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve obter os dados da corrida', async () => {
  const usecaseRequestRide = new RequestRide(new RideRepositoryDatabase());
  const input = {
    passengerId: UUIDGenerator.create().toString(),
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const outputRequestRide = await usecaseRequestRide.execute(input);

  const usecase = new GetRide(new RideRepositoryDatabase());
  const output = await usecase.execute(outputRequestRide);
  expect(output._id.toString()).toBe(outputRequestRide.rideId);
  expect(output.passengerId).toBe(input.passengerId);
  expect(output.rideStatus).toBe('waiting_driver');
  expect(output.requestDate).toBeDefined();
  expect(output.segments.length).toBe(1);
  expect(output.acceptDate).toBeNull();
  expect(output.driverId).toBeNull();
});
