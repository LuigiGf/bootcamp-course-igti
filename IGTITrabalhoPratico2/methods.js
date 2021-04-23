import { promises as fs } from "fs";

async function statesByDescendingOrder() {
  try {
    const states = await fs.readdir("./states");
    const array = [];
    for (let i in states) {
      const state = await readJsonFile(states[i]);
      const obj = {
        stateName: state.stateAbreviation,
        stateLength: state.cities.length,
      };
      array.push(obj);
    }
    array.sort((a, b) => b.stateLength - a.stateLength);
    for (let i = 0; i < 5; i++) {
      console.log(array[i].stateName + " - " + array[i].stateLength);
    }
  } catch (err) {
    console.log(err);
  }
}

async function statesByAscendingOrder() {
  try {
    const states = await fs.readdir("./states");
    const array = [];
    for (let i in states) {
      const state = await readJsonFile(states[i]);
      const obj = {
        stateName: state.stateAbreviation,
        stateLength: state.cities.length,
      };
      array.push(obj);
    }
    array.sort((a, b) => a.stateLength - b.stateLength);
    for (let i = 0; i < 5; i++) {
      console.log(array[i].stateName + " - " + array[i].stateLength);
    }
  } catch (err) {
    console.log(err);
  }
}

async function nameLengthAscendingOrder() {
  try {
    const states = await fs.readdir("./states");
    const array = [];
    for (let i in states) {
      const state = await readJsonFile(states[i]);
      const arr = [];
      for (let x in state.cities) {
        const obj = {
          name: state.cities[x].name,
          nameLength: state.cities[x].name.length,
        };
        arr.push(obj);
      }
      arr.sort((a, b) => a.nameLength - b.nameLength);
      const obj = {
        stateName: state.stateAbreviation,
        cityLongerName: arr[0].name,
        cityLength: arr[0].nameLength,
      };
      array.push(obj);
    }
    array.sort((a, b) => a.cityLength - b.cityLength);
    for (let i = 0; i < 5; i++) {
      console.log(array[i].stateName + " - " + array[i].cityLongerName);
    }
  } catch (err) {
    console.log(err);
  }
}

async function nameLengthDescendingOrder() {
  try {
    const states = await fs.readdir("./states");
    const array = [];
    for (let i in states) {
      const state = await readJsonFile(states[i]);
      const arr = [];
      for (let x in state.cities) {
        const obj = {
          name: state.cities[x].name,
          nameLength: state.cities[x].name.length,
        };
        arr.push(obj);
      }
      arr.sort((a, b) => b.nameLength - a.nameLength);
      const obj = {
        stateName: state.stateAbreviation,
        cityLongerName: arr[0].name,
        cityLength: arr[0].nameLength,
      };
      array.push(obj);
    }
    array.sort((a, b) => b.cityLength - a.cityLength);
    for (let i = 0; i < 5; i++) {
      console.log(array[i].stateName + " - " + array[i].cityLongerName);
    }
  } catch (err) {
    console.log(err);
  }
}

async function readJsonFile(state) {
  try {
    return JSON.parse(await fs.readFile(`./states/${state}`));
  } catch (err) {
    console.log(err + "\nerror function readJsonFile");
  }
}

export default {
  readJsonFile,
  nameLengthDescendingOrder,
  nameLengthAscendingOrder,
  statesByAscendingOrder,
  statesByDescendingOrder,
};
