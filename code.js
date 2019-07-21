class Player {
  constructor(name) {
    this.name = name,
    this.where = [],
    this.backpack = []
  }
  
  //Moving along Scenario
  goNorth() {
    const lastIndex= this.where.length - 1;
    let test = this.where[lastIndex].directions.some((elem) => {
      return elem === 'n';
    });
    if(test) {
      console.log('Going to North');
    } else {
      console.log('You can not go in that direction');
    }
    return;
  }

  goEast() {
    const lastIndex= this.where.length - 1;
    let test = this.where[lastIndex].directions.some((elem) => {
      return elem === 'e';
    });
    if(test) {
      console.log('Going to East');
    } else {
      console.log('You can not go in that direction');
    }
    return;
  }

  goSouth() {
    const lastIndex= this.where.length - 1;
    let test = this.where[lastIndex].directions.some((elem) => {
      return elem === 's';
    });
    if(test) {
      console.log('Going to South');
    } else {
      console.log('You can not go in that direction');
    }
    return;
  }

  goOest() {
    const lastIndex= this.where.length - 1;
    let test = this.where[lastIndex].directions.some((elem) => {
      return elem === 'o';
    });
    if(test) {
      console.log('Going to Oest');
    } else {
      console.log('You can not go in that direction');
    }
    return;

  }

  //Actions
  look() {
    console.log('You look the scenario');
  }

  pick(object) {
    this.backpack.push(object);
    console.log(`You pick a ${object.toUpperCase()} in scenario and put in yout backpack`);
  }

  use(object) {
    console.log('You use a object');
    return this.backpack.find((elem) => {
      if(elem == object){
        console.log(`You use ${elem}`);
        return elem
      } else {
        console.log(`You don't have ${object.toUpperCase()} in your backpack`);
      }
    });
  }

  enter() {
    console.log('You enter in some place');
  }

  leave() {
    console.log('You leave the place');
  }

  run() {
    console.log('You runout...')
  }

  //Localization
  localization(scenario){
    this.where.push(scenario);
  }
  
}

class Scenario {
  constructor(id, name, objects, directions) {
    this.id = id,
    this.name = name,
    this.objects = objects,
    this.directions = directions
  }
}

let scenario = new Scenario(0, 'Floresta', ['galho', 'pedra', 'jaca'], ['n', 'o']);
const player = new Player('Julia', '');

function startGame() {
  console.log(player.name);
  console.log(player.localization(scenario));
  console.log(player.where);
}

startGame();
player.goNorth();
// player.goNorth();
// console.log(player.pick('stone'));
// console.log(player.use('knife'));