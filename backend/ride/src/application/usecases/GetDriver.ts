import DriverRepository from '../../infra/repository/DriverRepositoryDatabase';

export default class GetDriver {
  constructor(readonly driverRepository: DriverRepository) {}

  async execute(input: Input): Promise<Output> {
    const driverData = await this.driverRepository.get(input.driverId);
    if (!driverData) throw new Error('Not found');
    return {
      driverId: driverData._id.toString(),
      name: driverData.name,
      email: driverData.email.value,
      document: driverData.document.value,
      carPlate: driverData.carPlate.value,
    };
  }
}

type Input = {
  driverId: string;
};

type Output = {
  driverId: string;
  name: string;
  email: string;
  document: string;
  carPlate: string;
};
