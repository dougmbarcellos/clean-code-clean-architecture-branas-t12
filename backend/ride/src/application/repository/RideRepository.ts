import Position from '../domain/Position';
import Ride from '../domain/Ride';
import Segment from '../domain/Segment';

export default interface RideRepository {
  save(ride: Ride): Promise<any>;

  get(rideId: string): Promise<Ride>;

  accept(rideId: string, driverId: string): Promise<Object>;

  start(rideId: string): Promise<Object>;

  updateSegments(rideId: string, positions: Position[], segments: Segment[]): Promise<Object>;

  end(rideId: string, endDate: Date, waitingDuration: number): Promise<Object>;
}
