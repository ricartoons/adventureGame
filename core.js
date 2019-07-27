class Player {
  constructor(name) {
    this.name = name,
      this.where = [],
      this.backpack = []
  }

  //Actions
  search() {
    if(!actualLocalization.objects || actualLocalization.objects.length === 0){
      $historyBoard.innerText = 'Nothing usefull here!\n\n';
      return;
    }
    let objectsInScenario = '';

    actualLocalization.objects.forEach((element, index) => {
      if(index === 0){
        objectsInScenario = 'a ' + element.name;
      }else if(index != actualLocalization.objects.length - 1 && index === 0){
        objectsInScenario += 'a ' + element.name;
      } else if(index != actualLocalization.objects.length - 1){
        objectsInScenario += ', a ' + element.name;
      } else {
        objectsInScenario += ' and a ' + element.name;
      }
    });

    $historyBoard.innerText  = `Here is ${objectsInScenario}!\n\n`;

  }

  look(){
    $historyBoard.innerText  = actualLocalization.description;
  }

  examine(object){
    if(backpack === [] || !object){
      $historyBoard.innerText  = 'Nothing usefull to examinate!\n\n';
      return;
    }

    const test = this.backpack.find((elem) => {
      if(elem.name == object){
        return elem;
      }
    })

    if(test){
      $historyBoard.innerText  = `${test.description}\n\n`;
    } else {
      $historyBoard.innerText  = `You dont have a ${object}\n\n`;
    }

  }

  lookBackpack() {
    if(this.backpack.length === 0){
      $historyBoard.innerText  = 'There nothing in your backpack!\n\n'
      return;
    }
    let objectsInBackpack = '';

    this.backpack.forEach((element, index) => {
      if(index === 0) {
        objectsInBackpack = 'a ' + element.name;
      } else if(index != this.backpack.length - 1 && index === 0) {
        objectsInBackpack += 'a ' + element.name;
      } else if(index != this.backpack.length - 1) {
        objectsInBackpack += ', a ' + element.name;
      } else {
        objectsInBackpack += ' and a ' + element.name;
      }
    });

    $historyBoard.innerText  = `Inside your backpack has ${objectsInBackpack}!\n\n`;

  }

  get(object) {
    if(!actualLocalization.objects){
      $historyBoard.innerText  = 'Nothing usefull here!\n\n';
      return;
    }

    const test = actualLocalization.objects.find((elem, index) => {
      if(elem.name == object){
        return player.backpack.push(actualLocalization.objects.splice(index,1)[0]);
      }
    })

    if(test){
      $historyBoard.innerText  = `You took a ${object}\n\n`;
      this.updateBackpack();
    } else {
      $historyBoard.innerText  = `The ${object} doens't exist in scenario\n\n`;
    }
  }

  drop(object) {
    if(!this.backpack || this.backpack.length === 0){
      $historyBoard.innerText  = 'There nothing in your backpack!\n\n';
      return;
    }

    const test = this.backpack.find((elem, index) => {
      if(elem.name == object){
        return actualLocalization.objects.push(player.backpack.splice(index,1)[0]);
      }
    })

    if(test){
      $historyBoard.innerText  = `You droped a ${object}\n\n`;
      this.updateBackpack();
    } else {
      $historyBoard.innerText  = `The ${object} doens't exist in backpack\n\n`;
    }
  }

  updateBackpack(){
    document.querySelector('#backpack').innerHTML = '';
    for(let i = 0; i<this.backpack.length; i += 1){
      document.querySelector('#backpack').innerHTML +=`<li><img src="${this.backpack[i].url}" alt="${this.backpack[i].name}">${this.backpack[i].name}</li>`
    }
  }
  
  //Special Actions
  action(action) {
    if(!actualLocalization.puzzle) {
      $historyBoard.innerText  ='Action denied';
    }
    if(actualLocalization.puzzle.solution === action && actualLocalization.puzzle.status === false) {
      actualLocalization.puzzle.status = true;
      switch (action) {
        case 'open envelope':
          $historyBoard.innerText  =`Ao abrir o envelope, você acha uma outra embalagem, desta vez feita de uma espécie de fibra dourada e um selo ao centro.\n\n`;
          actualLocalization.objects.push('key');
          break;

        case 'broken seal':
          $historyBoard.innerText  =`Ao quebrar o selo e tirar a embalagem, você descobre uma pintura muito antiga. Nela há um macaco fugindo de outros animais, uma espécie de coelho e um sapo.\n\n`;
          actualLocalization.objects.push('key');
          break;

        case 'search envelope':
          $historyBoard.innerText  =`Olhando mais atentamente dentro do envelope, você descobre um cartão postal. E nele os seguintes dizeres: “Encontre-me no templo de Toganōsan Kōsan-ji (栂尾山高山寺) é de seu interesse. Assinado Lee”\n\n`;
          actualLocalization.objects.push('key');
          break;

        case 'push statue':
          $historyBoard.innerText  =`The statue slowly gives in to the movement and at the end it falls, stamping on the floor and revealing a key!\n\n`;
          actualLocalization.objects.push('key');
          break;

        case 'use key':
          $historyBoard.innerText  =`Although old, the mechanism works perfectly and the chest opens revealing an old amulet!\n\n`;
          actualLocalization.objects.push('amulet');
          break;

        default:
          break;
      }
    } else if(actualLocalization.puzzle.solution === action && actualLocalization.puzzle.status === true ) {
      $historyBoard.innerText  =`Did you already get the hidden item\n\n`;
    } else {
      $historyBoard.innerText  =`Nothing happens\n\n`;
    }
  }

  //Moving and 
  goto(path) {
    if(!path){
      return $historyBoard.innerText  = `Sorry, i don't understand! Let's try again?`;
    }
    actualLocalization.directions.find((item) => {
      if (item.name !== path) {
        return;
      }
      actualLocalization = map[item.idNextScenario];
      $scenario.src = actualLocalization.image;
      $historyBoard.innerText  = actualLocalization.description;
    });
  }
    
}


const map = [
  { id: 0, name: 'GoodBye', directions: [{name: 'nextScene', idNextScenario: 1}], objects: [], description: 'Nossa história começa com um funeral…\n\nNosso personagem acaba de perder os pais em um acidente e está completamente sozinho...\n\n', image: 'assets/image/scenes/image01.jpg' },
  { id: 1, name: 'Home', directions: [{name: 'nextScene', idNextScenario: 2}], objects: [], description: 'Naquela mesma chuvosa noite, revirando as fotos antigas da família, você encontra um envelope diferente.”\n\n', image: 'assets/image/scenes/image02.jpg' },
  { id: 2, name: 'Desk', directions: [{name: 'nextScene', idNextScenario: 3}], objects: [], description: 'Nele há diversos ideogramas na língua japonesa.\n\n“Estranho, nunca havia visto isso!”\n\n', image: 'assets/image/scenes/image03.jpg' },
  { id: 3, name: 'Envelope', directions: [{name: 'nextScene', idNextScenario: 4}], objects: [{name: 'painting', url: 'assets/image/backpack/painting.svg', description: "É uma pintura antiga, há inscrições incompreensiveis para você nela. Mas o desenho é um macaco fugindo de outros animais, parece que o macaco roubou algo deles..."}], description: 'Ao quebrar o selo e abrir a embalagem, você descobre uma pintura que parece muito antiga. Nela está desenhado um macaco fugindo de outros animais, mas parece que há mais alguma coisa no envelope\n\n', puzzle: {status: false, solution: 'look envelope', reward: 'postal card'}, image: 'assets/image/scenes/image04.jpg' },
  { id: 4, name: 'Postcard', directions: [{name: 'nextScene', idNextScenario: 5}], objects: [{name: 'postcard', url: 'assets/image/backpack/postcard.svg', description: "É um cartão postal simples os dizerem  “Encontre-me no templo de Toganōsan Kōsan-ji (栂尾山高山寺) é de seu interesse. Assinado Haruki” estão no verso, escrito por uma caligrafia bonita e um selo de Osaka de 1990"}], description: 'Olhando mais atentamente dentro do envelope, você descobre um cartão postal. E nele os seguintes dizeres: “Encontre-me no templo de Toganōsan Kōsan-ji (栂尾山高山寺) é de seu interesse. Assinado Haruki”\n\n', image: 'assets/image/scenes/image05.jpg' },
  { id: 5, name: 'Leaving', directions: [{name: 'nextScene', idNextScenario: 6}], objects: [], description: 'Seus pais falaram desta viagem que fizeram ao Japão na década de 90. Mas nunca mencionaram esse templo.”\n\n', image: 'assets/image/scenes/image06.jpg' },
  { id: 6, name: 'Leaving', directions: [{name: 'nextScene', idNextScenario: 7}], objects: [], description: 'Motivado pela súbita descoberta e precisando de um tempo para se recuperar, você decide fazer uma viagem ao Japão para entender esse mistério.”\n\n', image: 'assets/image/scenes/image07.jpg' },
  { id: 7, name: 'Japan', directions: [{name: 'nextScene', idNextScenario: 8}], objects: [], description: 'Ao desembarcar no aeroporto de Osaka, você pega um taxi até o hotel e após o check-in você dorme por 12 horas seguidas…\n\n', image: 'assets/image/scenes/image08.jpg' },
  { id: 8, name: 'Bath', directions: [{name: 'leave', idNextScenario: 9}, {name: 'right', idNextScenario: 0}], objects: [{name: 'envelope', url: 'assets/image/backpack/note-hotel.svg', description: "Dentro do envelope há um pedaço retangular de papel escrito em seu idioma com uma máquina de escrever: “Tsuji of the monument (Mino Road + Yamada highway)”"}], description: 'Ao acordar, você vê que já passou muito do almoço então vai tomar uma ducha. Ao sair do banho, percebe um envelope acima da sua cama.\n\n O que você vai fazer?', image: 'assets/image/scenes/image09.jpg' },
  
  { id: 9, name: 'Lobby', directions: [{name: 'hall', idNextScenario: 10}, {name: 'enter', idNextScenario: 8}], objects: [], description: 'Você está do lado de fora do seu quarto, no lobby do hotel. O Hall do hotel está logo a frente\n\n', image: 'assets/image/scenes/image03.jpg' },
  { id: 10, name: 'Hall', directions: [{name: 'street', idNextScenario: 11}, {name: 'reception', idNextScenario: 12}], objects: [], description: 'Você está no hall do hotel, a sua frente a saida para a rua, a sua direita fica a recepção\n\n', image: 'assets/image/scenes/image04.jpg' },
  
  
  
  { id: 6, name: 'River', directions: [{name: 'boat', idNextScenario: 5}], objects: [], description: 'The current is very strong, it seems to be a deep river, the water is very dirty with earth.\n\n', image: 'assets/image/scenes/image05.jpg' },
  { id: 7, name: 'Lake', directions: [{name: 'island', idNextScenario: 6}], objects: [], description: 'Despite the river the lake is very calm, its surface is flatly flat, it looks like a mirror and it is difficult to differentiate where the sky ends and the lake begins\n\n', image: 'assets/image/scenes/image06.jpg' },
  { id: 8, name: 'Island beach', directions: [{name: 'bamboo woods', idNextScenario: 7}, {name: 'temple', idNextScenario: 8}, {name: 'cemetery', idNextScenario: 9}, {name: 'boat', idNextScenario: 5}], objects: ['lamp'], description: 'Apparently there is nobody living on the island, we have a beach and a forest composed basically of bamboos\n\n', image: 'assets/image/scenes/image00.jpg'},
  { id: 9, name: 'Bamboo woods', directions: [{name: 'beach', idNextScenario: 6}, {name: 'temple', idNextScenario: 8},  {name: 'cemetery', idNextScenario: 9}, {name: 'back', idNextScenario: 6} ], objects: ['knife'], description: 'Only a bamboo forest and few trees\n\n', image: 'assets/image/scenes/image00.jpg'},
  { id: 10, name: 'Temple', directions: [{name: 'bamboo woods', idNextScenario: 7}, {name: 'enter temple', idNextScenario: 10}, {name: 'beach', idNextScenario: 8},  {name: 'cemetery', idNextScenario: 9}, {name: 'back', idNextScenario: 6} ], objects: [], description: 'An ancient temple, with the weathered woods, but still standing\n\n', image: 'assets/image/scenes/image00.jpg'},
  { id: 11, name: 'Cemetery', directions: [{name: 'bamboo woods', idNextScenario: 7}, {name: 'temple', idNextScenario: 8},  {name: 'beach', idNextScenario: 6}, {name: 'back', idNextScenario: 6} ], objects: ['shovel'], description: 'Some graves still remain, the rest is just a pile of stones\n\n', image: 'assets/image/scenes/image00.jpg'},
  { id: 12, name: 'Inside Temple', directions: [{name: 'leave', idNextScenario: 8}, {name: 'door 1', idNextScenario: 11}, {name: 'door 2', idNextScenario: 12} ], objects: ['parchment'], description: 'The entrance is made by a large hall in the center in the background there is a statue of more than 3 meters high, on your right there is a door and the left\n\n', image: 'assets/image/scenes/image00.jpg'},
  { id: 13, name: 'Cerimony room', directions: [{name: 'hall', idNextScenario: 10}, {name: 'move statue', idNextScenario: 11} ], objects: [], description: 'Here is a statue of an oni, looking more closely, you see that the ground just behind the statue is scratching. What do you intend to do?\n\n', puzzle: {status: false, solution: 'push statue', reward: 'key'}, image: 'assets/image/scenes/image00.jpg'},
  { id: 14, name: 'Closet', directions: [{name: 'hall', idNextScenario: 10}, {name: 'open chest', idNextScenario: 11} ], objects: [], description: 'There is a single object in this room, a chest. There is a mark on the top.\n\n', puzzle: {status: false,solution: 'use key', reward: 'ancient amulet'}, image: 'assets/image/scenes/image00.jpg'},
  { id: 15, name: 'Bamboo woods 2', directions: [{name: 'back', idNextScenario: 7}, {name: 'cave', idNextScenario: 14}], objects: [], description: 'There is an entrance dug into a hill, apparently it looks like a cave entrance, what do you intend to do?\n\n', image: 'assets/image/scenes/image00.jpg'},
  { id: 16, name: 'Cave', directions: [{name: 'back', idNextScenario: 13}, {name: 'cerimony room', idNextScenario: 15}], objects: [], description: 'In the center of the cave is a statue of an oni approximately 7 meters high\n\n', image: 'assets/image/scenes/image00.jpg'}
]

let player = {};
let actualLocalization = '';
// Get elements
const $historyBoard = document.querySelector('#history');
const $actionButton = document.querySelector('#action');
const $commandInput = document.querySelector('#command');
const $scenario = document.querySelector('#scenario');

function start(){
  player = new Player('Ricardo');
  actualLocalization= map[0];
  $scenario.src = actualLocalization.image;
  $historyBoard.innerText = actualLocalization.description;
}

start();
setTimeout(() => player.goto('nextScene'), 1000);
setTimeout(() => player.goto('nextScene'), 2000);
setTimeout(() => {
  player.goto('nextScene');
  player.get('painting');
  player.look();
}, 3000);
setTimeout(() => {
  player.goto('nextScene'); 
  player.get('postcard');
  player.look();
}, 4000);
setTimeout(() => player.goto('nextScene'), 5000);
setTimeout(() => player.goto('nextScene'), 6000);
setTimeout(() => player.goto('nextScene'), 7000);
setTimeout(() => player.goto('nextScene'), 8000);
setTimeout(() => player.goto('nextScene'), 9000);
setTimeout(() => player.goto('nextScene'), 10000);

//Action Buttom
$actionButton.addEventListener('click', function(e){
  e.preventDefault();
  const commandPhrase = $commandInput.value.toLowerCase();
  const words = commandPhrase.split(' ');
  
  //separate in command and objects
  let command = '';
  let object = '';
  let direction = '';
  
  //Your IA XD
  words.forEach((elem) => {
    switch (elem){
      /* COMMANDS */
      case 'search':
        if(command === ''){
          command = 'search'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
        
        case 'look':
          if(command === ''){
          command = 'look'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
        
        case 'examine':
          if(command === ''){
          command = 'examine'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      
      case 'backpack':
        if(command === ''){
          command = 'lookBackpack'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
      break;
      
      case 'get':
        if(command === ''){
          command = 'get'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
        
        case 'drop':
          if(command === ''){
            command = 'drop'
          } else {
            $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
          }
      break;
    
      case 'go':
        if(command === ''){
          command = 'go'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'leave':
        if(command === ''){
          command = 'leave'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'enter':
        if(command === ''){
          command = 'enter'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'look envelope':
        if(command === ''){
          command = 'look envelope'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
      break;
      
      case 'push statue':
        if(command === ''){
          command = 'push statue'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
    
        case 'use key':
          if(command === ''){
            command = 'use key'
          } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
      break;

      /* OBJECTS */
      case 'postcard':
        if(object === ''){
          object = 'postcard'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

        case 'envelope':
        if(object === ''){
          object = 'envelope'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

        case 'painting':
          if(object === ''){
          object = 'painting'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

        case 'nylon':
          if(object === ''){
          object = 'nylon'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

        case 'rope':
          if(object === ''){
          object = 'rope'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
      break;
      
      case 'candles':
        if(object === ''){
          object = 'candles'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

        case 'amulet':
        if(object === ''){
          object = 'amulet'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
      break;

      /* DIRECTIONS */
      case 'nextScene':
        if(direction === ''){
          direction = 'nextScene'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
      break;
        
      case 'right':
        if(direction === ''){
          direction = 'right'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
      break;
      
      case 'left':
        if(direction === ''){
          direction = 'left'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
        break;        

      case 'ahead':
        if(direction === ''){
          direction = 'ahead'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
      break;        

      case 'back':
        if(direction === ''){
          direction = 'back'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
      break;

      /* PLACES */
      case 'hall':
        if(direction === ''){
          direction = 'hall'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
      break;
      case 'room':
        if(direction === ''){
          direction = 'room'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
      break;

      default:
      break;
    }         
  });

  switch(command){
    case 'search':
      player.search()
      break;
    case 'examine':
      player.examine(object)
      break;
    case 'look':
      player.look()
      break;
    case 'lookBackpack':
      player.lookBackpack()
      break;
    case 'get':
      player.get(object)
    break;
    case 'drop':
      player.drop(object)
    break;
    case 'go':
      player.goto(direction)
    break;
    case 'leave':
      player.goto('leave')
    break;
    case 'enter':
      player.goto('enter')
    break;
    case 'look envelope':
      player.goto(direction)
    break;
    default:
    $historyBoard.innerText = `Sorry, i don't understand what ${command} means :(\n\n`
    break;
  }

  $commandInput.value = '';
})
