

var PLAY=1;
var END=0;
var WIN=2;
var gameState=PLAY;




var score=0;
var coins=0;


var ground,invisibleGround,groundImg;

var isGameOver=false;






function preload(){

coinImg=loadImage("coin.png");
mario_running = loadAnimation("mario1.png","mario2.png");
mario_sad = loadAnimation("sadMario.jpg");
monsterImg=loadImage("monster.png")
monster2Img=loadImage("monster2.png")
monster3Img=loadImage("monster3.png")
monster4Img=loadImage("monster4.png")
monster5Img=loadImage("monster5.png")
monster6Img=loadImage("monster6.png")

backgroundImg=loadImage("background.png")
GameOverImg=loadImage("gameover.png")
groundImg=loadImage("ground.png")
restartImg=loadImage("restart.png")

bullet2Img=loadImage("bullet2.png")


coinImg=loadImage("coin.jfif")


dieSound=loadSound("die.wav")
jumpSound=loadSound("jump.wav")
coinSound=loadSound("coin.wav")
checkpointSound=loadSound("checkpoint.wav")
restartSound=loadSound("restart.wav")



}

function setup() {
 createCanvas(windowWidth,windowHeight)

  
 
 trex = createSprite(50,height-30,20,50);
  trex.addAnimation("running", mario_running);
  trex.addAnimation("collided", mario_sad);
  trex.setCollider('circle',0,0,350)
  trex.scale = 0.14
  trex.debug=false;
  

ground = createSprite(width/2,height,width,2);
  ground.addImage("ground",groundImg);
  ground.x = width/2
  ground.velocityX = -(6 + 3*score/100);
  
  

  gground=createSprite(width/2,height-10,width,125);
  gground.visible=false;
  gground.shapeColor = "green";
  gground.x = width/2
  

  gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(GameOverImg);
  
  restart = createSprite(750,400);
  restart.addImage(restartImg);

  boom = createSprite(50,height-100,20,50)
  boom.addImage(bullet2Img)
  boom.scale=0.3;

  
  gameOver.scale = 0.3;
  restart.scale = 0.2;

  gameOver.visible = false;
  restart.visible = false;
  boom.visible = false;
   
  monstersGroup = new Group();
  coinGroup = new Group();

  score=0;
  coins=0;



  
  
  

  
  
  


}

function draw() {
background(backgroundImg)
textSize(20);
  fill("black")

  text("Coins:"+ coins,30,50);
  text("You are Mario",1400,50);
  text("You have to dodge the monsters or else you will die!",1400,75)
  text("Press Space to Jump",1400,100)
  text("Collect ten coins to win the game",1400,125);
  text("The game progressively goes harder",1400,150)
  textSize(40)
  text("Enjoy the Game!!!",1400,200)


   
  
   
  if (gameState === PLAY){
    
  score = score + Math.round(getFrameRate()/60);
  ground.velocityX = -(6 + 3*score/100);

  
  trex.collide(gground);
  if(keyDown("space")&& trex.y  >= height-140) {
    trex.velocityY = -10;
    jumpSound.play();
    
  }


  trex.velocityY=trex.velocityY + 0.8


  if (ground.x < 0){
    ground.x = ground.width/2;
  }

  

  if(monstersGroup.isTouching(trex)){
    dieSound.play()
    gameState = END;
    
    
}
  
 }
  if(coinGroup.isTouching(trex)){
    coins+=1
    coinSound.play();
    coinGroup.destroyEach();
    
  }
  
    
 else if (gameState === END) {
   
  swal({
    title:"Game Over!",
    text:"Thanks for Playing!!",
    imageUrl:"https://i1.sndcdn.com/artworks-000186467828-vkyo25-t500x500.jpg",
    imageSize:"150x150",
    confirmButtonText:"Play Again"
  },
  function(isConfirm) {
    if (isConfirm) {
      location.reload();
     ;
    }
  } 
  )
  //gameOver.visible = true;
  //restart.visible = true;
  boom.visible=true;
  
  //set velcity of each game object to 0
  ground.velocityX = 0;
  trex.velocityY = 0;
  monstersGroup.setVelocityXEach(0);
  coinGroup.destroyEach();
  trex.destroyEach();
  
  
  //change the trex animation
  //trex.changeAnimation("collided",mario_sad);
  
  //set lifetime of the game objects so that they are never destroyed
  monstersGroup.setLifetimeEach(-1);
  

  
 }
  
 if(mousePressedOver(restart)) {
  reset();
  restartSound.play();
}


   







spawnMonsters();
spawnCoins();

if(coins >= 10){
  
  swal({
   title: "You Won!",
   text: "Good job you got ten coins....!!!",
   text:"Thanks For Playing",
   imageUrl:"https://monstervine.com/wp-content/uploads/2012/07/32.jpg",
   imageSize: "150x150",
   confirmButtonText:"Play Again"
   
  },
  function (isConfirm) {
    if (isConfirm) {
      location.reload();
    }
  }
  )
  ground.velocityX = 0;
  trex.velocityY = 0;
  monstersGroup.setVelocityXEach(0);
  coinGroup.destroyEach();
  trex.destroyEach();
 
  
  
  //change the trex animation
  //trex.changeAnimation("collided",mario_sad);
  
  //set lifetime of the game objects so that they are never destroyed
  monstersGroup.setLifetimeEach(-1);
  //fill("black");
  //text("Congratulations!! You win the game!!",500,430);
  //restart.visible=true;
   //set velcity of each game object to 0
   //ground.velocityX = 0;
   //trex.velocityY = 0;
   ///monstersGroup.setVelocityXEach(0);
   //coinGroup.destroyEach();
   
   
   //change the trex animation
   //trex.changeAnimation("collided",mario_sad);
   
   //set lifetime of the game objects so that they are never destroyed
   //monstersGroup.setLifetimeEach(-1);
  
}


drawSprites();
}



function spawnMonsters() {

  if(frameCount % 60 === 0) {
    var monster = createSprite(600,height-95,20,30);
    monster.setCollider('circle',0,0,45)
  
  
  
  
  monster.velocityX = -(6 + 3*score/150);
    
  var rand = Math.round(random(1,6));
  switch(rand) {
    case 1: monster.addImage(monsterImg);
            break;
    case 2: monster.addImage(monster2Img);
            break;
    case 3: monster.addImage(monster3Img);
            break;
    case 4: monster.addImage(monster4Img);
            break;
    case 5: monster.addImage(monster5Img);
            break;
    case 6: monster.addImage(monster6Img);
            break;
    case 7: monster.addImage(monster7Img);
    default: break;
}  
 
   

    
    
    //assign scale and lifetime to the obstacle           
    monster.scale = 0.40;
    monster.lifetime = 300;
    monster.depth = trex.depth;
    trex.depth +=1;
    //add each obstacle to the group
    monstersGroup.add(monster);
  

  
}
}
function spawnCoins(){ 
  if(frameCount%150=== 0){ 
      
          coin = createSprite(700,height-95,10,10); 
          coin.addImage("coin",coinImg); 
          coin.velocityX = -7
          coin.scale=0.15;
          coin.lifetime = 300; 
        
          coinGroup.add(coin); 
      }
  } 


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  boom.visible=false;
  
  monstersGroup.destroyEach();
  
  
  trex.changeAnimation("running",mario_running);
  
  score = 0;
  coins=0;
  
}


  

  
