import Ride from '../Ride';
import AcceptedRideStatus from './AcceptedRideStatus';
import EndedRideStatus from './EndedRideStatus';
import RequestedRideStatus from './RequestedRideStatus';
import StartedRideStatus from './StartedRideStatus';

export default class RideStatusFactory {
  static create(ride: Ride, status: string) {
    if (status === 'requested') {
      return new RequestedRideStatus(ride);
    }

    if (status === 'accepted') {
      return new AcceptedRideStatus(ride);
    }

    if (status === 'started') {
      return new StartedRideStatus(ride);
    }

    if (status === 'ended') {
      return new EndedRideStatus(ride);
    }

    throw new Error('Invalid status');
  }
}