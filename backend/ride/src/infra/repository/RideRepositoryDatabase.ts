import { ObjectId } from 'mongodb';
import Position from '../../application/domain/ride/Position';
import Ride from '../../application/domain/ride/Ride';
import Segment from '../../application/domain/ride/Segment';
import RideRepository from '../../application/repository/RideRepository';
import DatabaseConnection from '../database/DatabaseConnection';

// Interface Adapter
export default class RideRepositoryDatabase implements RideRepository {
  constructor(readonly connection: DatabaseConnection) {}
  async save(ride: Ride) {
    const data = {
      _id: ride._id,
      passengerId: ride.passengerId,
      segments: ride.segments,
      positions: ride.positions,
      requestDate: ride.requestDate ? new Date(ride.requestDate) : null,
      rideStatus: ride.rideStatus,
      acceptDate: ride.acceptDate ? new Date(ride.acceptDate) : null,
      driverId: ride.driverId,
      startDate: ride.startDate ? new Date(ride.startDate) : null,
      endDate: ride.endDate ? new Date(ride.endDate) : null,
      waitingDuration: ride.waitingDuration,
    };
    await this.connection.insertOne('rides', data);
    await this.connection.close();
    return data;
  }

  async get(rideId: string) {
    const data: any = await this.connection.findOne('rides', { _id: new ObjectId(rideId) });
    await this.connection.close();
    const ride = new Ride(
      data._id,
      data.passengerId,
      new Date(data.requestDate),
      data.rideStatus,
      data.acceptDate,
      data.driverId,
      data.startDate,
      data.endDate,
      data.waitingDuration
    );

    if (data.positions) {
      for (const position of data.positions) {
        ride.addPosition(position.lat, position.long, new Date(position.date));
      }
    }
    ride.calculate();
    return ride;
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

  async updateSegments(rideId: string, positions: Position[], segments: Segment[]) {
    const output = await this.connection.findOneAndUpdate(
      'rides',
      { _id: new ObjectId(rideId) },
      { $set: { positions, segments } },
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
