// @ts-nocheck
import express from 'express';
import { Db } from 'mongodb';
import CPFDocument from './CPFDocument';
import Ride from './Ride';
import { connect } from './db';

let db: Db;

connect()
  .then((dbConn) => {
    db = dbConn;
  })
  .catch((error) => {
    console.error('Error connecting to DB.', error);
  });

const app = express();

app.use(express.json());

app.post('/calculate_ride', function (req, res) {
  try {
    const ride = new Ride();
    for (const segment of req.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date));
    }
    const price = ride.calculate();
    res.json({ price });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post('/passengers', async function (req, res) {
  try {
    const passenger = req.body;
    if (!new CPFDocument(passenger.document).validate()) {
      throw new Error('Invalid document');
    }

    const output = await db.collection('passengers').insertOne(passenger);

    return res.json({ passenger_id: output.insertedId });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post('/drivers', async function (req, res) {
  try {
    const driver = req.body;
    if (!new CPFDocument(driver.document).validate()) {
      throw new Error('Invalid document');
    }

    const output = await db.collection('drivers').insertOne(driver);

    return res.json({ driver_id: output.insertedId });
  } catch (e) {
    return res.status(422).send(e.message);
  }
});

app.listen(3000);
