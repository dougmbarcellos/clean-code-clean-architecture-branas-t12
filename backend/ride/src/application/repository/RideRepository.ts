import Position from '../domain/ride/Position';
import Ride from '../domain/ride/Ride';
import Segment from '../domain/ride/Segment';

export default interface RideRepository {
  save(ride: Ride): Promise<any>;

  get(rideId: string): Promise<Ride>;

  accept(rideId: string, driverId: string): Promise<Object>;

  start(rideId: string): Promise<Object>;

  updateSegments(rideId: string, positions: Position[], segments: Segment[]): Promise<Object>;

  end(rideId: string, endDate: Date, waitingDuration: number): Promise<Object>;
}
