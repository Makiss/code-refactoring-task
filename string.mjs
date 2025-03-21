function capitilizeFirstChar(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function parseInteger(str, radix = 10) {
  return parseInt(str, radix);
}

function split(str, separator, limit) {
  return str.split(separator, limit);
}

export { capitilizeFirstChar, parseInteger, split };
