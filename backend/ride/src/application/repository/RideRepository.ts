import Ride from '../domain/Ride';

export default interface RideRepository {
  save(ride: Ride): Promise<{
    rideId: string;
  }>;

  get(rideId: string): Promise<Ride>;

  accept(rideId: string, driverId: string): Promise<Object>;

  start(rideId: string): Promise<Object>;
}
