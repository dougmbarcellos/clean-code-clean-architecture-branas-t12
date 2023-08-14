import axios from 'axios';
import UUIDGenerator from '../../src/application/domain/UUIDGenerator';

axios.defaults.validateStatus = function () {
  return true;
};

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSaoRoqueCLAMAP = [-19.7392598, -40.6695496];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve fazer o cálculo do preço de uma corrida durante o dia', async function () {
  const input = {
    segments: [{ from: coordsSaoRoque, to: coordsSantaTeresa, date: '2021-03-01T10:00:00' }],
  };
  const response = await axios.post('http://localhost:3000/calculate_ride', input);
  const output = response.data;
  expect(output.price).toBe(46.98);
});

test('Se a distância for inválida deve lançar um erro', async function () {
  const input = {
    segments: [{ from: [360, 0], to: [0, 0], date: '2021-03-01T10:00:00' }],
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
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input);
  const output1 = response1.data;
  expect(output1.rideId).toBeDefined();

  const response2 = await axios.get(`http://localhost:3000/rides/${output1.rideId}`);
  const output2 = response2.data;
  expect(output2.requestDate).toBeDefined();
  expect(output2.rideStatus).toBe('waiting_driver');
});

test('Motorista deve aceitar uma corrida', async function () {
  const input1 = {
    passengerId: '64a32d0fe14712d428c5c66d',
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const output1 = response1.data;
  expect(output1.rideId).toBeDefined();

  const input2 = {
    rideId: output1.rideId,
    driverId: '64a32d2fe14712d428c5c66e',
  };

  await axios.post('http://localhost:3000/accept_ride', input2);

  const response2 = await axios.get(`http://localhost:3000/rides/${output1.rideId}`);
  const output2 = response2.data;
  expect(output2.rideStatus).toBe('accepted');
  expect(output2.acceptDate).toBeDefined();
});

test('Deve iniciar uma corrida', async function () {
  const input1 = {
    passengerId: '64a32d0fe14712d428c5c66d',
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const output1 = response1.data;
  expect(output1.rideId).toBeDefined();

  const input2 = {
    rideId: output1.rideId,
    driverId: '64a32d2fe14712d428c5c66e',
  };

  await axios.post('http://localhost:3000/accept_ride', input2);

  const input3 = { rideId: output1.rideId };
  const response3 = await axios.post('http://localhost:3000/start_ride', input3);
  const output3 = response3.data;
  expect(output3.rideStatus).toBe('started');
  expect(output3.startDate).toBeDefined();
});

test('Deve adicionar um novo percuso a corrida', async function () {
  const input1 = {
    passengerId: '64a32d0fe14712d428c5c66d',
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const { rideId } = response1.data;

  const input2 = {
    rideId,
    driverId: '64a32d2fe14712d428c5c66e',
  };

  await axios.post('http://localhost:3000/accept_ride', input2);

  const input3 = { rideId };
  await axios.post('http://localhost:3000/start_ride', input3);

  const input4 = { rideId, to: coordsSaoRoqueCLAMAP };
  const response4 = await axios.post('http://localhost:3000/add_segment_to_ride', input4);
  const output4 = response4.data;
  expect(output4.segments.length).toBe(2);
});

test.only('Deve encerrar uma corrida', async function () {
  const input1 = {
    passengerId: UUIDGenerator.create().toString(),
    from: coordsSaoRoque,
    to: coordsSantaTeresa,
    segmentDate: '2021-03-01T10:00:00',
  };
  const response1 = await axios.post('http://localhost:3000/request_ride', input1);
  const { rideId } = response1.data;

  const input2 = {
    rideId,
    driverId: UUIDGenerator.create().toString(),
  };
  await axios.post('http://localhost:3000/accept_ride', input2);

  const input3 = { rideId };
  const response3 = await axios.post('http://localhost:3000/end_ride', input3);
  const output3 = response3.data;
  expect(output3.rideStatus).toBe('ended');
  expect(output3.endDate).toBeDefined();
  expect(output3.waitingDuration).toBeDefined();
});
