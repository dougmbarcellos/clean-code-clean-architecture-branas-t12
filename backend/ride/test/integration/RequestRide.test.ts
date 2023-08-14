import UUIDGenerator from '../../src/application/domain/UUIDGenerator';
import RequestRide from '../../src/application/usecases/RequestRide';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSaoRoqueCLAMAP = [-19.7392598, -40.6695496];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve solicitar uma corrida', async () => {
  const usecase = new RequestRide(new RideRepositoryDatabase());
  const input = {
    passengerId: UUIDGenerator.create().toString(),
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
    rideStatus: 'waiting_driver',
  };
  const output = await usecase.execute(input);
  expect(output.rideId).toBeDefined();
});
