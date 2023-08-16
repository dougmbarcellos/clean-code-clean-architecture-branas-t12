import Ride from '../Ride';
import RideStatus from './RideStatus';

export default class EndedRideStatus extends RideStatus {
  value: string;

  constructor(ride: Ride) {
    super(ride);
    this.value = 'ended';
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
    throw new Error('Invalid status');
  }
}
