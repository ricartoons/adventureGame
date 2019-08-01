![Ironhack Logo](https://i.imgur.com/1QgrNNw.png)

# Project #1: Torri - Adventure Game

## Introduction

Torii é um jogo baseado nos Adventure Games do final da década de 80, como a Lenda da Gávea e Amazonia do MSX!

Conforme o wikipedia *Jogos de aventura, também conhecidos como adventures, são jogos eletrônicos cuja ênfase é focada no **enredo** e não na parte gráfica ou ação. Um jogo que define bem esse estilo é o clássico **Where in the World is Carmen Sandiego?**, um sucesso do início da década de 1980, em que jogador é instigado a viajar através do mundo para capturar Carmen San Diego e acaba conhecendo a **geografia** e aspectos **culturais** dos países por onde passa.*

### Jogabilidade

Nossa área de jogo é dividida em três partes:
1. **Stage** - Onde toda a história é contada através de textos e imagens; 
2. **Command bar** - Aqui são dados os comando para que possamos interagir com nosso personagem;
3. **Backpack** - Todos os ítens coletados durante a aventura serão armazenados aqui;

![](https://github.com/ricartoons/adventureGame/blob/master/assets/image/readme1.jpg)


## 1. Tecnologias utilizadas

Para criação do jogo foram utilizadas as tecnologias:
* HTML/CSS
* Javascript
* Bootstrap


## 2. O código

#### 2.1 A Classe Player

Foi criada uma classe Player onde as propriedades name, whare e backpack são setadas, além disso os métodos search(), look(), help(), examine(), lookBackpack(), get(), drop(), updateBackpack() e goto() são criados;

#### 2.2 A variável map
Utilizamos a constante "map" para criarmos o mapa do jogo, onde iremos adicionar em cada indice o id do cenário, seu nome, as direções permitidas, a descrição do cenário, a imagem do cenário e os objetos que nela estão contidos com suas respectivas imagens e descrições.

#### 2.3 A função start
Depois das devidas instanciações feitas na função start:

```
function start() {
  player = new Player('John Doe');
  actualLocalization = map[0];
  $scenario.src = actualLocalization.image;
  $historyBoard.innerText = actualLocalization.description;
}

```

#### 2.4 As funções setTimeout
O jogo efetivamente começa, onde há uma sequencia de funções setTimeout's que serão responsáveis pela contextualização do usuário na história

#### 2.5 The command Bar 
Após isso, o usuário deverá interagir utilizando a Command bar com os comandos sugeridos ou entrar como comando 'Help' para receber um pequeno descritivo dos principais comandos do jogo

```
  help() {
    document.querySelector('#container').classList.add('addBlur');
    $('#examine-modal').modal('show');
    document.querySelector('#examine-modal__body').innerHTML += `<div class="row">
      <div class="col-md-12">
        <h1>How to play</h1>
        <p>The game is basically an interactive story where we create our character through commands and actions as follows:</p>
      </div>
      <div class="col-md-4">
        <p>Exploration</p>
        <ul class="help-list">
          <li><u>look</u>: describes the environment you are</li>
          <li><u>search</u>: looking for something that is not evident</li>
          <li><u>examine</u>: examines something that is in your backpack</li>
        </ul>
      </div>
      <div class="col-md-4">
        <p>Navigation</p>
        <ul class="help-list">
          <li><u>go to</u>: move our character across the game map, through the scenarios</li>        
          <li><u>call</u>: Used to call a taxi or uber!</li>        
        </ul>
      </div>
      <div class="col-md-4">
        <p>Interation</p>
        <ul class="help-list">
          <li><u>get</u>: take something from the scenery and put it in your backpack</li>
          <li><u>drop</u>: remove something from the backpack</li>
        </ul>
      </div>
      <div class="col-md-12">
          <h1>Puzzles</h1>
          <p>There are also some puzzles and other commands that you must discover to advance the game.</p>
          <p>Have a good time :)</p>
      </div>
    </div>`
  }

```

Alguns comandos são mais complexos como por exemplo GET STONE, é um comando composto, onde para sua correta execução utilizamos a função contida no **addEventListener** do actionButton. 

Lá quebraremos a frase em palavras
```
const commandPhrase = $commandInput.value.toLowerCase();
const words = commandPhrase.split(' ');
```
E utilizaremos um switch para verificar se a palavra digitada existe no vocabulario cadastrado. Em caso positivo, verificamos se ela é um command, object ou direction e atribuimos a variável correspondente. (é uma espécie de inteligencia artificial #sqn :wink:)
 
```
for (let i = 0; i < words.length; i += 1) {
    switch (words[i]) {
      case 'help':
        if (command === '') {
          command = 'help'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez`;
          return;
        }
        break;

      case 'search':
        if (command === '') {
          command = 'search'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez`;
          return;
        }
        break;

      case 'look':
        if (command === '') {
          command = 'look'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez`;
          return;
        }
        break;

      case 'examine':
        if (command === '') {
          command = 'examine'
        } else {
          $historyBoard.innerText = `Você só pode entrar com um comando por vez`;
          return;
        }
        break;
    ...
```
## 3. o HTML

No Html temos 

:bulb: Remember the boundaries!

## 4. Fourth Iteration: Create Obstacles

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_618fa6bbeed08f1e74b9457af1ecaf4c.png)

Now let´s make this interesting. We should create obstacles that shows up every certain amount of times. (Remember how we did them on the Learning Unit). In this iteration, just limit to create them :wink:

They will always start in the position **0** of the `y` axis, but you should make them appear in a random place of the `x` axis.

## 5. Fifth Iteration: Move the Obstacles

For moving the obstacles, we need to continuously update our `canvas`. In this iteration you need to continuously change the position of the obstacles in every update, making them move down the road.

## 6. Bonus Iteration: Points, Points, Points

Oh! If we want to challenge somebody, we need to quantify who is making it better. So we need to add a **score**. Go ahead and add a method to count points while you keep the car avoiding obstacles.

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_e4b1a09cee1b1a827a2c68023d0d2b1f.png)

![](https://s3-eu-west-1.amazonaws.com/ih-materials/uploads/upload_4e64a09180fd0add2766f7e28ebce6bf.png)