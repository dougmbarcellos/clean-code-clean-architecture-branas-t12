import Ride from '../Ride';
import EndedRideStatus from './EndedRideStatus';
import RideStatus from './RideStatus';

export default class StartedRideStatus extends RideStatus {
  value: string;

  constructor(ride: Ride) {
    super(ride);
    this.value = 'started';
  }

  request(): void {
    throw new Error('Invalid status');
  }
  accept(): void {
    throw new Error('Invalid status');
  }
  start(): void {
    throw new Error('Invalid status');
  }
  end(): void {
    this.ride.rideStatus = new EndedRideStatus(this.ride);
  }
  processPayment(): void {
    throw new Error('Invalid status');
  }
}
