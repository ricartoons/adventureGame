class Player {
  constructor(name) {
    this.name = name,
      this.where = [],
      this.backpack = []
  }

  //Moving along Scenario
  goNorth() {
    this.where[0].directions.find(elem => {
      if(elem === 'n') {
        return elem;
      } else {
        console.log(`You can not go in this direction.`);
      }
    });



    // const lastIndex = this.where.length - 1;
    // let test = this.where[lastIndex].directions.some((elem) => {
    //   return elem === 'n';
    // });
    // if (test) {
    //   console.log('Going to North');
    // } else {
    //   console.log('You can not go in that direction');
    // }
    // return;
  }

  goEast() {
    const lastIndex = this.where.length - 1;
    let test = this.where[lastIndex].directions.some((elem) => {
      return elem === 'e';
    });
    if (test) {
      console.log('Going to East');
    } else {
      console.log('You can not go in that direction');
    }
    return;
  }

  goSouth() {
    const lastIndex = this.where.length - 1;
    let test = this.where[lastIndex].directions.some((elem) => {
      return elem === 's';
    });
    if (test) {
      console.log('Going to South');
    } else {
      console.log('You can not go in that direction');
    }
    return;
  }

  goOest() {
    const lastIndex = this.where.length - 1;
    let test = this.where[lastIndex].directions.some((elem) => {
      return elem === 'o';
    });
    if (test) {
      console.log('Going to Oest');
    } else {
      console.log('You can not go in that direction');
    }
    return;

  }

  //Actions
  look() {
    if(!scenario.objects || scenario.objects.length === 0){
      console.log('Nothing usefull here!')
      return;
    }
    let objectsInScenario = '';

    scenario.objects.forEach((element, index) => {
      if(index === scenario.objects.length - 1){
        objectsInScenario += 'a ' + element;
      }else if(index != scenario.objects.length - 1 && index === 0){
        objectsInScenario += 'a ' + element;
      } else if(index != scenario.objects.length - 1){
        objectsInScenario += ', a ' + element;
      } else {
        objectsInScenario += ' and a ' + element;
      }
    });

    console.log(`Here is ${objectsInScenario}!`);

  }

  lookBackpack() {
    if(this.backpack.length === 0){
      console.log('There nothing in your backpack!')
      return;
    }
    let objectsInBackpack = '';

    this.backpack.forEach((element, index) => {
      if(index === this.backpack.length - 1){
        objectsInBackpack += element;
      }else if(index != this.backpack.length - 1 && index === 0){
        objectsInBackpack += 'a ' + element;
      } else if(index != this.backpack.length - 1){
        objectsInBackpack += ', a ' + element;
      } else {
        objectsInBackpack += ' and a ' + element;
      }
    });

    console.log(`Inside your backpack has ${objectsInBackpack}!`);

  }

  pick(object) {
    if(!scenario.objects){
      console.log('Nothing usefull here!')
      return;
    }

    const test = scenario.objects.find((elem, index) => {
      if(elem == object){
        return player.backpack.push(scenario.objects.splice(index,1)[0]);
      }
    })

    if(test){
      console.log(`You took a ${object}`)
    } else {
      console.log(`The ${object} doens't exist in scenario`);
    }
  }

  drop(object){
    if(!this.backpack || this.backpack.length === 0){
      console.log('There nothing in your backpack!')
      return;
    }

    const test = this.backpack.find((elem, index) => {
      if(elem == object){
        return scenario.objects.push(player.backpack.splice(index,1)[0]);
      }
    })

    if(test){
      console.log(`You droped a ${object}`)
    } else {
      console.log(`The ${object} doens't exist in backpack`);
    }
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
  localization(scenario) {
    this.where.push(scenario);
    return `it looks like we're in a ${scenario.name}`;
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

class Map {
  constructor() {
    this.scenarios = [
      [0, 'Floresta', ['branch'], ['n']],
      [1, 'Estrada', ['stone'], ['o']],
      [2, 'Cidade', ['knife'], ['o']]
    ];
  }
}
const map = new Map();
let scenario = new Scenario(...map.scenarios[0]);
const player = new Player('Lucas', '');

function startGame() {
  console.log(player.name);
  console.log(player.localization(scenario));
}

startGame();
player.look();
player.pick('branch');
player.look();
player.lookBackpack();
player.drop('branch');
player.lookBackpack();
player.look();
//go to next scenario
player.goNorth();

//player.goNorth();
// player.goNorth();
// console.log(player.pick('stone'));
// console.log(player.use('knife'));