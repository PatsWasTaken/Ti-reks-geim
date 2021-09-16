var trex, trex_running, trex_murio, edges;
var groundImage;
var piso, pisoInvisible;
var nube, nubeImagen;
var cactus, kaktus1, kaktus2, kaktus3, kaktus4, kaktus5, kaktus6;
var score;
var PLAY=1;
var END=0;
var estadosDeJuego=PLAY;
var grupoNube,grupoCactus;
var gameOver,restart;
var murio;
var marioBros;
var doscientos;
var terodactilo, peterodactilo;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  groundImage = loadImage("ground2.png");
  nubeImagen=loadImage("cloud.png");
  kaktus1=loadImage("obstacle1.png");
  kaktus2=loadImage("obstacle2.png");
  kaktus3=loadImage("obstacle3.png");
  kaktus4=loadImage("obstacle4.png");
  kaktus5=loadImage("obstacle5.png");
  kaktus6=loadImage("obstacle6.png");
  GueimOver=loadImage("gameOver.png");
  Restart=loadImage("restart.png");
  trex_murio=loadAnimation("trex_collided.png");
  murio=loadSound("die.mp3");
  marioBros=loadSound("jump.mp3");
  doscientos=loadSound("checkPoint.mp3");
  peterodactilo=loadImage("pterodactilo.png");
}

function setup(){
  createCanvas(600,200);
  
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  edges = createEdgeSprites();
  piso=createSprite(200,180,400,20);
  piso.addImage("ground",groundImage);
  pisoInvisible=createSprite(200,190,400,10);
  pisoInvisible.visible=false;
  gameOver=createSprite(300,100);
  gameOver.addImage(GueimOver);
  gameOver.visible=false;
  restart=createSprite(300,140);
  restart.addImage(Restart);
  restart.visible=false;
  trex.addAnimation("F", trex_murio);
  
  restart.scale=0.5;
  trex.scale = 0.5;
  trex.x = 50
  
  grupoNube=new Group();
  
  grupoCactus=new Group();
  
  grupoDino=new Group();
  
  trex.setCollider("circle",0,0,40);
  trex.debug=false;
  
  score=0;
}

score=0;

function draw(){
   
  background("green");
  
     stroke("white");
     textSize(16);
     text("score:"+score,420,20);
  
  if(estadosDeJuego===PLAY){
     piso.velocityX=-(2+score/100);
     piso.velocityY=0;
     score=score+Math.round(getFrameRate()/60);
    
    if(score >0 && score%100===0){
      doscientos.play();
    }
    
    if(piso.x <0){
      piso.x=200;
  }
    
    if(keyDown("space") && trex.y >=161){
      trex.velocityY = -10;
      marioBros.play();
  }
      trex.velocityY = trex.velocityY + 0.4;
    
      spawnCloud();
  
      spawnCactus();
    
      dinos();
    
    if(grupoCactus.isTouching(trex)||grupoDino.isTouching(trex)){
      murio.play();
      estadosDeJuego=END;
    }
     }
  
  else if(estadosDeJuego===END){
          piso.velocityX=0;
          piso.velocityY=0;
          grupoCactus.setVelocityXEach(0);
          grupoCactus.setVelocityYEach(0);
          grupoNube.setVelocityXEach(0);
          grupoNube.setVelocityYEach(0);
          grupoDino.setVelocityXEach(0);
          grupoDino.setVelocityYEach(0);
          gameOver.visible=true;
          restart.visible=true;
          grupoNube.setLifetimeEach(-1);
          grupoCactus.setLifetimeEach(-1);
          grupoDino.setLifetimeEach(-1);
          trex.velocityY=0;
          trex.changeAnimation("F", trex_murio);
    
          if(mousePressedOver(restart)){
             reset();
             }
          }
  
  trex.collide(pisoInvisible);
      
  drawSprites();
}

function spawnCloud(){
 if(frameCount%60===0){
   nube=createSprite(600,100,40,10);
   nube.velocityX=-3;
   nube.velocityY=0;
   nube.addImage(nubeImagen);
   nube.scale=0.5;
   nube.y=Math.round(random(20,80));
   nube.depth=trex.depth;
   trex.depth=trex.depth+1;
   nube.lifetime=210;
   grupoNube.add(nube);
 }
}

function spawnCactus(){
  if(frameCount%87===0){
    cactus=createSprite(600,170,10,40);
    cactus.velocityX=-(3+score/100);
    cactus.velocityY=0;
    cactus.depth=trex.depth;
    var alea=Math.round(random(1,6));
    
    switch (alea){
        case 1: cactus.addImage(kaktus1);
        break;
        
        case 2: cactus.addImage(kaktus2);
        break;
        
        case 3: cactus.addImage(kaktus3);
        break;
        
        case 4: cactus.addImage(kaktus4);
        break;
        
        case 5: cactus.addImage(kaktus5);
        break;
        
        case 6: cactus.addImage(kaktus6);
        break;
        
        default:break;
    }
    cactus.lifetime=230;
    cactus.scale=0.4;
    grupoCactus.add(cactus);
  }
}

function reset(){
 estadosDeJuego=PLAY;
  gameOver.visible=false;
  restart.visible=false;
  grupoNube.destroyEach();
  grupoCactus.destroyEach();
  
  trex.changeAnimation("running", trex_running);
  
  score=0;  
}

function dinos(){
  if(frameCount%261===0){
    pterodactilo=createSprite(600,100,40,10);
    pterodactilo.velocityX=-(2+score/100);
    pterodactilo.velocityY=0;
    pterodactilo.addImage(peterodactilo);
    pterodactilo.y=Math.round(random(130,160));
    pterodactilo.lifetime=230;
    pterodactilo.scale=0.12;
    grupoDino.add(pterodactilo);
  }
}