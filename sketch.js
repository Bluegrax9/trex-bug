var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;

var obstacles, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var newImage;

var score;

var obstaclesGroup, cloudsGroup;

var PLAY=1;

var END=0;

var gamestate=PLAY;

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
 
}

function setup() {
  createCanvas(600, 200);

  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided",trex_collided);
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  //ground.velocityX = -4;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  cloudsGroup = new Group();
  
  console.log("Hola"+ "Abril"); 
  trex.setCollider("circle",0,0,35);
  trex.debug=false;
  score = 0;
  
}

function draw() {
  background(180);
  
  text("puntuaje: "+ score,500,50);
  //score = score + Math.round(frameCount % 60);
  
  if(gamestate===PLAY){
    ground.velocityX = -4;
    score = score + Math.round(frameCount % 60);
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >= 160) {
      trex.velocityY = -10;
    }
    trex.velocityY = trex.velocityY + 0.8
    spawnClouds();
    spawnObstacles();
    if(obstaclesGroup.isTouching(trex)){
      gamestate=END;
    }
  }
  else if(gamestate===END){
    ground.velocityX = 0;
    trex.changeAnimation("collided",trex_collided);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
   
  trex.collide(invisibleGround);
  
  drawSprites();
}

function spawnClouds() {
  //escribir aquí el código para aparecer las nubes
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.addImage(cloudImage)
    cloud.y = Math.round(random(10,60))
    cloud.scale = 0.4;
    cloud.velocityX = -3;
    
    
    //asignar tiempo de vida a una variable
    cloud.lifetime = 200;
  
    
    //ajustar la profundidad
    cloud.depth = trex.depth
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
    }
}

function spawnObstacles() {
if (frameCount % 60 === 0){
obstacles = createSprite(600,165,10,40);
obstacles.velocityX = -6;
obstacles.lifetime = 100;
//generar nuestros obstaculos
var rand = Math.round(random(1,6));
switch(rand){
case 1: obstacles.addImage(obstacle1);
  break;
case 2: obstacles.addImage(obstacle2);
  break;
case 3: obstacles.addImage(obstacle3);
  break;
case 4: obstacles.addImage(obstacle4);
  break;
case 5: obstacles.addImage(obstacle5);
  break;
case 6: obstacles.addImage(obstacle6);
  break;
default: break;
}
obstacles.scale= 0.5;

obstaclesGroup.add(obstacles);

}

}