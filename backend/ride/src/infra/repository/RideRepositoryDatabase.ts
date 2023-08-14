import { ObjectId } from 'mongodb';
import Ride from '../../application/domain/Ride';
import Segment from '../../application/domain/Segment';
import RideRepository from '../../application/repository/RideRepository';
import { client } from '../../db';

export default class RideRepositoryDatabase implements RideRepository {
  async save(ride: Ride) {
    await client.connect();
    const data = await client
      .db('db1')
      .collection('rides')
      .insertOne({
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
    await client.close();
    return { rideId: data.insertedId.toString() };
  }

  async get(rideId: string) {
    await client.connect();
    const data: any = await client
      .db('db1')
      .collection('rides')
      .findOne({ _id: new ObjectId(rideId) });
    await client.close();
    const segments = (<Segment[]>data.segments).map(
      ({ from, to, date }) => new Segment(from, to, new Date(date))
    );
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
    await client.connect();
    const output = await client
      .db('db1')
      .collection('rides')
      .findOneAndUpdate(
        {
          _id: new ObjectId(rideId),
        },
        {
          $set: {
            driverId,
            acceptDate: new Date(),
            rideStatus: 'accepted',
          },
        },
        {
          returnDocument: 'after',
        }
      );
    await client.close();

    return output.value!;
  }

  async start(rideId: string) {
    await client.connect();
    const output = await client
      .db('db1')
      .collection('rides')
      .findOneAndUpdate(
        {
          _id: new ObjectId(rideId),
        },
        {
          $set: {
            startDate: new Date(),
            rideStatus: 'started',
          },
        },
        {
          returnDocument: 'after',
        }
      );
    await client.close();

    return output.value!;
  }

  async addSegment(rideId: string, segments: Segment[]) {
    await client.connect();
    const output = await client
      .db('db1')
      .collection('rides')
      .findOneAndUpdate(
        { _id: new ObjectId(rideId) },
        { $set: { segments } },
        { returnDocument: 'after' }
      );
    await client.close();

    return output.value!;
  }

  async end(rideId: string, endDate: Date, waitingDuration: number) {
    await client.connect();
    const output = await client
      .db('db1')
      .collection('rides')
      .findOneAndUpdate(
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
    await client.close();
    return output.value!;
  }
}
