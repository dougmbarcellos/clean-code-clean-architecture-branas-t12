import { ChangeStreamUpdateDocument } from 'mongodb';
import AcceptRide from './application/usecases/AcceptRide';
import AddSegmentToRide from './application/usecases/AddSegmentToRide';
import CalculateRide from './application/usecases/CalculateRide';
import CreateDriver from './application/usecases/CreateDriver';
import CreatePassenger from './application/usecases/CreatePassenger';
import EndRide from './application/usecases/EndRide';
import GetDriver from './application/usecases/GetDriver';
import GetPassenger from './application/usecases/GetPassenger';
import GetRide from './application/usecases/GetRide';
import ProcessPayment from './application/usecases/ProcessPayment';
import RequestRide from './application/usecases/RequestRide';
import StartRide from './application/usecases/StartRide';
import UpdateRideLocation from './application/usecases/UpdateRideLocation';
import MongoClientAdapter from './infra/database/MongoClientAdapter';
import ExpressAdapter from './infra/http/ExpressAdapter';
import MainController from './infra/http/MainController';
import DriverRepositoryDatabase from './infra/repository/DriverRepositoryDatabase';
import PassengerRepositoryDatabase from './infra/repository/PassengerRepositoryDatabase';
import RideRepositoryDatabase from './infra/repository/RideRepositoryDatabase';

// Main composition root
const connection = new MongoClientAdapter();
const calculateRide = new CalculateRide();
const passengerRepository = new PassengerRepositoryDatabase(connection);
const driverRepository = new DriverRepositoryDatabase(connection);
const rideRepository = new RideRepositoryDatabase(connection);
const createPassenger = new CreatePassenger(passengerRepository);
const getPassenger = new GetPassenger(passengerRepository);
const createDriver = new CreateDriver(driverRepository);
const getDriver = new GetDriver(driverRepository);
const requestRide = new RequestRide(rideRepository);
const getRide = new GetRide(rideRepository);
const acceptRide = new AcceptRide(rideRepository);
const startRide = new StartRide(rideRepository);
const updateRideLocation = new UpdateRideLocation(rideRepository);
const addSegmentToRide = new AddSegmentToRide(rideRepository);
const endRide = new EndRide(rideRepository);
const processPayment = new ProcessPayment(rideRepository);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiAdapter();

new MainController(
  httpServer,
  calculateRide,
  createPassenger,
  getPassenger,
  createDriver,
  getDriver,
  requestRide,
  getRide,
  acceptRide,
  startRide,
  updateRideLocation,
  addSegmentToRide,
  endRide
);

httpServer.listen(3000);

rideRepository
  .watch([
    {
      $match: {
        $and: [
          { 'updateDescription.updatedFields': { rideStatus: 'ended' } },
          { operationType: 'update' },
        ],
      },
    },
  ])
  .then((changeStream) => {
    changeStream.on('change', (event: ChangeStreamUpdateDocument) => {
      processPayment.execute({ rideId: event.documentKey._id.toString(), date: new Date() });
    });
  });
