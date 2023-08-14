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
        segments: ride.segments.map(({ from, to, date, distance }) => {
          return { from, to, date, distance };
        }),
        requestDate: ride.requestDate,
        rideStatus: ride.rideStatus,
        driverId: ride.driverId,
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
      data.driverId
    );
  }
}
