// @ts-nocheck
import express from 'express';
import { Db, ObjectId } from 'mongodb';
import CPFValidator from './CPFValidator';
import Driver from './Driver';
import Passenger from './Passenger';
import Ride from './Ride';
import { connect } from './db';

let db: Db;

connect()
  .then((dbConn) => {
    db = dbConn;
    initRouter();
  })
  .catch((error) => {
    console.error('Error connecting to DB.', error);
  });

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
      if (!new CPFValidator(passenger.document).validate()) {
        throw new Error('Invalid document');
      }
      const data = await db.collection('passengers').insertOne({
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
      });
      return res.json({ passengerId: data.insertedId });
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  app.get('/passengers/:passengerId', async function (req, res) {
    try {
      const data = await db
        .collection('passengers')
        .findOne({ _id: new ObjectId(req.params.passengerId) }, { name: 1, email: 1, document: 1 });
      return res.json({
        passengerId: data._id,
        name: data.name,
        email: data.email,
        document: data.document,
      });
    } catch (e) {
      return res.status(422).send(e.message);
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
      if (!new CPFValidator(driver.document).validate()) {
        throw new Error('Invalid document');
      }
      const data = await db.collection('drivers').insertOne({
        name: req.body.name,
        email: req.body.email,
        document: req.body.document,
        carPlate: req.body.carPlate,
      });
      return res.json({ driverId: data.insertedId });
    } catch (e) {
      return res.status(422).send(e.message);
    }
  });

  app.get('/drivers/:driverId', async function (req, res) {
    try {
      const data = await db
        .collection('drivers')
        .findOne(
          { _id: new ObjectId(req.params.driverId) },
          { name: 1, email: 1, document: 1, carPlate: 1 }
        );
      return res.json({
        driverId: data._id,
        name: data.name,
        email: data.email,
        document: data.document,
        carPlate: data.carPlate,
      });
    } catch (e) {
      return res.status(422).send(e.message);
    }
  });

  app.post('/request_ride', async function (req, res) {
    try {
      const data = await db.collection('rides').insertOne({
        passengerId: req.body.passengerId,
        driverId: null,
        from: req.body.from,
        to: req.body.to,
        requestDate: new Date(),
        rideStatus: 'waiting_driver',
      });
      return res.json({ rideId: data.insertedId });
    } catch (e) {
      return res.status(422).send(e.message);
    }
  });

  app.get('/rides/:rideId', async function (req, res) {
    try {
      const data = await db
        .collection('rides')
        .findOne(
          { _id: new ObjectId(req.params.rideId) },
          { rideId: 1, requestDate: 1, rideStatus: 1, passengerId: 1, driverId: 1, acceptDate: 1 }
        );
      return res.json({
        rideId: data._id,
        requestDate: data.requestDate,
        rideStatus: data.rideStatus,
        passengerId: data.passengerId,
        driverId: data.driverId,
        acceptDate: data.acceptDate,
      });
    } catch (e) {
      return res.status(422).send(e.message);
    }
  });

  app.post('/accept_ride', async function (req, res) {
    try {
      await db.collection('rides').updateOne(
        { _id: new ObjectId(req.body.rideId) },
        {
          $set: {
            driverId: req.body.driverId,
            acceptDate: new Date(),
            rideStatus: 'accepted',
          },
        }
      );
      return res.json({});
    } catch (e) {
      return res.status(422).send(e.message);
    }
  });
}

app.listen(3000);
