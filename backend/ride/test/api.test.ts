import axios from 'axios';

axios.defaults.validateStatus = function () {
  return true;
};

test('Deve fazer o cálculo do preço de uma corrida durante o dia', async function () {
  const input = {
    segments: [{ distance: 10, date: '2021-03-01T10:00:00' }],
  };
  const response = await axios.post('http://localhost:3000/calculate_ride', input);
  const output = response.data;
  expect(output.price).toBe(21);
});

test('Se a distância for inválida deve lançar um erro', async function () {
  const input = {
    segments: [{ distance: -10, date: '2021-03-01T10:00:00' }],
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
  const response = await axios.post('http://localhost:3000/passengers', input);
  const output = response.data;
  expect(output.passenger_id).toBeTruthy();
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
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-35',
    car_plate: 'XYZ1234',
  };
  const response = await axios.post('http://localhost:3000/drivers', input);
  const output = response.data;
  expect(output.driver_id).toBeTruthy();
});

test('Deve lançar um erro se o motorista estiver com documento inválido', async function () {
  const input = {
    name: 'Douglas',
    email: 'doug@doug.br',
    document: '111.444.777-05', // CPF incorreto
    car_plate: 'XYZ1234',
  };
  const response = await axios.post('http://localhost:3000/drivers', input);
  expect(response.status).toBe(422);
  const output = response.data;
  expect(output).toBe('Invalid document');
});
