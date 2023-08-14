import Ride from '../domain/Ride';

export default interface RideRepository {
  save(ride: Ride): Promise<{
    rideId: string;
  }>;

  get(rideId: string): Promise<Ride>;
}
