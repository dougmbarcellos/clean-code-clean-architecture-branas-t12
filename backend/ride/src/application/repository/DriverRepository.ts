import Driver from '../domain/Driver';

export default interface DriverRepository {
  save(driver: Driver): Promise<{
    driverId: string;
  }>;

  get(driverId: string): Promise<Driver>;
}
