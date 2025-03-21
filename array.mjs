import { parseInteger } from "./string.mjs";

function copyShallowArray(arr, startIndex) {
  return arr.slice(startIndex);
}

function getItem(arr, index) {
  return arr[index];
}

function getMaxItem(arr, getCompareItem) {
  return arr.reduce((max, item) => {
    const itemToCompare = parseInteger(getCompareItem(item));

    return itemToCompare > max ? itemToCompare : max;
  }, -Infinity);
}

function insertArrayItems(arr, index, ...items) {
  return arr.toSpliced(index, 0, ...items);
}

function join(arr, symbol) {
  return arr.join(symbol);
}

function map(arr, callback) {
  return arr.map(callback);
}

function reduce(arr, callback, initialValue) {
  return arr.reduce(callback, initialValue);
}

function sort(arr, compareFn) {
  return arr.toSorted(compareFn);
}

export {
  copyShallowArray,
  getItem,
  getMaxItem,
  insertArrayItems,
  join,
  map,
  reduce,
  sort,
};
