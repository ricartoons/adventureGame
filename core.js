class Player {
  constructor(name) {
    this.name = name,
      this.where = [],
      this.backpack = []
  }

  //Actions
  search() {
    if (!actualLocalization.objects || actualLocalization.objects.length === 0) {
      $historyBoard.innerText = 'Nothing usefull here!\n\n';
      return;
    }
    let objectsInScenario = '';

    actualLocalization.objects.forEach((element, index) => {
      if (index === 0) {
        objectsInScenario = 'a ' + element.name;
      } else if (index != actualLocalization.objects.length - 1 && index === 0) {
        objectsInScenario += 'a ' + element.name;
      } else if (index != actualLocalization.objects.length - 1) {
        objectsInScenario += ', a ' + element.name;
      } else {
        objectsInScenario += ' and a ' + element.name;
      }
    });

    $historyBoard.innerText = `Here is ${objectsInScenario}!\n\n`;

  }

  look() {
    $historyBoard.innerText = actualLocalization.description;
  }

  examine(object) {
    if (backpack === [] || !object) {
      $historyBoard.innerText = 'Nothing usefull to examinate!\n\n';
      return;
    }

    const test = this.backpack.find((elem) => {
      if (elem.name == object) {
        return elem;
      }
    })

    if (test) {
      $historyBoard.innerText = `${test.description}\n\n`;
    } else {
      $historyBoard.innerText = `You dont have a ${object}\n\n`;
    }

  }

  lookBackpack() {
    if (this.backpack.length === 0) {
      $historyBoard.innerText = 'There nothing in your backpack!\n\n'
      return;
    }
    let objectsInBackpack = '';

    this.backpack.forEach((element, index) => {
      if (index === 0) {
        objectsInBackpack = 'a ' + element.name;
      } else if (index != this.backpack.length - 1 && index === 0) {
        objectsInBackpack += 'a ' + element.name;
      } else if (index != this.backpack.length - 1) {
        objectsInBackpack += ', a ' + element.name;
      } else {
        objectsInBackpack += ' and a ' + element.name;
      }
    });

    $historyBoard.innerText = `Inside your backpack has ${objectsInBackpack}!\n\n`;

  }

  get(object) {
    if (!actualLocalization.objects) {
      $historyBoard.innerText = 'Nothing usefull here!\n\n';
      return;
    }

    const test = actualLocalization.objects.find((elem, index) => {
      if (elem.name == object) {
        return player.backpack.push(actualLocalization.objects.splice(index, 1)[0]);
      }
    })

    if (test) {
      $historyBoard.innerText = `You took a ${object}\n\n`;
      this.updateBackpack();
    } else {
      $historyBoard.innerText = `The ${object} doens't exist in scenario\n\n`;
    }
  }

  drop(object) {
    if (!this.backpack || this.backpack.length === 0) {
      $historyBoard.innerText = 'There nothing in your backpack!\n\n';
      return;
    }

    const test = this.backpack.find((elem, index) => {
      if (elem.name == object) {
        return actualLocalization.objects.push(player.backpack.splice(index, 1)[0]);
      }
    })

    if (test) {
      $historyBoard.innerText = `You droped a ${object}\n\n`;
      this.updateBackpack();
    } else {
      $historyBoard.innerText = `The ${object} doens't exist in backpack\n\n`;
    }
  }

  updateBackpack() {
    document.querySelector('#backpack').innerHTML = '';
    for (let i = 0; i < this.backpack.length; i += 1) {
      document.querySelector('#backpack').innerHTML += `<li><img src="${this.backpack[i].url}" alt="${this.backpack[i].name}">${this.backpack[i].name}</li>`
    }
  }

  //Special Actions
  action(action) {
    if (!actualLocalization.puzzle) {
      $historyBoard.innerText = 'Action denied';
    }
    if (actualLocalization.puzzle.solution === action && actualLocalization.puzzle.status === false) {
      actualLocalization.puzzle.status = true;
      switch (action) {
        case 'open envelope':
          $historyBoard.innerText = `Ao abrir o envelope, você acha uma outra embalagem, desta vez feita de uma espécie de fibra dourada e um selo ao centro.\n\n`;
          actualLocalization.objects.push('key');
          break;

        case 'broken seal':
          $historyBoard.innerText = `Ao quebrar o selo e tirar a embalagem, você descobre uma pintura muito antiga. Nela há um macaco fugindo de outros animais, uma espécie de coelho e um sapo.\n\n`;
          actualLocalization.objects.push('key');
          break;

        case 'search envelope':
          $historyBoard.innerText = `Olhando mais atentamente dentro do envelope, você descobre um cartão postal. E nele os seguintes dizeres: “Encontre-me no templo de Toganōsan Kōsan-ji (栂尾山高山寺) é de seu interesse. Assinado Lee”\n\n`;
          actualLocalization.objects.push('key');
          break;

        case 'push statue':
          $historyBoard.innerText = `The statue slowly gives in to the movement and at the end it falls, stamping on the floor and revealing a key!\n\n`;
          actualLocalization.objects.push('key');
          break;

        case 'use key':
          $historyBoard.innerText = `Although old, the mechanism works perfectly and the chest opens revealing an old amulet!\n\n`;
          actualLocalization.objects.push('amulet');
          break;

        default:
          break;
      }
    } else if (actualLocalization.puzzle.solution === action && actualLocalization.puzzle.status === true) {
      $historyBoard.innerText = `Did you already get the hidden item\n\n`;
    } else {
      $historyBoard.innerText = `Nothing happens\n\n`;
    }
  }

  //Moving 
  goto(path) {
    if (!path) {
      return $historyBoard.innerText = `Sorry, i don't understand! Let's try again?`;
    }
    actualLocalization.directions.find((item) => {
      if (item.name !== path) {
        return;
      }
      actualLocalization = map[item.idNextScenario];
      $scenario.src = actualLocalization.image;
      $historyBoard.innerText = actualLocalization.description;
    });
  }


}


const map = [
  { id: 0, name: 'GoodBye', directions: [{name: 'nextScene', idNextScenario: 1}], objects: [], description: 'Nossa história começa com um funeral…\n\nNosso personagem acaba de perder os pais em um acidente e está completamente sozinho...\n\n', image: 'assets/image/scenes/image01.jpg' },
  { id: 1, name: 'Home', directions: [{name: 'nextScene', idNextScenario: 2}], objects: [], description: 'Naquela mesma chuvosa noite, revirando as fotos antigas da família, você encontra um envelope diferente.”\n\n', image: 'assets/image/scenes/image02.jpg' },
  { id: 2, name: 'Desk', directions: [{name: 'nextScene', idNextScenario: 3}], objects: [], description: 'Nele há diversos ideogramas na língua japonesa.\n\n“Estranho, nunca havia visto isso!”\n\n', image: 'assets/image/scenes/image03.jpg' },
  { id: 3, name: 'Envelope', directions: [{name: 'nextScene', idNextScenario: 4}], objects: [{name: 'painting', url: 'assets/image/backpack/painting.svg', description: "É uma pintura antiga, há inscrições incompreensiveis para você nela. Mas o desenho é um macaco fugindo de outros animais, parece que o macaco roubou algo deles..."}], description: 'Ao quebrar o selo e abrir a embalagem, você descobre uma pintura que parece muito antiga. Nela está desenhado um macaco fugindo de outros animais, mas parece que há mais alguma coisa no envelope\n\n', puzzle: {status: false, solution: 'look envelope', reward: 'postal card'}, image: 'assets/image/scenes/image04.jpg' },
  { id: 4, name: 'Postcard', directions: [{name: 'nextScene', idNextScenario: 5}], objects: [{name: 'postcard', url: 'assets/image/backpack/postcard.svg', description: "É um cartão postal simples os dizerem  “Encontre-me no templo de Toganōsan Kōsan-ji (栂尾山高山寺) é de seu interesse. Assinado Haruki” estão no verso, escrito por uma caligrafia bonita e um selo de Osaka de 1990"}], description: 'Olhando mais atentamente dentro do envelope, você descobre um cartão postal. E nele os seguintes dizeres: “Encontre-me no templo de Toganōsan Kōsan-ji (栂尾山高山寺) é de seu interesse. Assinado Haruki”\n\n', image: 'assets/image/scenes/image05.jpg' },
  { id: 5, name: 'Parents', directions: [{name: 'nextScene', idNextScenario: 6}], objects: [], description: 'Seus pais falaram desta viagem que fizeram ao Japão na década de 90. Mas nunca mencionaram esse templo.”\n\n', image: 'assets/image/scenes/image06.jpg' },
  { id: 6, name: 'Leaving', directions: [{name: 'nextScene', idNextScenario: 7}], objects: [], description: 'Motivado pela súbita descoberta e precisando de um tempo para se recuperar, você decide fazer uma viagem ao Japão para entender esse mistério.”\n\n', image: 'assets/image/scenes/image07.jpg' }, 

  { id: 7, name: 'Japan', directions: [{name: 'nextScene', idNextScenario: 8}], objects: [], description: 'Ao desembarcar no aeroporto de Osaka, você pega um taxi até o hotel e após o check-in você dorme por 12 horas seguidas…\n\n', image: 'assets/image/scenes/image08.jpg' },
  { id: 8, name: 'Bath', directions: [{name: 'leave', idNextScenario: 9}, {name: 'right', idNextScenario: 0}], objects: [{name: 'envelope', url: 'assets/image/backpack/note-hotel.svg', description: "Dentro do envelope há um pedaço retangular de papel escrito em seu idioma com uma máquina de escrever: “Tsuji of the monument (Mino Road + Yamada highway)”.\nApós uma pesquisa rápida no google você descobre um endereço e que é um monumento."}], description: 'Ao acordar, você vê que já passou muito do almoço então vai tomar uma ducha. Ao sair do banho, percebe um envelope acima da sua cama.\n\n O que você vai fazer?', image: 'assets/image/scenes/image00.jpg' },
  { id: 9, name: 'Lobby', directions: [{name: 'hall', idNextScenario: 10}, {name: 'enter', idNextScenario: 8}], objects: [], description: 'Você está do lado de fora do seu quarto, no lobby do hotel. O Hall do hotel está logo a frente\n\n', image: 'assets/image/scenes/image00.jpg' },
  { id: 10, name: 'Hall', directions: [{name: 'street', idNextScenario: 12}, {name: 'reception', idNextScenario: 11}, {name: 'lobby', idNextScenario: 9}], objects: [], description: 'Você está no hall do hotel, a sua frente a saida para a rua, a sua direita fica a recepção ou você pode voltar para o lobby\n\n', image: 'assets/image/scenes/image00.jpg' },
  { id: 11, name: 'Reception', directions: [{name: 'street', idNextScenario: 12}, {name: 'hall', idNextScenario: 10}, {name: 'lobby', idNextScenario: 9}], objects: [], description: 'É uma recepção pequena e bem simples, nela há um computador, um telefone e nada mais. Aparentemente não há ninguém aqui.\n\n', image: 'assets/image/scenes/image00.jpg' },
  { id: 12, name: 'Street', directions: [{name: 'left', idNextScenario: 13}, {name: 'right', idNextScenario: 14}, {name: 'enter', idNextScenario: 11},{name: 'uber', idNextScenario: 15}], objects: [], description: 'Estamos na frente do hotel. É um prédio simples, com poucos andares, talvez uns 5 ou 6 andares.\n Você pode entrar no prédio, seguir a rua para a esqueda ou para a direita\n\n', image: 'assets/image/scenes/image00.jpg' },
  { id: 13, name: 'Street left', directions: [{name: 'uber', idNextScenario: 15}, {name: 'right', idNextScenario: 12}, {name: 'hall', idNextScenario: 11},{name: 'uber', idNextScenario: 15}], objects: [], description: 'Nos afastamos uns dois quarteirões do hotel, acho que vai ser meio dificil chegarmos ao endereço do papel dessa andando.\n\n', image: 'assets/image/scenes/image00.jpg' },
  { id: 14, name: 'Street right', directions: [{name: 'uber', idNextScenario: 15}, {name: 'left', idNextScenario: 12}, {name: 'hall', idNextScenario: 11},{name: 'uber', idNextScenario: 15}], objects: [], description: 'Chegamos a uma bifurcação onde a nossa frente há um rio. Não seria melhor ir de carro?\n\n', image: 'assets/image/scenes/image00.jpg' },
  { id: 15, name: 'Uber', directions: [{name: 'hotel', idNextScenario: 12}, {name: 'park', idNextScenario: 16}, {name: 'ask', idNextScenario: 16}], objects: [], description: 'O local onde o Uber te deixou é um esquina, movimentada e o monumento e coluna de pedra de um metro e meio com alguns dizeres que você não entende, nem seu google translate.\nOlhando mais de perto você vê uma figura de tipo de sacerdote segurando um bastão com argolas e no seu kimono, podemos ver uma insígnia que lhe parece familiar…\nSeria interessante perguntar para alguém o que está escrito aqui!\n', image: 'assets/image/scenes/image00.jpg' },
  { id: 16, name: 'Token', directions: [{name: 'hotel', idNextScenario: 12}, {name: 'uber', idNextScenario: 17}], objects: [], description: 'A primeira pessoa que você chama, passa direto visivelmente com medo de você. \n\n A segunda é um policial, que visivelmente com pressa somente balbucia a palavra “Hattori ... Park” e vai embora. Parece que turistas não são bem vistos por aqui...', image: 'assets/image/scenes/image00.jpg' },

  { id: 17, name: 'Park', directions: [{name: 'east', idNextScenario: 18},{name: 'oest', idNextScenario: 21},{name: 'uber', idNextScenario: 15}], objects: [], description: 'O tamanho do parque realmente te surpreendeu. Olhando o mapa logo na entrada você pode ver que na verdade todo o parque é um grande museu ao céu aberto, além de contar com vários anexos com campos de futebol, campos de basebol, um centro aquático e até um centro de hipismo!\nHá dois caminhos a seguir, para leste e oeste', image: 'assets/image/scenes/image00.jpg' },
  { id: 18, name: 'Park East', directions: [{name: 'east', idNextScenario: 19},{name: 'oest', idNextScenario: 17}], objects: [{name: 'stone', url: 'assets/image/backpack/stone.svg', description: "É uma pedra lisa de uns 10 centimetros, ótimas para arremessar na superficie de um lago e vê-la quicar!"}], description: 'Na trilha para Leste há uma trilha de pedras cercada por cerejeiras, em seu final ha uma casa antiga que faz parte do museu', image: 'assets/image/scenes/image00.jpg' },
  { id: 19, name: 'First house', directions: [{name: 'enter', idNextScenario: 20},{name: 'oest', idNextScenario: 18}], objects: [{name: 'bat', url: 'assets/image/backpack/bat.svg', description: "É um bastão de basaball, bem antigo e castigado pelo tempo. Mas ainda é um bastão..."}], description: 'É uma casa térrea com o teto alto, típico do Japão da era Edo (era o que estava escrito no mapa!)\n', image: 'assets/image/scenes/image00.jpg' },
  { id: 20, name: 'First house - inside', directions: [{name: 'leave', idNextScenario: 19}], objects: [{name: 'candles', url: 'assets/image/backpack/candles.svg', description: "São duas velas de uns 30 centimetros de altura"}], description: 'Você pode ver um chão de madeira liso, bem polido (apesar de antigo) no centro da sala principal uma abertura no chão com um punhado de areia e uma espécie de lareira.', image: 'assets/image/scenes/image00.jpg' },
  { id: 21, name: 'Park Oest', directions: [{name: 'oest', idNextScenario: 22},{name: 'east', idNextScenario: 17}], objects: [], description: 'Você resolve ir para oeste, na direção da sede do Museu.', image: 'assets/image/scenes/image00.jpg' },
  { id: 22, name: 'Park Oest 2', directions: [{name: 'oest', idNextScenario: 23},{name: 'trail', idNextScenario: 25},{name: 'east', idNextScenario: 21}], objects: [{name: 'branch', url: 'assets/image/backpack/branch.svg', description: "É um galho, de quase um metro de altura e bem resistente..."}], description: 'O caminho é bem largo, possui um gramado a sua direita enquanto à sua esquerda uma mata, ao longe podemos avistar um lago e o prédio da sede ao seu lado. Olhando para sua esquerda mais atentamente há algo parecido com uma entrada na mata.', image: 'assets/image/scenes/image00.jpg' },
  { id: 23, name: 'Big house', directions: [{name: 'enter', idNextScenario: 24},{name: 'east', idNextScenario: 22}], objects: [], description: 'Você está na frente da sede do Museu da Aldeia Popular Japonesa. É um prédio grande, semelhante aos menores, porém parece que ali há mais cômodos.', image: 'assets/image/scenes/image00.jpg' },
  { id: 24, name: 'Big house - inside', directions: [{name: 'leave', idNextScenario: 23}], objects: [], description: 'Você está na sala de entrada, lá você encontra alguns objetos típicos em exposição. Após uma rápida busca, você não encontra nada de anormal. Mesmo porque os cômodos estão trancados ou bloqueados impedindo uma busca melhor.', image: 'assets/image/scenes/image00.jpg' },
  
  { id: 25, name: 'The trail1', directions: [{name: 'front', idNextScenario: 26},{name: 'back', idNextScenario: 22}], objects: [], description: 'Realmente não parece uma trilha, pois não há um caminho visivel a seguir. O que você prente fazer, continuar em frente ou voltar?', image: 'assets/image/scenes/image00.jpg' },
  { id: 26, name: 'The trail2', directions: [{name: 'front', idNextScenario: 27},{name: 'back', idNextScenario: 25}], objects: [], description: 'A mata está ficando mais densa e você quase não consegue distinguir de onde veio. Isso está começando a ficar realmente perigoso... O que você prentede fazer?', image: 'assets/image/scenes/image00.jpg' },
  { id: 27, name: 'The trail3', directions: [{name: 'front', idNextScenario: 28},{name: 'back', idNextScenario: 26}], objects: [{name: 'lighter', url: 'assets/image/backpack/lighter.svg', description: "É um isqueiro tradicional, tipo Zippo, que ainda tem fluido!"}], description: 'Ao longe você distigue uma especie de clareira... Vamos continuar seguindo em frente ou voltar?', image: 'assets/image/scenes/image00.jpg' },
  { id: 28, name: 'The temple', directions: [{name: 'enter', idNextScenario: 29},{name: 'back', idNextScenario: 27}], objects: [], description: 'No centro da clareira você acha um templo minúsculo, reservado para pequenas oferendas e orações.', image: 'assets/image/scenes/image00.jpg' },
  { id: 29, name: 'The altar', directions: [{name: 'candles', idNextScenario: 30},{name: 'back', idNextScenario: 28}], objects: [], description: 'Você examina mais de perto o altar e descobre que o insignia do kimono do monge do monumento da rua é o mesmo que está no centro do altar, há tambem dois orifícios ...', image: 'assets/image/scenes/image00.jpg' },
  { id: 30, name: 'The secret', directions: [{name: 'altar', idNextScenario: 31},{name: 'back', idNextScenario: 29}], objects: [], description: 'Colocando as velas no altar você ouve um mecanismo ser ativado e a insígnia se abre revelando um compartimento pequeno com uma chave lá dentro!!!', image: 'assets/image/scenes/image00.jpg' },
  { id: 31, name: 'The key', directions: [{name: 'key', idNextScenario: 31},{name: 'back', idNextScenario: 30}], objects: [], description: 'Parabéns, você terminou o prólogo do jogo Torii, em breve lançaremos novos capítulos.\n Muito obrigado!!!', image: 'assets/image/scenes/image00.jpg' },
]

let player = {};
let actualLocalization = '';
// Get elements
const $historyBoard = document.querySelector('#history');
const $actionButton = document.querySelector('#action');
const $commandInput = document.querySelector('#command');
const $scenario = document.querySelector('#scenario');

function start() {
  player = new Player('Ricardo');
  actualLocalization = map[0];
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
$actionButton.addEventListener('click', function (e) {
  e.preventDefault();
  const commandPhrase = $commandInput.value.toLowerCase();
  const words = commandPhrase.split(' ');

  //separate in command and objects
  let command = '';
  let object = '';
  let direction = '';

  //Your IA XD
  words.forEach((elem) => {
    switch (elem) {
      /* COMMANDS */
      case 'search':
        if (command === '') {
          command = 'search'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'look':
        if (command === '') {
          command = 'look'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'examine':
        if (command === '') {
          command = 'examine'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'backpack':
        if (command === '') {
          command = 'lookBackpack'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'get':
        if (command === '') {
          command = 'get'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'drop':
        if (command === '') {
          command = 'drop'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'go':
        if (command === '') {
          command = 'go'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'call':
        if (command === '') {
          command = 'call'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'ask':
        if (command === '') {
          command = 'ask'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'leave':
        if (command === '') {
          command = 'leave'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'enter':
        if (command === '') {
          command = 'enter'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'use':
        if (command === '') {
          command = 'use'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'put':
        if (command === '') {
          command = 'put'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

        /* OBJECTS */
      case 'postcard':
        if (object === '') {
          object = 'postcard'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'envelope':
        if (object === '') {
          object = 'envelope'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'painting':
        if (object === '') {
          object = 'painting'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'key':
        if (object === '') {
          object = 'key'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'stone':
        if (object === '') {
          object = 'stone'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'bat':
        if (object === '') {
          object = 'bat'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'candles':
        if (object === '') {
          object = 'candles'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'lighter':
        if (object === '') {
          object = 'lighter'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'branch':
        if (object === '') {
          object = 'branch'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      case 'amulet':
        if (object === '') {
          object = 'amulet'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um objeto por vez\n\n`
        }
        break;

      /* DIRECTIONS */
      case 'nextScene':
        if (direction === '') {
          direction = 'nextScene'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      case 'right':
        if (direction === '') {
          direction = 'right'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
        break;

      case 'left':
        if (direction === '') {
          direction = 'left'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
        break;

      case 'front':
        if (direction === '') {
          direction = 'front'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
        break;

      case 'east':
        if (direction === '') {
          direction = 'east'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
        break;

      case 'oest':
        if (direction === '') {
          direction = 'oest'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
        break;

      case 'back':
        if (direction === '') {
          direction = 'back'
        } else {
          $historyBoard.innerText = `Você só pode entrar com uma direção por vez\n\n`
        }
        break;

        /* PLACES */
      case 'hall':
        if (direction === '') {
          direction = 'hall'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'room':
        if (direction === '') {
          direction = 'room'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'lobby':
        if (direction === '') {
          direction = 'lobby'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'reception':
        if (direction === '') {
          direction = 'reception'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'street':
        if (direction === '') {
          direction = 'street'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'park':
        if (direction === '') {
          direction = 'park'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'house':
        if (direction === '') {
          direction = 'house'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'trail':
        if (direction === '') {
          direction = 'trail'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'temple':
        if (direction === '') {
          direction = 'temple'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;
      case 'altar':
        if (direction === '') {
          direction = 'altar'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez\n\n`
        }
        break;

      default:
        break;
    }
  });

  switch (command) {
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
    case 'call':
      player.goto('uber')
      break;
    case 'ask':
      player.goto('ask')
      break;
    case 'enter':
      player.goto('enter')
      break;
    case 'use':
      player.goto(direction)
      break;
    case 'put':
      player.goto('candles')
      break;
    default:
      $historyBoard.innerText = `Sorry, i don't understand what ${command} means :(\n\n`
      break;
  }

  $commandInput.value = '';
})
