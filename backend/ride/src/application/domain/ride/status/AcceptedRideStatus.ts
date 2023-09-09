import Ride from '../Ride';
import RideStatus from './RideStatus';
import StartedRideStatus from './StartedRideStatus';

export default class AcceptedRideStatus extends RideStatus {
  value: string;

  constructor(ride: Ride) {
    super(ride);
    this.value = 'accepted';
  }

  request(): void {
    throw new Error('Invalid status');
  }
  accept(): void {
    throw new Error('Invalid status');
  }
  start(): void {
    this.ride.rideStatus = new StartedRideStatus(this.ride);
  }
  end(): void {
    throw new Error('Invalid status');
  }
  processPayment(): void {
    throw new Error('Invalid status');
  }
}
