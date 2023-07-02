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

const clearFormatting = (cpf: string) => cpf.replace(/\D/g, '');

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

  const cleanCPF = clearFormatting(formattedCPF);
  if (hasSequentiallyRepeatedDigits(cleanCPF)) return false;

  try {
    const penultimateDigit = getVerificationDigit(
      cleanCPF,
      DigitType.PENULTIMATE
    );
    if (penultimateDigit !== cleanCPF.at(DigitType.PENULTIMATE)) return false;

    const lastDigit = getVerificationDigit(cleanCPF, DigitType.LAST);
    if (lastDigit !== cleanCPF.at(DigitType.LAST)) return false;
  } catch (e) {
    console.error(`Error ${e}!`);
    return false;
  }

  return true;
}
