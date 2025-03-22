import { withTryCatch } from "./utils/conditionals.mjs";
import { calculateDensityPercentage } from "./features/population/utils.mjs";
import { PopulationTable } from "./features/population/PopulationTable.mjs";

const data = `city,population,area,density,country
  Shanghai,24256800,6340,3826,China
  Delhi,16787941,1484,11313,India
  Lagos,16060303,1171,13712,Nigeria
  Istanbul,14160467,5461,2593,Turkey
  Tokyo,13513734,2191,6168,Japan
  Sao Paulo,12038175,1521,7914,Brazil
  Mexico City,8874724,1486,5974,Mexico
  London,8673713,1572,5431,United Kingdom
  New York City,8537673,784,10892,United States
  Bangkok,8280925,1569,5279,Thailand`;

const main = withTryCatch(() => {
  const populationTable = new PopulationTable(data);
  const densityPercentageColumnNumber = populationTable.columnsCount;

  populationTable
    .insertColumn("densityPercentage", densityPercentageColumnNumber, (row) => {
      return calculateDensityPercentage(
        populationTable.getDensity(row),
        populationTable.maxDensity
      );
    })
    .sort(
      (row1, row2) =>
        row2[densityPercentageColumnNumber] -
        row1[densityPercentageColumnNumber]
    )
    .formatTable()
    .render();
}, console.error);

main();
