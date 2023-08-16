import Driver from '../domain/driver/Driver';

export default interface DriverRepository {
  save(driver: Driver): Promise<{
    driverId: string;
  }>;

  get(driverId: string): Promise<Driver>;
}
