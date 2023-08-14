// @ts-nocheck
import express from 'express';
import { ObjectId } from 'mongodb';
import Segment from './application/domain/Segment';
import CalculateRide from './application/usecases/CalculateRide';
import CreateDriver from './application/usecases/CreateDriver';
import CreatePassenger from './application/usecases/CreatePassenger';
import GetDriver from './application/usecases/GetDriver';
import GetPassenger from './application/usecases/GetPassenger';
import RequestRide from './application/usecases/RequestRide';
import { client } from './db';
import DriverRepositoryDatabase from './infra/repository/DriverRepositoryDatabase';
import PassengerRepositoryDatabase from './infra/repository/PassengerRepositoryDatabase';
import RideRepositoryDatabase from './infra/repository/RideRepositoryDatabase';

const app = express();

app.use(express.json());

function initRouter() {
  app.post('/calculate_ride', async function (req, res) {
    try {
      const usecase = new CalculateRide();
      const input = {
        segments: req.body.segments.map(
          (segment) => new Segment(segment.from, segment.to, new Date(segment.date))
        ),
      };
      const output = await usecase.execute(input);
      res.json(output);
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  app.post('/passengers', async function (req, res) {
    try {
      const usecase = new CreatePassenger(new PassengerRepositoryDatabase());
      const output = await usecase.execute(req.body);
      res.json(output);
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  app.get('/passengers/:passengerId', async function (req, res) {
    try {
      const usecase = new GetPassenger(new PassengerRepositoryDatabase());
      const output = await usecase.execute({ passengerId: req.params.passengerId });
      res.json(output);
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  app.post('/drivers', async function (req, res) {
    try {
      const usecase = new CreateDriver(new DriverRepositoryDatabase());
      const output = await usecase.execute(req.body);
      res.json(output);
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  app.get('/drivers/:driverId', async function (req, res) {
    try {
      const usecase = new GetDriver(new DriverRepositoryDatabase());
      const output = await usecase.execute({ driverId: req.params.driverId });
      res.json(output);
    } catch (e) {
      res.status(422).send(e.message);
    }
  });

  app.post('/request_ride', async function (req, res) {
    try {
      const usecase = new RequestRide(new RideRepositoryDatabase());
      const output = await usecase.execute({
        passengerId: req.body.passengerId,
        from: req.body.from,
        to: req.body.to,
        segmentDate: req.body.segmentDate,
      });
      res.json(output);
    } catch (e) {
      res.status(422).send(e.message);
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
