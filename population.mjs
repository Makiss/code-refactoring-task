import { getItem, getMaxItem } from "./array.mjs";
import { formatTable, insertCell, parseTableBody, sort } from "./table.mjs";
import { round } from "./number.mjs";
import {
  DENSITY_CELL_INDEX,
  DENSITY_PERCENTAGE_CELL_INDEX,
} from "./config.mjs";

function addDensityPercentageCell(table) {
  const maxDensity = calculateMaxDensity(table);

  return insertCell(table, DENSITY_PERCENTAGE_CELL_INDEX, (row) => {
    return calculateDensityPercentage(getDensity(row), maxDensity);
  });
}

function calculateDensityPercentage(density, maxDensity) {
  return round(calculatePercentage(density, maxDensity));
}

function calculateMaxDensity(data) {
  return getMaxItem(data, getDensity);
}

function calculatePercentage(dividend, divisor) {
  return (dividend * 100) / divisor;
}

function formatPopulationData(data) {
  const tableBody = parseTableBody(data);

  const tableWithNewColumn = addDensityPercentageCell(tableBody);
  const sortedTable = sortTableByDencityPercentage(tableWithNewColumn);

  return formatTable(sortedTable);
}

function getDensity(tableRow) {
  return getItem(tableRow, DENSITY_CELL_INDEX);
}

function sortTableByDencityPercentage(table) {
  return sort(
    table,
    (row1, row2) =>
      row2[DENSITY_PERCENTAGE_CELL_INDEX] - row1[DENSITY_PERCENTAGE_CELL_INDEX]
  );
}

export { formatPopulationData };
