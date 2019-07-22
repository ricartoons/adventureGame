const map = [
  { id: 0, name: 'Woods', objects: ['branch', 'stone'], directions: ['n'], lastIndex: 0 },
  { id: 1, name: 'Road', objects: ['tire', 'keys'], directions: ['n', 's'] },
  { id: 2, name: 'City', objects: ['paper', 'lighter'], directions: ['n', 'e', 's', 'o'] },
  { id: 3, name: 'Temple', objects: ['knife'], directions: ['e', 'o'] },
  { id: 4, name: 'Cemetery', objects: ['branch'], directions: ['o'] }
];

const backpack = [];
let idx = 0;
let test = null;


function goingTo(direction, lastIndex) {
  //testa se ele veio de algum lugar e se este lugar foi o escolhido
  if(map[idx].comeFrom && map[idx].comeFrom === direction) {
    idx = lastIndex - 1;
    return;
  }

  //testa se existe a direcao escolhida
  test = map[idx].directions.some(element => {
    return element === direction
  });

  //seta a direcao de onde ele veio e o indice do array
  if (test) {
    map[idx].lastIndex = lastIndex;
    idx++;
    switch (direction) {
      case 'n':
        map[idx].comeFrom = 's';
        break;

      case 's':
        map[idx].comeFrom = 'n';
        //map[idx].lastIndex = map[map[idx].lastIndex].id;
        break;

      case 'e':
        map[idx].comeFrom = 'o';
        //map[idx].lastIndex = map[map[idx].lastIndex].id;
        break;

      case 'o':
        map[idx].comeFrom = 'e';
        //map[idx].lastIndex = map[map[idx].lastIndex].id;
        break;

      default:
        break;
    }
  } else {
    console.log('Wrong way');
  }
}

//start


// console.log("look: ", map[idx].objects);

// backpack.push(map[idx].objects.splice(0, 1)); //pick 'branch'
// console.log("look backpack: ", backpack);
// console.log("look: ", map[idx].objects);

// console.log(map[idx].directions);

console.log(`You are in ${map[idx].name}`);

goingTo('n', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('n', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('s', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('s', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('n', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('n', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('n', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('e', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('o', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('s', map[idx].id);
 console.log(`You are in ${map[idx].name}`);

 goingTo('s', map[idx].id);
 console.log(`You are in ${map[idx].name}`)

 goingTo('s', map[idx].id);
 console.log(`You are in ${map[idx].name}`)

 // novo caminho
 
 goingTo('n', map[idx].id);
 console.log(`You are in ${map[idx].name}`)
 
 goingTo('n', map[idx].id);
 console.log(`You are in ${map[idx].name}`)
 
 goingTo('e', map[idx].id);
 console.log(`You are in ${map[idx].name}`)
 
 goingTo('o', map[idx].id);
 console.log(`You are in ${map[idx].name}`)
// backpack.push(map[idx].objects.splice(1, 1)); //pick 'keys'
// console.log("look: ", map[idx].objects);
// console.log("look backpack: ", backpack);
// goingTo('s');
// console.log(`You are in ${map[idx].name}`)
// console.log(`You come from ${map[idx].comeFrom}`)
// //move
// console.log("look: ", map[1].objects);

// //move
// console.log("look: ", map[2].objects);
// backpack.push(map[2].objects.splice(1,1)); //pick 'lighter'
// console.log("look: ", map[2].objects);
// console.log("look backpack: ", backpack);
// backpack.push(map[2].objects.splice(0,1)); //pick 'lighter'
// console.log("look backpack: ", backpack);




// //looking map
// console.log('map: ', map)