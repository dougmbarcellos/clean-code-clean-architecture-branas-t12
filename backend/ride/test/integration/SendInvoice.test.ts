import { ChangeStream, Document } from 'mongodb';
import UUIDGenerator from '../../src/application/domain/identity/UUIDGenerator';
import Passenger from '../../src/application/domain/passenger/Passenger';
import Ride from '../../src/application/domain/ride/Ride';
import PassengerRepository from '../../src/application/repository/PassengerRepository';
import RideRepository from '../../src/application/repository/RideRepository';
import SendInvoice from '../../src/application/usecases/SendInvoice';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

class RideRepositoryDatabaseFake implements RideRepository {
  insert(ride: Ride): Promise<any> {
    throw new Error('Method not implemented.');
  }
  async get(rideId: string): Promise<Ride> {
    const ride = Ride.create(rideId);
    ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T08:00:00'));
    ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T08:00:00'));
    ride.accept('123', new Date('2021-03-01T08:05:00'));
    ride.start(new Date('2021-03-01T08:15:00'));
    ride.end(new Date('2021-03-01T08:25:00'));
    ride.processPayment(new Date('2021-03-01T08:28:00'));
    return ride;
  }
  update(ride: Ride): Promise<any> {
    return new Promise((resolve) => resolve(ride));
  }
  watch(pipeline?: Document[] | undefined): Promise<ChangeStream> {
    throw new Error('Method not implemented.');
  }
}

class PassengerRepositoryDatabaseFake implements PassengerRepository {
  save(passenger: Passenger): Promise<{ passengerId: string }> {
    throw new Error('Method not implemented.');
  }
  async get(passengerId: string): Promise<Passenger> {
    const passenger = Passenger.create(passengerId, 'doug@doug.com', '111.444.777-35');
    return passenger;
  }
}

test('deve realizar o envio da nota fiscal para o email do usuário', async () => {
  const usecase = new SendInvoice(
    new RideRepositoryDatabaseFake(),
    new PassengerRepositoryDatabaseFake()
  );
  const input = {
    rideId: UUIDGenerator.create().toString(),
    date: new Date('2021-03-01T10:00:00'),
  };
  const output = await usecase.execute(input);
  expect(output.sendInvoiceDate).toBe(input.date);
  expect(output.rideStatus.value).toBe('invoiceSent');
});
