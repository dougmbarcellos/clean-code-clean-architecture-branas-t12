import PassengerRepository from '../repository/PassengerRepository';
import RideRepository from '../repository/RideRepository';

export default class SendInvoice {
  constructor(
    readonly rideRepository: RideRepository,
    readonly passengerRepository: PassengerRepository
  ) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    const passenger = await this.passengerRepository.get(ride.passengerId);
    // [enviar email para passenger.email]
    ride.sendInvoice(input.date);
    const output = await this.rideRepository.update(ride);
    return output;
  }
}

type Input = {
  rideId: string;
  date: Date;
};

type Output = any;
