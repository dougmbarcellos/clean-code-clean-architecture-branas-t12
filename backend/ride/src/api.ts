// @ts-nocheck
import express from 'express';
import CPFDocument from './CPFDocument';
import Ride from './Ride';
const app = express();

function generateUUID(passenger) {
  return Date.now().toString();
}

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

app.post('/passengers', function (req, res) {
  try {
    const passenger = req.body;
    if (!new CPFDocument(passenger.document).validate()) {
      throw new Error('Invalid document');
    }

    res.json({ passenger_id: generateUUID() });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.post('/drivers', function (req, res) {
  try {
    const driver = req.body;
    if (!new CPFDocument(driver.document).validate()) {
      throw new Error('Invalid document');
    }

    res.json({ driver_id: generateUUID() });
  } catch (e) {
    res.status(422).send(e.message);
  }
});

app.listen(3000);
