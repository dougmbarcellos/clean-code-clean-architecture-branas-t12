import UUIDGenerator from '../../src/application/domain/UUIDGenerator';
import AcceptRide from '../../src/application/usecases/AcceptRide';
import RequestRide from '../../src/application/usecases/RequestRide';
import StartRide from '../../src/application/usecases/StartRide';
import RideRepositoryDatabase from '../../src/infra/repository/RideRepositoryDatabase';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve iniciar uma corrida', async () => {
  const usecaseRequestRide = new RequestRide(new RideRepositoryDatabase());
  const inputRequestRide = {
    passengerId: UUIDGenerator.create().toString(),
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const outputRequestRide = await usecaseRequestRide.execute(inputRequestRide);

  const usecaseAcceptRide = new AcceptRide(new RideRepositoryDatabase());
  const inputAcceptRide = {
    rideId: outputRequestRide.rideId,
    driverId: UUIDGenerator.create().toString(),
  };
  const outputAcceptRide = await usecaseAcceptRide.execute(inputAcceptRide);

  const usecase = new StartRide(new RideRepositoryDatabase());
  const input = {
    rideId: outputAcceptRide._id,
  };
  const output = await usecase.execute(input);
  expect(output.startDate).toBeDefined();
});
