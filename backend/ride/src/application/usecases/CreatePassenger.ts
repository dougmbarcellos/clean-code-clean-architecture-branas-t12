import Passenger from '../domain/passenger/Passenger';
import PassengerRepository from '../repository/PassengerRepository';

export default class CreatePassenger {
  constructor(readonly passengerRepository: PassengerRepository) {}

  async execute(input: Input): Promise<Output> {
    const passenger = Passenger.create(input.name, input.email, input.document);
    const passengerData = await this.passengerRepository.save(passenger);
    return passengerData;
  }
}

type Input = {
  name: string;
  email: string;
  document: string;
};

type Output = {
  passengerId: string;
};
