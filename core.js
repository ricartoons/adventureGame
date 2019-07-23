class Player {
  constructor(name) {
    this.name = name,
      this.where = [],
      this.backpack = []
  }

  //Actions
  search() {
    if(!actualLocalization.objects || actualLocalization.objects.length === 0){
      console.log('Nothing usefull here!');
      return;
    }
    let objectsInScenario = '';

    actualLocalization.objects.forEach((element, index) => {
      if(index === 0){
        objectsInScenario += 'a ' + element;
      }else if(index != actualLocalization.objects.length - 1 && index === 0){
        objectsInScenario += 'a ' + element;
      } else if(index != actualLocalization.objects.length - 1){
        objectsInScenario += ', a ' + element;
      } else {
        objectsInScenario += ' and a ' + element;
      }
    });

    console.log(`Here is ${objectsInScenario}!`);

  }

  look(){
    console.log(actualLocalization.description);
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
    if(!actualLocalization.objects){
      console.log('Nothing usefull here!')
      return;
    }

    const test = actualLocalization.objects.find((elem, index) => {
      if(elem == object){
        //map.updateMap(object);
        return player.backpack.push(actualLocalization.objects.splice(index,1)[0]);
      }
    })

    if(test){
      console.log(`You took a ${object}`)
    } else {
      console.log(`The ${object} doens't exist in scenario`);
    }
  }

  drop(object) {
    if(!this.backpack || this.backpack.length === 0){
      console.log('There nothing in your backpack!')
      return;
    }

    const test = this.backpack.find((elem, index) => {
      if(elem == object){
        return actualLocalization.objects.push(player.backpack.splice(index,1)[0]);
      }
    })

    if(test){
      console.log(`You droped a ${object}`)
    } else {
      console.log(`The ${object} doens't exist in backpack`);
    }
  }
  //Special Actions
  action(action) {
    if(!actualLocalization.puzzle) {
      console.log('Action denied');
    }
    if(actualLocalization.puzzle.solution === action && actualLocalization.puzzle.status === false) {
      actualLocalization.puzzle.status = true;
      switch (action) {
        case 'push statue':
          console.log(`The statue slowly gives in to the movement and at the end it falls, stamping on the floor and revealing a key!`);
          actualLocalization.objects.push('key');
          break;

        case 'use key':
          console.log(`Although old, the mechanism works perfectly and the chest opens revealing an old amulet!`);
          actualLocalization.objects.push('amulet');
          break;

        default:
          break;
      }
    } else if(actualLocalization.puzzle.solution === action && actualLocalization.puzzle.status === true ) {
      console.log(`Did you already get the hidden item`);
    } else {
      console.log(`Nothing happens`);
    }
  }

  //Moving and 
  goto(path) {
    actualLocalization.directions.find((item) => {
      if (item.name !== path) {
        return;
      }
  
      actualLocalization = map[item.idNextScenario];
    });
  }
  
}


const map = [
  { id: 0, name: 'Woods', directions: [{name: 'left', idNextScenario: 1}, {name: 'right', idNextScenario: 2}], objects: ['branch'], description: 'You are a forest, not very dense, so you can see in the distance. In your left there is a WaterFall and in right a Rocky Mountains, what are you going to do?' },
  { id: 1, name: 'WaterFall', directions: [{name: 'climb', idNextScenario: 4}, {name: 'back', idNextScenario: 0}], objects: [], description: 'There is a waterfall right in front of you, you calculate that it is not very high, but it does not seem clever to dive from that height. However, there are some creepers on the slope, maybe we can climb' },
  { id: 2, name: 'Rocky Mountains', directions: [{name: 'climb', idNextScenario: 3}, {name: 'back', idNextScenario: 0}], objects: ['naylon', 'rope'], description: 'A kind of rock wall, there are a lot of cracks in it, maybe you can climb' },
  { id: 3, name: 'Sky dive', directions: [{name: 'jump', idNextScenario: 4}, {name: 'back', idNextScenario: 2}], objects: [], description: 'Definitely this is a hang gliding runway, it is quite high. You can see a river below and a lake a few kilometers ahead.' },
  { id: 4, name: 'River', directions: [{name: 'boat', idNextScenario: 5}], objects: [], description: 'The current is very strong, it seems to be a deep river, the water is very dirty with earth.' },
  { id: 5, name: 'Lake', directions: [{name: 'island', idNextScenario: 6}], objects: [], description: 'Despite the river the lake is very calm, its surface is flatly flat, it looks like a mirror and it is difficult to differentiate where the sky ends and the lake begins' },
  { id: 6, name: 'Island beach', directions: [{name: 'bamboo woods', idNextScenario: 7}, {name: 'temple', idNextScenario: 8}, {name: 'cemetery', idNextScenario: 9}, {name: 'boat', idNextScenario: 5}], objects: ['lamp'], description: 'Apparently there is nobody living on the island, we have a beach and a forest composed basically of bamboos'},
  { id: 7, name: 'Bamboo woods', directions: [{name: 'beach', idNextScenario: 6}, {name: 'temple', idNextScenario: 8},  {name: 'cemetery', idNextScenario: 9}, {name: 'back', idNextScenario: 6} ], objects: ['knife'], description: 'Only a bamboo forest and few trees'},
  { id: 8, name: 'Temple', directions: [{name: 'bamboo woods', idNextScenario: 7}, {name: 'enter temple', idNextScenario: 10}, {name: 'beach', idNextScenario: 8},  {name: 'cemetery', idNextScenario: 9}, {name: 'back', idNextScenario: 6} ], objects: [], description: 'An ancient temple, with the weathered woods, but still standing'},
  { id: 9, name: 'Cemetery', directions: [{name: 'bamboo woods', idNextScenario: 7}, {name: 'temple', idNextScenario: 8},  {name: 'beach', idNextScenario: 6}, {name: 'back', idNextScenario: 6} ], objects: ['shovel'], description: 'Some graves still remain, the rest is just a pile of stones'},
  { id: 10, name: 'Inside Temple', directions: [{name: 'leave', idNextScenario: 8}, {name: 'door 1', idNextScenario: 11}, {name: 'door 2', idNextScenario: 12} ], objects: ['parchment'], description: 'The entrance is made by a large hall in the center in the background there is a statue of more than 3 meters high, on your right there is a door and the left'},
  { id: 11, name: 'Cerimony room', directions: [{name: 'hall', idNextScenario: 10}, {name: 'move statue', idNextScenario: 11} ], objects: [], description: 'Here is a statue of an oni, looking more closely, you see that the ground just behind the statue is scratching. What do you intend to do?', puzzle: {status: false, solution: 'push statue', reward: 'key'}},
  { id: 12, name: 'Closet', directions: [{name: 'hall', idNextScenario: 10}, {name: 'open chest', idNextScenario: 11} ], objects: [], description: 'There is a single object in this room, a chest. There is a mark on the top.', puzzle: {status: false,solution: 'use key', reward: 'ancient amulet'}},
  { id: 13, name: 'Bamboo woods 2', directions: [{name: 'back', idNextScenario: 7}, {name: 'cave', idNextScenario: 14}], objects: [], description: 'There is an entrance dug into a hill, apparently it looks like a cave entrance, what do you intend to do?'},
  { id: 14, name: 'Cave', directions: [{name: 'back', idNextScenario: 13}, {name: 'cerimony room', idNextScenario: 15}], objects: [], description: 'In the center of the cave is a statue of an oni approximately 7 meters high'}
]

let player = {};
let actualLocalization = '';
function start(){
  player = new Player('Ricardo');
  actualLocalization= map[0];
}

start();

player.look();
player.search();
player.pick('branch');
player.lookBackpack();
// player.drop('branch');
// player.lookBackpack();


player.goto('right');
player.look();
player.search();
player.pick('naylon');
player.pick('rope');
// player.search();
player.lookBackpack();


player.goto('climb');
player.look();
player.search();


player.goto('back');
player.look();
player.goto('back');
player.look();

player.goto('left');
player.look();
player.search();


player.goto('climb');
player.look();


player.goto('boat');
player.look();


player.goto('island');
player.look();


player.goto('temple');
player.look();


player.goto('enter temple');
player.look();


player.goto('door 1');
player.look();
player.action('push statue');
player.pick('key');
player.lookBackpack();


player.goto('hall');
player.look();


player.goto('door 2');
player.look();
player.action('use key');
player.pick('amulet');
player.lookBackpack();