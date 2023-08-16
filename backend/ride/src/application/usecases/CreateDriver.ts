import DriverRepository from '../../infra/repository/DriverRepositoryDatabase';
import Driver from '../domain/driver/Driver';

export default class CreateDriver {
  constructor(readonly driverRepository: DriverRepository) {}

  async execute(input: Input): Promise<Output> {
    const driver = Driver.create(input.name, input.email, input.document, input.carPlate);
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
