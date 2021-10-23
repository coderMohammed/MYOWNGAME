var boyImage,boy;
var treasure,treasureImage,treasureGroup;
var bullet,bulletImage,bulletGroup;
var bg,bgImg;
var bg2,bg2Img
var BEGIN = 0,LEVEL1 = 1,LEVEL2 = 2,END = 3;
var gameState = LEVEL2;
var isLevel1 = false;
var isLevel2 = false;
var wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8;
var enemy1,enemy2,enemyImg1,enemyImg2;
var lives = 3
var invisibleGround;
var PLAY = 0;
var gameStateL2 = PLAY;
var score = 0;

function preload(){
  boyImage = loadImage("Running.gif");
  treasureImage = loadImage("unnamed (1).png");
  bulletImage = loadImage("bullet.png");
  bgImg = loadImage("L1.gif");
  bg2Img = loadImage("BG2.jpeg")
  enemyImg1 = loadImage("CV.png")
  enemyImg2 = loadImage("CV2.png")

}

function setup() {
  createCanvas(600,600);
  boy = createSprite(80,550);
  boy.addImage("run",boyImage);
  boy.scale = 0.2;
  boy.debug = true;
  boy.setCollider("rectangle",0,0,250,350);

  treasure = createSprite(550,445);
  treasure.addImage("levelComplete",treasureImage);
  treasure.scale = 0.2;

  bulletGroup = new Group();
  treasureGroup = new Group();
  
}

function draw() 
{ 

  background("green");
  if(gameState === BEGIN){
    textSize(30);
    text("Press S to start",200,200);
    
    if(keyDown("s")){
      gameState = LEVEL1;
    }
  }

  else if(gameState === LEVEL1){
    
    if(!isLevel1){
      isLevel1 = true;
      createWalls();
      createEnemy();
    }
    

    enemy2.bounceOff(wall2)
    enemy1.bounceOff(wall2)

    enemy2.bounceOff(wall4)
    enemy1.bounceOff(wall4)

    if(boy.collide(treasure)){
      boy.velocityX = 0;
      boy.velocityY = 0;
      treasure.destroy();
      boy.destroy();
      bg = createSprite(310,250);
      bg.addImage("newLevel",bgImg);
      bg.scale = 0.78; 
      
      setTimeout(()=>{
        bg.destroy();
        wall1.destroy();
        wall2.destroy();
        wall3.destroy();
        wall4.destroy();
        wall5.destroy();
        wall6.destroy();
        wall7.destroy();
        wall8.destroy();
        enemy1.destroy();
        enemy2.destroy();
        treasure.destroy();
        gameState = LEVEL2;
        },3000);


        
     
    }

    if(boy.isTouching(enemy1)||boy.isTouching(enemy2)){
        lives -=  1;
        if(lives === 0){
          treasure.destroy()
          wall1.destroy();
          wall2.destroy();
          wall3.destroy();
          wall4.destroy();
          wall5.destroy();
          wall6.destroy();
          wall7.destroy();
          wall8.destroy();
          enemy1.destroy();
          enemy2.destroy();
          boy.destroy();
          gameState = END;
        }
        boy.x = 80;
        boy.y = 550;
    }

    

    boy.collide(wall1);
    boy.collide(wall2);
    boy.collide(wall3);
    boy.collide(wall4);
    boy.collide(wall5);
    boy.collide(wall6);
    boy.collide(wall7);
    boy.collide(wall8);


    playerControls();
  }
  else if(gameState === LEVEL2){
  
    if(keyDown("space")){
      boy.velocityY = -15;
    }
    
    if(!isLevel2){
      isLevel2 = true;
      //bg.destroy();
      treasure.destroy();
      bg2 = createSprite(200,200);
      bg2.addImage("levelStart",bg2Img);
      bg2.scale = 2.2
      boy.depth = bg2.depth+1;
      boy.y = 325
      invisibleGround = createSprite(80,400,100,20);
      invisibleGround.visible = false;
    }
    

    if(frameCount%150===0){
      spawnBullets()
    }

    if(frameCount%80===0){
      spawnTreasure()
    }
    boy.collide(invisibleGround);

    boy.velocityY += 0.8;

     bg2.velocityX = -2
    if(bg2.x <= 0){
      bg2.x = width/2
    }
    console.log(bulletGroup)
    
      if(boy.isTouching(bulletGroup)){
        lives -= 1;
        bulletGroup.destroyEach();
        if(lives===0){
          gameState=END;
        }
      }
  

  }
  else if(gameState === END){ 
    console.log("END")
  }




  drawSprites();

  fill("red");
  textSize(20);
  text("LIVES: "+lives,40,50);
}

function playerControls(){
  if(keyDown(UP_ARROW)){
    boy.y -= 15;
  }
  
  if(keyDown(DOWN_ARROW)){
    boy.y += 15;
  }
  
  if(keyDown(LEFT_ARROW)){
    boy.x -= 15;
  }
  
  if(keyDown(RIGHT_ARROW)){
    boy.x += 15;
  }
  
 
  

}

function createWalls(){
  wall1 = createSprite(20,20,20,1160);

  wall2 = createSprite(280,10,20,500);
  wall2.rotation = 90;

  wall3 = createSprite(130,400,20,460);

  wall4 = createSprite(245,160,20,250);
  wall4.rotation = 90;

  wall5 = createSprite(380,325,20,350);

  wall6 = createSprite(525,490,20,305);
  wall6.rotation = 90;

  wall7 = createSprite(540,176,20,350);

  wall8 = createSprite(590,341,20,80);
  wall8.rotation = 90;
}

function createEnemy(){
  enemy1 = createSprite(200,60);
  enemy1.addImage("enemy1",enemyImg1);
  enemy1.scale = 0.03;
  enemy1.velocityY = -4;
  enemy1.debug = true;

  enemy2 = createSprite(350,60);
    enemy2.addImage("enemy2",enemyImg2);
    enemy2.scale = 0.03;
    enemy2.velocityY = -4;
    enemy2.debug = true;

    
}

function spawnBullets(){
  bullet = createSprite(610,200,50,50);
  bullet.velocityX = -4
  bullet.y = Math.round(random(250,350))
  bullet.addImage("shoot",bulletImage);
  bullet.rotation = 180;
  bullet.scale = 0.1;
  bullet.lifetime = 610/4;
  bulletGroup.add(bullet);
}

function spawnTreasure(){
  treasure = createSprite(610,200,50,50);
  treasure.velocityX = -4
  treasure.y = Math.round(random(250,350))
  treasure.addImage("treasure",treasureImage);
  treasure.scale = 0.1;
  treasure.lifetime = 610/4;
  treasureGroup.add(treasure);
}