import Driver from '../../Driver';
import DriverRepository from '../../infra/repository/DriverRepositoryDatabase';

export default class CreateDriver {
  constructor(readonly driverRepository: DriverRepository) {}

  async execute(input: Input): Promise<Output> {
    const driver = new Driver(input.name, input.email, input.document, input.carPlate);
    const driverData = await this.driverRepository.save(driver);
    return driverData;
  }
}

type Input = {
  name: string;
  email: string;
  document: string;
  carPlate: string;
};

type Output = {
  driverId: string;
};
