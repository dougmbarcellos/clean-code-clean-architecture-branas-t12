import Ride from '../../src/application/domain/Ride';
import Segment from '../../src/application/domain/Segment';
import UUIDGenerator from '../../src/application/domain/UUIDGenerator';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSaoRoqueCLAMAP = [-19.7392598, -40.6695496];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve fazer o cálculo do preço de uma corrida durante o dia', function () {
  const segment = new Segment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-01T10:00:00'));
  const ride = Ride.create(UUIDGenerator.create().toString(), segment);
  expect(ride.calculate()).toBe(46.98);
});

test('Deve fazer o cálculo do preço de uma corrida durante a noite', function () {
  const segment = new Segment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-01T23:00:00'));
  const ride = Ride.create(UUIDGenerator.create().toString(), segment);
  expect(ride.calculate()).toBe(87.24);
});

test('Deve fazer o cálculo do preço de uma corrida no domingo de dia', function () {
  const segment = new Segment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-07T10:00:00'));
  const ride = Ride.create(UUIDGenerator.create().toString(), segment);
  expect(ride.calculate()).toBe(64.87);
});

test('Deve fazer o cálculo do preço de uma corrida no domingo de noite', function () {
  const segment = new Segment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-07T23:00:00'));
  const ride = Ride.create(UUIDGenerator.create().toString(), segment);
  expect(ride.calculate()).toBe(111.85);
});

test('Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo', function () {
  const segment = new Segment(
    coordsSaoRoque,
    coordsSaoRoqueCLAMAP,
    new Date('2021-03-01T10:00:00')
  );
  const ride = Ride.create(UUIDGenerator.create().toString(), segment);
  expect(ride.calculate()).toBe(10);
});

test('Deve fazer o cálculo do preço de uma corrida com múltiplos segmentos', function () {
  const firstSegment = new Segment(
    coordsSaoRoque,
    coordsSantaTeresa,
    new Date('2021-03-01T10:00:00')
  );
  const ride = Ride.create(UUIDGenerator.create().toString(), firstSegment);
  ride.addSegment(new Segment(coordsSantaTeresa, coordsSaoRoque, new Date('2021-03-01T10:00:00')));
  expect(ride.calculate()).toBe(93.95);
});
