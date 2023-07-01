import { validate } from '../src/cpf';

test('deve verificar se os dígitos do CPF estão corretos', () => {
  expect(validate('342.701.900-43')).toBe(true);
});

test('deve verificar se os dígitos do CPF estão incorretos', () => {
  expect(validate('342.701.900-00')).toBe(false);
});

test('deve verificar se o CPF sem pontuação está correto', () => {
  expect(validate('34270190043')).toBe(true);
});

test('deve verificar se o CPF sem pontuação está incorreto', () => {
  expect(validate('34270190000')).toBe(false);
});

test('deve invalidar repetição de dígitos', () => {
  expect(validate('99999999999')).toBe(false);
  expect(validate('999.999.999-99')).toBe(false);
});

test('deve invalidar string vazia', () => {
  expect(validate('')).toBe(false);
});
