import AcceptRide from '../../application/usecases/AcceptRide';
import AddSegmentToRide from '../../application/usecases/AddSegmentToRide';
import CalculateRide from '../../application/usecases/CalculateRide';
import CreateDriver from '../../application/usecases/CreateDriver';
import CreatePassenger from '../../application/usecases/CreatePassenger';
import EndRide from '../../application/usecases/EndRide';
import GetDriver from '../../application/usecases/GetDriver';
import GetPassenger from '../../application/usecases/GetPassenger';
import GetRide from '../../application/usecases/GetRide';
import RequestRide from '../../application/usecases/RequestRide';
import StartRide from '../../application/usecases/StartRide';
import UpdateRideLocation from '../../application/usecases/UpdateRideLocation';
import HttpServer from './HttpServer';

export default class MainController {
  constructor(
    httpServer: HttpServer,
    calculateRide: CalculateRide,
    createPassenger: CreatePassenger,
    getPassenger: GetPassenger,
    createDriver: CreateDriver,
    getDriver: GetDriver,
    requestRide: RequestRide,
    getRide: GetRide,
    acceptRide: AcceptRide,
    startRide: StartRide,
    updateRideLocation: UpdateRideLocation,
    addSegmentToRide: AddSegmentToRide,
    endRide: EndRide
  ) {
    httpServer.on('post', '/calculate_ride', async function (params: any, body: any) {
      const output = await calculateRide.execute({ positions: body.positions });
      return output;
    });

    httpServer.on('post', '/passengers', async function (params: any, body: any) {
      const output = await createPassenger.execute(body);
      return output;
    });

    httpServer.on('get', '/passengers/:{passengerId}', async function (params: any, body: any) {
      const output = await getPassenger.execute({ passengerId: params.passengerId });
      return output;
    });

    httpServer.on('post', '/drivers', async function (params: any, body: any) {
      const output = await createDriver.execute(body);
      return output;
    });

    httpServer.on('get', '/drivers/:{driverId}', async function (params: any, body: any) {
      const output = await getDriver.execute({ driverId: params.driverId });
      return output;
    });

    httpServer.on('post', '/request_ride', async function (params: any, body: any) {
      const output = await requestRide.execute({
        passengerId: body.passengerId,
        positions: body.positions,
      });
      return output;
    });

    httpServer.on('get', '/rides/:{rideId}', async function (params: any, body: any) {
      const output = await getRide.execute({ rideId: params.rideId });
      return {
        rideId: output._id,
        passengerId: output.passengerId,
        segments: output.segments,
        positions: output.positions,
        locations: output.locations,
        requestDate: output.requestDate,
        rideStatus: output.rideStatus.value,
        driverId: output.driverId,
        acceptDate: output.acceptDate,
        startDate: output.startDate,
        endDate: output.endDate,
        waitingDuration: output.waitingDuration,
        processPaymentDate: output.processPaymentDate,
      };
    });

    httpServer.on('post', '/accept_ride', async function (params: any, body: any) {
      const output = await acceptRide.execute({
        rideId: body.rideId,
        driverId: body.driverId,
      });
      return output;
    });

    httpServer.on('post', '/start_ride', async function (params: any, body: any) {
      const output = await startRide.execute({
        rideId: body.rideId,
      });
      return output;
    });

    httpServer.on('post', '/update_ride_location', async function (params: any, body: any) {
      const output = await updateRideLocation.execute({
        rideId: body.rideId,
        location: body.location,
        date: body.date,
      });
      return output;
    });

    httpServer.on('post', '/add_segment_to_ride', async function (params: any, body: any) {
      const output = await addSegmentToRide.execute({
        rideId: body.rideId,
        position: body.position,
      });
      return output;
    });

    httpServer.on('post', '/end_ride', async function (params: any, body: any) {
      const output = await endRide.execute({
        rideId: body.rideId,
      });
      return output;
    });
  }
}
