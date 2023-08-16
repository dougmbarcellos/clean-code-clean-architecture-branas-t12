import Cpf from '../../src/application/domain/person/Cpf';

test.each(['342.701.900-43', '34270190043'])('deve testar CPFs válidos', (value: string) => {
  const cpf = new Cpf(value);
  expect(cpf.value).toBeDefined();
});

test.each(['342.701.900-00', '34270190000', '99999999999', '999.999.999-99', ''])(
  'deve testar CPFs inválidos',
  (value: string) => {
    expect(() => new Cpf(value)).toThrow('Invalid document');
  }
);
