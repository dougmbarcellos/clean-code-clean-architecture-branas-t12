enum VerificationDigit {
  PENULTIMATE = 9, // 111.444.777-X5
  LAST = 10, // 111.444.777-3X
}

export default class CPFValidator {
  private cleanDocument: string;

  constructor(private readonly document: string) {
    if (!this.isValidLength()) throw new Error('Invalid document');
    this.cleanDocument = this.clearFormatting();
    if (this.hasSequentiallyRepeatedDigits()) throw new Error('Invalid document');
  }

  validate(): boolean {
    if (
      !this.isValidVerificationDigit(VerificationDigit.PENULTIMATE) ||
      !this.isValidVerificationDigit(VerificationDigit.LAST)
    )
      throw new Error('Invalid document');

    return true;
  }

  private isValidLength() {
    return this.document && this.document.length >= 11 && this.document.length <= 14;
  }

  private hasSequentiallyRepeatedDigits(): boolean {
    const firstDigit = this.cleanDocument.at(0);

    return this.cleanDocument.split('').every((digit) => digit === firstDigit);
  }

  private clearFormatting() {
    return this.document.replace(/\D/g, '');
  }

  private isValidVerificationDigit(verificationDigit: VerificationDigit): boolean {
    const reverseDigitList = this.cleanDocument.slice(0, verificationDigit).split('').reverse();
    let multiplier = 2;
    let sum = 0;
    for (const digit of reverseDigitList) {
      sum += parseInt(digit) * multiplier;
      multiplier++;
    }
    const rest = sum % 11;
    const resultDigit = rest <= 2 ? 0 : 11 - rest;
    return this.cleanDocument.at(verificationDigit) === resultDigit.toString();
  }
}
