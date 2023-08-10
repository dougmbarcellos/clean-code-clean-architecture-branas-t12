import Passenger from '../../Passenger';
import PassengerRepository from '../repository/PassengerRepository';

export default class CreatePassenger {
  constructor(readonly passengerRepository: PassengerRepository) {}

  async execute(input: Input): Promise<Output> {
    const passenger = new Passenger(input.name, input.email, input.document);
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
