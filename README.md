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

O código está estruturado da seguinte forma:
index.html
README.md
assets
    /css
        style.css
    /dependencies
        /bootstrap
            bootstrap.min.css
            bootstrap.min.js
            jquery-3.3.1.slim.min.js
    /image
        /backpack
            ...images...
        /examine
            ...images...
        /scenes
            ...images...
        bgBackpack.jpg
        bgContainer.jpg
        readme1.jpg
    /js
        core.js


## 3. o HTML

No Html

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