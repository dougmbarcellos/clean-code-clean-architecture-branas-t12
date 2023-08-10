import CalculateRide from '../../src/application/usecases/CalculateRide';

const coordsSaoRoque = [-19.7392195, -40.6681334];
const coordsSantaTeresa = [-19.9320348, -40.6102108];

test('Deve fazer o cálculo do preço de uma corrida durante o dia', async function () {
  const input = {
    segments: [
      { from: coordsSaoRoque, to: coordsSantaTeresa, date: new Date('2021-03-01T10:00:00') },
    ],
  };
  const usecase = new CalculateRide();
  const output = await usecase.execute(input);
  expect(output.price).toBe(46.98);
});
