import { WithId } from 'mongodb';
import Driver from '../../Driver';

export default interface DriverRepository {
  save(driver: Driver): Promise<{
    driverId: string;
  }>;

  get(driverId: string): Promise<WithId<Driver> | null>;
}
