export function byteToGByte(bytesValue: number) {
  return (bytesValue / (1000 * 1000 * 1000)).toFixed(2);
}

export function byteToMByte(bytesValue: number) {
  return (bytesValue / (1000 * 1000)).toFixed(2);
}
