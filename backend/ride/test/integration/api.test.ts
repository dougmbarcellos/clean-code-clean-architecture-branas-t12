import axios from 'axios';
import UUIDGenerator from '../../src/application/domain/identity/UUIDGenerator';
import { increasePosition } from '../utils';

axios.defaults.validateStatus = function () {
  return true;
};

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSaoRoqueCLAMAP = [-19.7392598, -40.6695496];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve fazer o cálculo do preço de uma corrida durante o dia', async function () {
  const input = {
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const response = await axios.post('http://localhost:3000/calculate_ride', input);
  const output = response.data;
  expect(output.price).toBe(46.98);
});

test('Se a distância for inválida deve lançar um erro', async function () {
  const input = {
    positions: [
      { lat: 360, long: 0, date: '2021-03-01T10:00:00' },
      { lat: 0, long: 0, date: '2021-03-01T10:00:00' },
    ],
  };
  const response = await axios.post('http://localhost:3000/calculate_ride', input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe('Invalid distance');
});

test('Deve cadastrar um passageiro', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
  };
  const response1 = await axios.post('http://localhost:3000/passengers', input);
  const output1 = response1.data;
  expect(output1.passengerId).toBeDefined();
  const response2 = await axios.get(`http://localhost:3000/passengers/${output1.passengerId}`);
  const output2 = response2.data;
  expect(output2.passengerId).toBe(output1.passengerId);
});

test('Deve lançar um erro se o passageiro estiver com documento inválido', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-05', // CPF incorreto
  };
  const response = await axios.post('http://localhost:3000/passengers', input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe('Invalid document');
});

test('Deve cadastrar um motorista', async function () {
  const input = {
    name: 'Douglass',
    email: 'doug@doug.com',
    document: '111.444.777-35',
    carPlate: 'XYZ1230',
  };
  const response1 = await axios.post('http://localhost:3000/drivers', input);
  const output1 = response1.data;
  expect(output1.driverId).toBeDefined();

  const response2 = await axios.get(`http://localhost:3000/drivers/${output1.driverId}`);
  const output2 = response2.data;
  expect(output2.driverId).toBe(output1.driverId);
});

test('Deve lançar um erro se o motorista estiver com documento inválido', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-05', // CPF incorreto
    carPlate: 'XYZ1234',
  };
  const response = await axios.post('http://localhost:3000/drivers', input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe('Invalid document');
});

test('Deve fazer uma requisição de corrida', async function () {
  const input = {
    passengerId: '64a32d0fe14712d428c5c66d',
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input);
  const output1 = response1.data;
  expect(output1._id).toBeDefined();

  const response2 = await axios.get(`http://localhost:3000/rides/${output1._id}`);
  const output2 = response2.data;
  expect(output2.requestDate).toBeDefined();
  expect(output2.rideStatus).toBe('requested');
});

test('Motorista deve aceitar uma corrida', async function () {
  const input1 = {
    passengerId: '64a32d0fe14712d428c5c66d',
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const output1 = response1.data;
  expect(output1._id).toBeDefined();

  const input2 = {
    rideId: output1._id,
    driverId: '64a32d2fe14712d428c5c66e',
  };

  await axios.post('http://localhost:3000/accept_ride', input2);

  const response2 = await axios.get(`http://localhost:3000/rides/${output1._id}`);
  const output2 = response2.data;
  expect(output2.rideStatus).toBe('accepted');
  expect(output2.acceptDate).toBeDefined();
});

test('Deve iniciar uma corrida', async function () {
  const input1 = {
    passengerId: '64a32d0fe14712d428c5c66d',
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const output1 = response1.data;
  expect(output1._id).toBeDefined();

  const input2 = {
    rideId: output1._id,
    driverId: '64a32d2fe14712d428c5c66e',
  };

  await axios.post('http://localhost:3000/accept_ride', input2);

  const input3 = { rideId: output1._id };
  const response3 = await axios.post('http://localhost:3000/start_ride', input3);
  const output3 = response3.data;
  expect(output3.rideStatus).toBe('started');
  expect(output3.startDate).toBeDefined();
});

test('Deve realizar a atualização da posição do veículo', async () => {
  const input1 = {
    passengerId: '64a32d0fe14712d428c5c66d',
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:30:00' },
    ],
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const { _id: rideId } = response1.data;

  const input2 = {
    rideId,
    driverId: '64a32d2fe14712d428c5c66e',
  };

  await axios.post('http://localhost:3000/accept_ride', input2);

  const input3 = { rideId };
  await axios.post('http://localhost:3000/start_ride', input3);

  const coord = increasePosition(coordsSaoRoque, +1);
  const input4 = {
    rideId: rideId,
    location: { lat: coord[0], long: coord[1] },
    date: '2021-03-01T10:05:00',
  };
  const response4 = await axios.post('http://localhost:3000/update_ride_location', input4);
  const output4 = response4.data;
  expect(output4.locations.length).toBe(1);
});

test('Deve adicionar um novo percurso a corrida', async function () {
  const input1 = {
    passengerId: '64a32d0fe14712d428c5c66d',
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const { _id: rideId } = response1.data;

  const input2 = {
    rideId,
    driverId: '64a32d2fe14712d428c5c66e',
  };

  await axios.post('http://localhost:3000/accept_ride', input2);

  const input3 = { rideId };
  await axios.post('http://localhost:3000/start_ride', input3);

  const input4 = {
    rideId,
    position: {
      lat: coordsSaoRoqueCLAMAP[0],
      long: coordsSaoRoqueCLAMAP[1],
      date: '2021-03-01T10:00:00',
    },
  };
  const response4 = await axios.post('http://localhost:3000/add_segment_to_ride', input4);
  const output4 = response4.data;
  expect(output4.positions.length).toBe(3);
});

test('Deve encerrar uma corrida', async function () {
  const input1 = {
    passengerId: UUIDGenerator.create().toString(),
    positions: [
      { lat: coordsSaoRoque[0], long: coordsSaoRoque[1], date: '2021-03-01T10:00:00' },
      { lat: coordsSantaTeresa[0], long: coordsSantaTeresa[1], date: '2021-03-01T10:00:00' },
    ],
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const { _id: rideId } = response1.data;

  const input2 = {
    rideId,
    driverId: UUIDGenerator.create().toString(),
  };
  await axios.post('http://localhost:3000/accept_ride', input2);

  const input3 = {
    rideId,
  };
  await axios.post('http://localhost:3000/start_ride', input3);

  const input4 = { rideId };
  const response4 = await axios.post('http://localhost:3000/end_ride', input4);
  const output4 = response4.data;
  expect(output4.rideStatus).toBe('ended');
  expect(output4.endDate).toBeDefined();
  expect(output4.waitingDuration).toBeDefined();
});
