function capitilizeFirstChar(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function padEnd(str, length, padStr) {
  return str.padEnd(length, padStr);
}

function padStart(str, length, padStr) {
  return str.padStart(length, padStr);
}

function parseInteger(str, radix = 10) {
  return parseInt(str, radix);
}

function split(str, separator, limit) {
  return str.split(separator, limit);
}

export { capitilizeFirstChar, padEnd, padStart, parseInteger, split };
