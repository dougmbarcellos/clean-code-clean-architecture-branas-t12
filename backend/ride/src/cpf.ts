enum DigitType {
  PENULTIMATE = 9, // 111.444.777-X5
  LAST = 10, // 111.444.777-3X
}

const isValidLength = (formattedCPF: string) =>
  formattedCPF && formattedCPF.length >= 11 && formattedCPF.length <= 14;

function hasSequentiallyRepeatedDigits(cpf: string): boolean {
  const firstDigit = cpf.at(0);

  return cpf.split('').every((digit) => digit === firstDigit);
}

const cleanFormat = (cpf: string) => cpf.replace(/\D/g, '');

function getVerificationDigit(rawCPF: string, upToDigit: DigitType): string {
  const reverseDigitList = rawCPF.slice(0, upToDigit).split('').reverse();
  let multiplier = 2;
  let sum = 0;

  for (const digit of reverseDigitList) {
    sum += parseInt(digit) * multiplier;
    multiplier++;
  }

  const rest = sum % 11;
  return String(rest <= 2 ? 0 : 11 - rest);
}

export function validate(formattedCPF: string): boolean {
  if (!isValidLength(formattedCPF)) return false;

  const rawCPF = cleanFormat(formattedCPF);
  if (hasSequentiallyRepeatedDigits(rawCPF)) return false;

  try {
    const penultimateDigit = getVerificationDigit(
      rawCPF,
      DigitType.PENULTIMATE
    );
    if (penultimateDigit !== rawCPF.at(DigitType.PENULTIMATE)) return false;

    const lastDigit = getVerificationDigit(rawCPF, DigitType.LAST);
    if (lastDigit !== rawCPF.at(DigitType.LAST)) return false;
  } catch (e) {
    console.error(`Error ${e}!`);
    return false;
  }

  return true;
}
