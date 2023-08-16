import { ObjectId } from 'mongodb';
import Ride from '../../application/domain/Ride';
import Segment from '../../application/domain/Segment';
import RideRepository from '../../application/repository/RideRepository';
import DatabaseConnection from '../database/DatabaseConnection';

// Interface Adapter
export default class RideRepositoryDatabase implements RideRepository {
  constructor(readonly connection: DatabaseConnection) {}
  async save(ride: Ride) {
    const data = await this.connection.insertOne('rides', {
      _id: ride._id,
      passengerId: ride.passengerId,
      segments: ride.segments.map(({ from, to, date, distance }) => {
        return { from, to, date, distance };
      }),
      requestDate: ride.requestDate ? new Date(ride.requestDate) : null,
      rideStatus: ride.rideStatus,
      acceptDate: ride.acceptDate ? new Date(ride.acceptDate) : null,
      driverId: ride.driverId,
      startDate: ride.startDate ? new Date(ride.startDate) : null,
      endDate: ride.endDate ? new Date(ride.endDate) : null,
      waitingDuration: ride.waitingDuration,
    });
    await this.connection.close();
    return { rideId: data.insertedId.toString() };
  }

  async get(rideId: string) {
    const data: any = await this.connection.findOne('rides', { _id: new ObjectId(rideId) });
    const segments = (<Segment[]>data.segments).map(
      ({ from, to, date }) => new Segment(from, to, new Date(date))
    );
    await this.connection.close();
    return new Ride(
      data._id,
      data.passengerId,
      segments,
      new Date(data.requestDate),
      data.rideStatus,
      data.acceptDate,
      data.driverId,
      data.startDate,
      data.endDate,
      data.waitingDuration
    );
  }

  async accept(rideId: string, driverId: string) {
    const output = await this.connection.findOneAndUpdate(
      'rides',
      { _id: new ObjectId(rideId) },
      {
        $set: {
          driverId,
          acceptDate: new Date(),
          rideStatus: 'accepted',
        },
      },
      { returnDocument: 'after' }
    );
    await this.connection.close();
    return output.value!;
  }

  async start(rideId: string) {
    const output = await this.connection.findOneAndUpdate(
      'rides',
      { _id: new ObjectId(rideId) },
      {
        $set: {
          startDate: new Date(),
          rideStatus: 'started',
        },
      },
      { returnDocument: 'after' }
    );
    await this.connection.close();
    return output.value!;
  }

  async addSegment(rideId: string, segments: Segment[]) {
    const output = await this.connection.findOneAndUpdate(
      'rides',
      { _id: new ObjectId(rideId) },
      { $set: { segments } },
      { returnDocument: 'after' }
    );
    await this.connection.close();
    return output.value!;
  }

  async end(rideId: string, endDate: Date, waitingDuration: number) {
    const output = await this.connection.findOneAndUpdate(
      'rides',
      { _id: new ObjectId(rideId) },
      {
        $set: {
          endDate,
          waitingDuration,
          rideStatus: 'ended',
        },
      },
      { returnDocument: 'after' }
    );
    await this.connection.close();
    return output.value!;
  }
}
