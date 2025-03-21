import {
  copyShallowArray,
  insertArrayItems,
  join,
  map,
  reduce,
  sort as sortArr,
} from "./array.mjs";
import { when } from "./conditionals.mjs";
import { TABLE_CELL_IDENTATION_CONFIG } from "./config.mjs";
import { capitilizeFirstChar, split } from "./string.mjs";

function displayTable(table) {
  const tableText = joinRows(table);

  console.log(tableText);
}

function formatCell(cell, index) {
  when(!TABLE_CELL_IDENTATION_CONFIG[index], () => {
    throw `Not config indenation provided for ${index} cell`;
  });

  const { side, spaceCount } = TABLE_CELL_IDENTATION_CONFIG[index];

  return identCell(cell, side, spaceCount);
}

function formatRow(row) {
  return reduce(
    row,
    (formattedRow, cell, index) => {
      formattedRow += formatCell(cell, index);

      return formattedRow;
    },
    ""
  );
}

function formatTable(table) {
  return map(table, formatRow);
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

function identCell(cell, side, spaceCount) {
  return cell[`pad${capitilizeFirstChar(side)}`](spaceCount);
}

function insertCell(table, index, getCellValue) {
  return map(table, (row) => {
    const newCell = getCellValue(row);

    return insertArrayItems(row, index, newCell.toString());
  });
}

function joinRows(arr) {
  return join(arr, "\n");
}

function parseTableBody(tableString) {
  when(!tableString, () => {
    throw "No data provided";
  });

  when(typeof tableString !== "string", () => {
    throw "Data should be string";
  });

  const allRows = getAllRows(tableString);
  const rows = getBodyRows(allRows);

  return map(rows, (row) => {
    return getCells(row);
  });
}

function sort(table, predicate) {
  return sortArr(table, predicate);
}

export { displayTable, formatTable, insertCell, parseTableBody, sort };
