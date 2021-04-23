import { promises as fs } from "fs";
const { writeFile, readFile } = fs;

import methods from "./methods.js";

async function init() {
  try {
    await createJsonFileUF();
    console.log(
      "=============================================================="
    );
    console.log("Descending order");
    console.log(
      "=============================================================="
    );
    await methods.statesByDescendingOrder();
    console.log(
      "=============================================================="
    );
    console.log("Ascending order");
    console.log(
      "=============================================================="
    );
    await methods.statesByAscendingOrder();
    console.log(
      "=============================================================="
    );
    console.log("Descending order name");
    console.log(
      "=============================================================="
    );
    await methods.nameLengthDescendingOrder();
    console.log(
      "=============================================================="
    );
    console.log("Ascending order name");
    console.log(
      "=============================================================="
    );
    await methods.nameLengthAscendingOrder();
  } catch (err) {
    console.log(err);
  }
}

async function createJsonFileUF() {
  try {
    const cities = JSON.parse(await readFile("Cidades.json"));
    const states = JSON.parse(await readFile("Estados.json"));

    states.forEach((state) => {
      const obj = {
        id: state.ID,
        name: state.Nome,
        stateAbreviation: state.Sigla,
        cities: citiesAdded(state),
      };
      writeFile(`./states/${state.Sigla}.json`, JSON.stringify(obj, null, 2));
    });

    function citiesAdded(state) {
      let arrayCities = [];
      let count = 0;
      cities.forEach((city) => {
        if (city.Estado === state.ID) {
          const obj = {
            id: count++,
            name: city.Nome,
          };
          arrayCities.push(obj);
        }
      });
      return arrayCities;
    }
  } catch (err) {
    console.log(err);
  }
}

init();
