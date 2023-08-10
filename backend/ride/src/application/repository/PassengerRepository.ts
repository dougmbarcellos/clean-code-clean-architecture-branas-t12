import { WithId } from 'mongodb';
import Passenger from '../../Passenger';

export default interface PassengerRepository {
  save(passenger: Passenger): Promise<{
    passengerId: string;
  }>;

  get(passengerId: string): Promise<WithId<Passenger> | null>;
}
