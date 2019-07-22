class Player {
  constructor(name) {
    this.name = name,
      this.where = [],
      this.backpack = []
  }

  //Actions
  search() {
    if(!atualLocalization.objects || atualLocalization.objects.length === 0){
      console.log('Nothing usefull here!');
      return;
    }
    let objectsInScenario = '';

    atualLocalization.objects.forEach((element, index) => {
      if(index === 0){
        objectsInScenario += 'a ' + element;
      }else if(index != atualLocalization.objects.length - 1 && index === 0){
        objectsInScenario += 'a ' + element;
      } else if(index != atualLocalization.objects.length - 1){
        objectsInScenario += ', a ' + element;
      } else {
        objectsInScenario += ' and a ' + element;
      }
    });

    console.log(`Here is ${objectsInScenario}!`);

  }

  look(){
    console.log(atualLocalization.description);
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
    if(!atualLocalization.objects){
      console.log('Nothing usefull here!')
      return;
    }

    const test = atualLocalization.objects.find((elem, index) => {
      if(elem == object){
        //map.updateMap(object);
        return player.backpack.push(atualLocalization.objects.splice(index,1)[0]);
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
        return atualLocalization.objects.push(player.backpack.splice(index,1)[0]);
      }
    })

    if(test){
      console.log(`You droped a ${object}`)
    } else {
      console.log(`The ${object} doens't exist in backpack`);
    }
  }

  //Moving and 
  goto(path) {
    atualLocalization.directions.find((item) => {
      if (item.name !== path) {
        return;
      }
  
      atualLocalization = map[item.idNextScenario];
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
  { id: 7, name: 'Bamboo woods', directions: [{name: 'beach', idNextScenario: 6}, {name: 'temple', idNextScenario: 8},  {name: 'cemetery', idNextScenario: 9}, {name: 'back', idNextScenario: 6} ], objects: ['knife'], description: ''},
  { id: 8, name: 'Temple', directions: [{name: 'bamboo woods', idNextScenario: 7}, {name: 'enter temple', idNextScenario: 10}, {name: 'beach', idNextScenario: 8},  {name: 'cemetery', idNextScenario: 9}, {name: 'back', idNextScenario: 6} ], objects: [], description: ''},
  { id: 9, name: 'Cemetery', directions: [{name: 'bamboo woods', idNextScenario: 7}, {name: 'temple', idNextScenario: 8},  {name: 'beach', idNextScenario: 6}, {name: 'back', idNextScenario: 6} ], objects: ['shovel'], description: ''},
  { id: 10, name: 'Inside Temple', directions: [{name: 'leave', idNextScenario: 8}, {name: 'door 1', idNextScenario: 11}, {name: 'door 2', idNextScenario: 12} ], objects: ['parchment'], description: ''},
  { id: 11, name: 'Cerimony room', directions: [{name: 'back to main room', idNextScenario: 10}, {name: 'move statue', idNextScenario: 11} ], objects: ['key'], description: ''},
  { id: 12, name: 'Closet', directions: [{name: 'back to main room', idNextScenario: 10}, {name: 'open chest', idNextScenario: 11} ], objects: ['amulet'], description: ''}
]

let player = {};
let atualLocalization = '';
function start(){
  player = new Player('Ricardo');
  atualLocalization= map[0];
}

start();

player.look();
player.search();
player.pick('branch');
player.lookBackpack();
player.drop('branch');
player.lookBackpack();


player.goto('right');
player.look();
player.search();
player.pick('naylon');
player.pick('rope');
player.search();
player.lookBackpack();


player.goto('climb');
player.look();
player.search();


player.goto('back');
player.goto('back');


player.goto('left');
player.look();
player.search();


player.goto('climb');
player.look();


player.goto('boat');
player.look();


player.goto('island');
player.look();


// player.goto('back');

// player.goto('left');

// 

// 

// player.goto('island');

// player.goto('temple');

// player.goto('enter temple');