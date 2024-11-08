import { ChangeStream, Document } from 'mongodb';
import Ride from '../domain/ride/Ride';

export default interface RideRepository {
  insert(ride: Ride): Promise<any>;

  update(ride: Ride): Promise<any>;

  get(rideId: string): Promise<Ride>;

  watch(pipeline?: Document[]): Promise<ChangeStream>;
}
