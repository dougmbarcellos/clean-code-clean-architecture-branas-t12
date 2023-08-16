import RideRepository from '../repository/RideRepository';

export default class AddSegmentToRide {
  constructor(readonly rideRepository: RideRepository) {}

  async execute(input: Input): Promise<Output> {
    const ride = await this.rideRepository.get(input.rideId);
    ride.addPosition(input.position.lat, input.position.long, new Date(input.position.date));
    ride.calculate();
    const output = await this.rideRepository.updateSegments(
      ride._id.toString(),
      ride.positions,
      ride.segments
    );
    return output;
  }
}

type Input = {
  rideId: string;
  position: { lat: number; long: number; date: string };
};

type Output = any;
