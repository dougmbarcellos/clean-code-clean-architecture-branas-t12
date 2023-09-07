export function increasePosition(coords: number[], sumMinDigit: number) {
  const increase = parseFloat(`0.000000${sumMinDigit}`);
  const [lat, long] = coords;
  return [lat + increase, long + increase];
}
