import axios from 'axios';

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
    email: 'doug@doug.brr',
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
