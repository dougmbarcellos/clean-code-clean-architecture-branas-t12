// @ts-nocheck
import express from 'express';
import { ObjectId, WithId } from 'mongodb';
import Driver from './Driver';
import Passenger from './Passenger';
import Ride from './Ride';
import { client } from './db';

const app = express();

app.use(express.json());

function initRouter() {
  app.post('/calculate_ride', function (req, res) {
    try {
      const ride = new Ride();
      for (const segment of req.body.segments) {
        ride.addSegment(segment.from, segment.to, new Date(segment.date));
      }
      const price = ride.calculate();
      res.json({ price });
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  app.post('/passengers', async function (req, res) {
    try {
      const passenger = new Passenger(req.body.name, req.body.email, req.body.document);
      await client.connect();
      const data = await client.db('db1').collection('passengers').insertOne(passenger);
      res.json({ passengerId: data.insertedId });
    } catch (e) {
      res.status(422).send(e.message);
    } finally {
      await client.close();
    }
  });

  app.get('/passengers/:passengerId', async function (req, res) {
    try {
      await client.connect();
      const data: WithId<Passenger> = await client
        .db('db1')
        .collection('passengers')
        .findOne({ _id: new ObjectId(req.params.passengerId) }, { name: 1, email: 1, document: 1 });

      res.json({
        passengerId: data._id,
        name: data.name,
        email: data.email,
        document: data.document,
      });
    } catch (e) {
      res.status(422).send(e.message);
    } finally {
      await client.close();
    }
  });

  app.post('/drivers', async function (req, res) {
    try {
      const driver = new Driver(
        req.body.name,
        req.body.email,
        req.body.document,
        req.body.carPlate
      );
      await client.connect();
      const data = await client.db('db1').collection('drivers').insertOne(driver);
      res.json({ driverId: data.insertedId });
    } catch (e) {
      res.status(422).send(e.message);
    } finally {
      await client.close();
    }
  });

  app.get('/drivers/:driverId', async function (req, res) {
    try {
      await client.connect();
      const data: WithId<Driver> = await client
        .db('db1')
        .collection('drivers')
        .findOne(
          { _id: new ObjectId(req.params.driverId) },
          { name: 1, email: 1, document: 1, carPlate: 1 }
        );
      res.json({
        driverId: data._id,
        name: data.name,
        email: data.email,
        document: data.document,
        carPlate: data.carPlate,
      });
    } catch (e) {
      res.status(422).send(e.message);
    } finally {
      await client.close();
    }
  });

  app.post('/request_ride', async function (req, res) {
    try {
      await client.connect();
      const data = await client.db('db1').collection('rides').insertOne({
        passengerId: req.body.passengerId,
        driverId: null,
        from: req.body.from,
        to: req.body.to,
        requestDate: new Date(),
        rideStatus: 'waiting_driver',
      });
      res.json({ rideId: data.insertedId });
    } catch (e) {
      res.status(422).send(e.message);
    } finally {
      await client.close();
    }
  });

  app.get('/rides/:rideId', async function (req, res) {
    try {
      await client.connect();
      const data = await client
        .db('db1')
        .collection('rides')
        .findOne(
          { _id: new ObjectId(req.params.rideId) },
          { rideId: 1, requestDate: 1, rideStatus: 1, passengerId: 1, driverId: 1, acceptDate: 1 }
        );
      res.json({
        rideId: data._id,
        requestDate: data.requestDate,
        rideStatus: data.rideStatus,
        passengerId: data.passengerId,
        driverId: data.driverId,
        acceptDate: data.acceptDate,
      });
    } catch (e) {
      res.status(422).send(e.message);
    } finally {
      await client.close();
    }
  });

  app.post('/accept_ride', async function (req, res) {
    try {
      await client.connect();
      await client
        .db('db1')
        .collection('rides')
        .updateOne(
          { _id: new ObjectId(req.body.rideId) },
          {
            $set: {
              driverId: req.body.driverId,
              acceptDate: new Date(),
              rideStatus: 'accepted',
            },
          }
        );
      res.json({});
    } catch (e) {
      res.status(422).send(e.message);
    } finally {
      await client.close();
    }
  });
}

initRouter();

app.listen(3000);
