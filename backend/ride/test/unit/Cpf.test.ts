import Cpf from '../../src/application/domain/Cpf';

test('deve verificar se os dígitos do CPF estão corretos', () => {
  expect(new Cpf('342.701.900-43')).toBeTruthy();
});

test('deve verificar se o CPF sem pontuação está correto', () => {
  expect(new Cpf('34270190043')).toBeTruthy();
});

test('deve verificar se os dígitos do CPF estão incorretos', () => {
  expect(() => new Cpf('342.701.900-00')).toThrow('Invalid document');
});

test('deve verificar se o CPF sem pontuação está incorreto', () => {
  expect(() => new Cpf('34270190000')).toThrow('Invalid document');
});

test('deve invalidar repetição de dígitos', () => {
  expect(() => new Cpf('99999999999')).toThrow('Invalid document');
  expect(() => new Cpf('999.999.999-99')).toThrow('Invalid document');
});

test('deve invalidar string vazia', () => {
  expect(() => new Cpf('')).toThrow('Invalid document');
});
