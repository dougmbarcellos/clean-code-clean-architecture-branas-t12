import Passenger from '../domain/passenger/Passenger';

export default interface PassengerRepository {
  save(passenger: Passenger): Promise<{
    passengerId: string;
  }>;

  get(passengerId: string): Promise<Passenger>;
}
