import Ride from '../../src/application/domain/Ride';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSaoRoqueCLAMAP = [-19.7392598, -40.6695496];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve fazer o cálculo do preço de uma corrida durante o dia', function () {
  const ride = new Ride();
  ride.addSegment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-01T10:00:00'));
  expect(ride.calculate()).toBe(46.98);
});

test('Deve fazer o cálculo do preço de uma corrida durante a noite', function () {
  const ride = new Ride();
  ride.addSegment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-01T23:00:00'));
  expect(ride.calculate()).toBe(87.24);
});

test('Deve fazer o cálculo do preço de uma corrida no domingo de dia', function () {
  const ride = new Ride();
  ride.addSegment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-07T10:00:00'));
  expect(ride.calculate()).toBe(64.87);
});

test('Deve fazer o cálculo do preço de uma corrida no domingo de noite', function () {
  const ride = new Ride();
  ride.addSegment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-07T23:00:00'));
  expect(ride.calculate()).toBe(111.85);
});

test('Deve retornar -1 se a distância for inválida', function () {
  const ride = new Ride();
  expect(() => ride.addSegment([], [], new Date('2023-03-01T10:00:00'))).toThrow(
    new Error('Invalid distance')
  );
});

test('Deve retornar -2 se a data for inválida', function () {
  const ride = new Ride();
  expect(() => ride.addSegment(coordsSaoRoque, coordsSantaTeresa, new Date('javascript'))).toThrow(
    new Error('Invalid date')
  );
});

test('Deve fazer o cálculo do preço de uma corrida durante o dia com preço mínimo', function () {
  const ride = new Ride();
  ride.addSegment(coordsSaoRoque, coordsSaoRoqueCLAMAP, new Date('2021-03-01T10:00:00'));
  expect(ride.calculate()).toBe(10);
});

test('Deve fazer o cálculo do preço de uma corrida com múltiplos segmentos', function () {
  const ride = new Ride();
  ride.addSegment(coordsSaoRoque, coordsSantaTeresa, new Date('2021-03-01T10:00:00'));
  ride.addSegment(coordsSantaTeresa, coordsSaoRoque, new Date('2021-03-01T10:00:00'));
  expect(ride.calculate()).toBe(93.95);
});
