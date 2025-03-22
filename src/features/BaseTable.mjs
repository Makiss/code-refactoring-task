import {
  copyShallowArray,
  findIndex,
  insertArrayItems,
  map,
  sort as sortArr,
} from "../utils/array.mjs";
import { when } from "../utils/conditionals.mjs";
import { split } from "../utils/string.mjs";

export class BaseTable {
  #rows;
  #columnNames;
  #columnsCount;

  constructor(data) {
    when(!data, () => {
      throw "No data provided";
    });

    when(typeof data !== "string", () => {
      throw "Data should be string";
    });

    const allRows = getAllRows(data);
    const bodyRows = getBodyRows(allRows);

    this.#rows = map(bodyRows, getCells);
    this.#columnNames = getCells(allRows[0]);
    this.#columnsCount = this.#columnNames.length;
  }

  get columnNames() {
    return this.#columnNames;
  }

  get columnsCount() {
    return this.#columnsCount;
  }

  get rows() {
    return this.#rows;
  }

  set rows(newRows) {
    this.#rows = newRows;
  }

  getColumnIndex(predicate) {
    return findIndex(this.#columnNames, predicate);
  }

  insertColumn(name, index, getCellValue) {
    this.#columnNames = insertArrayItems(this.#columnNames, index, name);
    this.#rows = map(this.#rows, (row) => {
      const newCell = getCellValue(row);

      return insertArrayItems(row, index, newCell.toString());
    });

    return this;
  }

  sort(predicate) {
    this.#rows = sortArr(this.#rows, predicate);

    return this;
  }

  render() {
    const tableText = joinRows(this.#rows);

    console.log(tableText);
  }
}

function getAllRows(str) {
  return split(str, "\n");
}

function getBodyRows(tableLines) {
  return copyShallowArray(tableLines, 1);
}

function getCells(row) {
  return split(row, ",");
}

function joinRows(arr) {
  return arr.join("\n");
}
