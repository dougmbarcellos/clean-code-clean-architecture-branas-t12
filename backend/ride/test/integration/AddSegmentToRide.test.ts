import UUIDGenerator from '../../src/application/domain/UUIDGenerator';
import AcceptRide from '../../src/application/usecases/AcceptRide';
import AddSegmentToRide from '../../src/application/usecases/AddSegmentToRide';
import RequestRide from '../../src/application/usecases/RequestRide';
import StartRide from '../../src/application/usecases/StartRide';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSaoRoqueCLAMAP = [-19.7392598, -40.6695496];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve adicionar novo percurso', async () => {
  const usecaseRequestRide = new RequestRide(new RideRepositoryDatabase());
  const inputRequestRide = {
    passengerId: UUIDGenerator.create().toString(),
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const { rideId } = await usecaseRequestRide.execute(inputRequestRide);

  const usecaseAcceptRide = new AcceptRide(new RideRepositoryDatabase());
  const inputAcceptRide = {
    rideId,
    driverId: UUIDGenerator.create().toString(),
  };
  await usecaseAcceptRide.execute(inputAcceptRide);

  const usecaseStartRide = new StartRide(new RideRepositoryDatabase());
  const inputStartRide = {
    rideId,
  };
  await usecaseStartRide.execute(inputStartRide);

  const usecase = new AddSegmentToRide(new RideRepositoryDatabase());
  const input = {
    rideId,
    to: coordsSaoRoqueCLAMAP,
  };
  const output = await usecase.execute(input);
  expect(output.segments.length).toBe(2);
});
