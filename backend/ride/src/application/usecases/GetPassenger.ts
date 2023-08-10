import PassengerRepository from '../repository/PassengerRepository';

export default class GetPassenger {
  constructor(readonly passengerRepository: PassengerRepository) {}

  async execute(input: Input): Promise<Output> {
    const passengerData = await this.passengerRepository.get(input.passengerId);
    if (!passengerData) throw new Error('Not found');
    return {
      passengerId: passengerData._id.toString(),
      name: passengerData.name,
      email: passengerData.email,
      document: passengerData.document,
    };
  }
}

type Input = {
  passengerId: string;
};

type Output = {
  passengerId: string;
  name: string;
  email: string;
  document: string;
};
