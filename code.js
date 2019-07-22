class Player {
  constructor(name) {
    this.name = name,
      this.where = [],
      this.backpack = []
  }

  //Moving along Scenario
  goNorth() {
    const lastIndex = this.where.length - 1;

    this.where[lastIndex].directions.find(elem => {
      if(elem !== 'n'){
        console.log(`You can not go in this direction.`);
        return;
      } 
      if(elem === 'n') {
        scenario = new Scenario(...map.scenarios[lastIndex + 1])
        //return elem;
      } else {
        console.log(`You can not go in this direction.`);
      }
    });
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
      scenario = new Scenario(...map.scenarios[lastIndex + 1])
    } else {
      console.log('You can not go in that direction');
    }
    return;
  }

  goOest() {
    const lastIndex = this.where.length - 1;
    this.where[lastIndex].directions.find((elem) => {
      if(elem !== 'o'){
        console.log(`You can not go in this direction.`);
        return;
      }
      if(elem === 'o') {
        scenario = new Scenario(...map.scenarios[lastIndex + 1])
        //return elem;
      } else {
        console.log(`You can not go in this direction.`);
      }
    });
  }

  //Actions
  look() {
    if(!scenario.objects || scenario.objects.length === 0){
      console.log('Nothing usefull here!')
      return;
    }
    let objectsInScenario = '';

    scenario.objects.forEach((element, index) => {
      if(index === 0){
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
      if(index === 0) {
        objectsInBackpack += 'a ' + element;
      } else if(index != this.backpack.length - 1 && index === 0) {
        objectsInBackpack += 'a ' + element;
      } else if(index != this.backpack.length - 1) {
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
        //map.updateMap(object);
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

  //Path
  path(scenario) {
    this.where.push(scenario);
    return `It looks like we're in a ${scenario.name}`;
  }

}

class Scenario {
  constructor(id, name, objects, directions) {
    this.id = id,
    this.name = name,
    this.objects = objects,
    this.directions = directions
  }
  // updateMap(idScenario, object){
  //   map.scenarios.find((elem) => {
  //     if(idScenario === elem[0]){
  //       console.log(elem[0])
  //     }
  //   })
  // }
}

class Map {
  constructor() {
    this.scenarios = [
      [0, 'Floresta', ['branch'], ['n']],
      [1, 'Estrada', ['stone','nylon'], ['o','s']],
      [2, 'Cidade', ['knife'], ['o']]
    ];
  }
}

//Initials variables
const map = new Map();
let scenario = {};
let player = {};

function startGame() {
  scenario = new Scenario(...map.scenarios[0]);
  player = new Player('Lucas', '');
  console.log(player.name);
  console.log(player.path(scenario));
}

startGame();
player.look();
player.pick('branch');
player.look();
player.lookBackpack();
//go to next scenario
player.goNorth();
console.log(player.path(scenario));
player.look();
player.lookBackpack();
player.pick('branch');
player.pick('stone');

player.lookBackpack();
player.look();

//back to previus scenario
player.goSouth();
console.log(player.path(scenario));
player.look();
