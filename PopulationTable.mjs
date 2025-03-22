import { getItem, getMaxItem, map, reduce } from "./array.mjs";
import { BaseTable } from "./BaseTable.mjs";
import { ifElse, when } from "./conditionals.mjs";
import { padEnd, padStart } from "./string.mjs";

export class PopulationTable extends BaseTable {
  constructor(data) {
    super(data);
  }

  get maxDensity() {
    return getMaxItem(this.rows, this.getDensity.bind(this));
  }

  formatTable() {
    this.rows = map(this.rows, this.#formatRow.bind(this));

    return this;
  }

  getDensity(row) {
    const densityColumnIndex = this.getColumnIndex(isColumnNameDensity);

    when(isDensityColumnAbsent(densityColumnIndex), () => {
      throw "Density column is absent";
    });

    return getItem(row, densityColumnIndex);
  }

  #formatCell(cell, index) {
    when(!TABLE_CELL_IDENTATIONS[index], () => {
      throw `Not config indenation provided for ${index} cell`;
    });

    const spaceCount = TABLE_CELL_IDENTATIONS[index];

    return ifElse(
      isFirstCell(index),
      () => this.#identCellEnd(cell, spaceCount),
      () => this.#identCellStart(cell, spaceCount)
    );
  }

  #formatRow(row) {
    return reduce(
      row,
      (formattedRow, cell, index) => {
        formattedRow += this.#formatCell(cell, index);

        return formattedRow;
      },
      ""
    );
  }

  #identCellEnd(cell, spaceCount) {
    return padEnd(cell, spaceCount);
  }

  #identCellStart(cell, spaceCount) {
    return padStart(cell, spaceCount);
  }
}

function isColumnNameDensity(columnName) {
  return columnName === DENSITY_COLUMN_NAME;
}

function isDensityColumnAbsent(index) {
  return index === -1;
}

function isFirstCell(index) {
  return index === 0;
}

const DENSITY_COLUMN_NAME = "density";
const TABLE_CELL_IDENTATIONS = [18, 10, 8, 8, 18, 6];
