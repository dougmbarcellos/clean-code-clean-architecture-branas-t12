import UUIDGenerator from '../../src/application/domain/identity/UUIDGenerator';
import Ride from '../../src/application/domain/ride/Ride';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSaoRoqueCLAMAP = [-19.7392598, -40.6695496];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve fazer o cálculo do preço de uma corrida durante o dia', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T10:00:00'));
  expect(ride.calculate()).toBe(46.98);
});

test('Deve fazer o cálculo do preço de uma corrida durante a noite', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T23:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T23:00:00'));
  expect(ride.calculate()).toBe(87.24);
});

test('Deve fazer o cálculo do preço de uma corrida no domingo de dia', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-07T10:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-07T10:00:00'));
  expect(ride.calculate()).toBe(64.87);
});

test('Deve fazer o cálculo do preço de uma corrida no domingo de noite', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-07T23:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-07T23:00:00'));
  expect(ride.calculate()).toBe(111.85);
});

test('Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(
    coordsSaoRoqueCLAMAP[0],
    coordsSaoRoqueCLAMAP[1],
    new Date('2021-03-01T10:00:00')
  );
  expect(ride.calculate()).toBe(10);
});

test('Deve fazer o cálculo do preço de uma corrida com múltiplos segmentos', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(
    coordsSaoRoqueCLAMAP[0],
    coordsSaoRoqueCLAMAP[1],
    new Date('2021-03-01T10:00:00')
  );
  expect(ride.calculate()).toBe(94.04);
});

test('Deve aceitar uma corrida', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T10:00:00'));
  ride.accept(UUIDGenerator.create().toString(), new Date('2021-03-01T10:00:00'));
  expect(ride.rideStatus.value).toBe('accepted');
  expect(ride.driverId).toBeDefined();
  expect(ride.acceptDate).toBeInstanceOf(Date);
});

test('Deve iniciar uma corrida', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T10:00:00'));
  ride.accept(UUIDGenerator.create().toString(), new Date('2021-03-01T10:00:00'));
  ride.start(new Date('2021-03-01T10:00:00'));
  expect(ride.rideStatus.value).toBe('started');
  expect(ride.startDate).toBeInstanceOf(Date);
});

test('Deve encerrar uma corrida', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T10:00:00'));
  ride.accept(UUIDGenerator.create().toString(), new Date('2021-03-01T10:00:00'));
  ride.start(new Date('2021-03-01T10:00:00'));
  ride.end(new Date('2021-03-01T10:00:00'));
  expect(ride.rideStatus.value).toBe('ended');
  expect(ride.endDate).toBeInstanceOf(Date);
});

test('Não deve iniciar corrida se ela não estiver sido aceita', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T10:00:00'));
  expect(() => ride.start(new Date('2021-03-01T10:00:00'))).toThrow(new Error('Invalid status'));
});

test('Não deve encerrar corrida se ela não estiver sido iniciada', function () {
  const ride = Ride.create(UUIDGenerator.create().toString());
  ride.addPosition(coordsSaoRoque[0], coordsSaoRoque[1], new Date('2021-03-01T10:00:00'));
  ride.addPosition(coordsSantaTeresa[0], coordsSantaTeresa[1], new Date('2021-03-01T10:00:00'));
  ride.accept(UUIDGenerator.create().toString(), new Date('2021-03-01T10:00:00'));
  expect(() => ride.end(new Date('2021-03-01T10:00:00'))).toThrow(new Error('Invalid status'));
});
