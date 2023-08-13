import Passenger from '../domain/Passenger';

export default interface PassengerRepository {
  save(passenger: Passenger): Promise<{
    passengerId: string;
  }>;

  get(passengerId: string): Promise<Passenger>;
}
