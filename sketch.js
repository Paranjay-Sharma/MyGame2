var fighter,fighterImg;
var zombie1,zombie2,zombie1Img,zombie2Img,zombiehut,zombiehutImg;
var cross,crossImg;
var zone;
var bgImg;
var bullet,bulletImg,bulletGroup;
var score=0;
var gamestate="start";

function preload(){
fighterImg=loadImage("images/fighter.png");
bgImg=loadImage("images/ground.jpeg");
crossImg=loadImage("images/cross.png");
zombie1Img=loadAnimation("images/zombie10.png","images/zombie11.png","images/zombie12.png","images/zombie13.png");
zombie2Img=loadAnimation("images/zombie20.png","images/zombie21.png","images/zombie22.png","images/zombie23.png");
zombiehutImg=loadImage("images/hut.png");
bulletImg=loadImage("images/bullet.png");
}

function setup(){
canvas=createCanvas(1200,400);

bulletGroup=new Group();
zombieGroup1=new Group();
zombieGroup2=new Group();
}

function draw(){
if(gamestate=="start"){
    background("white")
    fill("black")
    textSize(20);
    text("press[enter]to start the game",width/2,height/4-20);
    textSize(40);
    text("Rules:",width/2-50,height/4+10);
    textSize(18);
    text("1.Press [Space] to fire on zombies",width/2-50,height/4+20);
    text("2.Press [UP]&[DOWN] arrows to move the fighter",width/2-50,height/4+35);

    if(keyDown("enter")){
        gamestate="play";
    }
}
else if(gamestate=="play"){
    background(bgImg);
    zone=createSprite(100,200,200,400);
    zone.shapeColor="aqua";


    fighter=createSprite(130,200);
    fighter.addImage(fighterImg);
    fighter.scale=0.3;


    cross=createSprite(50,200);
    cross.addImage(crossImg);
    cross.scale=0.5;


    zombiehut=createSprite(1120,200);
    zombiehut.addImage(zombiehutImg);

    if(keyDown("down_arrow")){
        fighter.y=fighter.y+5;
        }
        if(keyDown("up_arrow")){
        fighter.y=fighter.y-5;
        }
        
    if(keyDown("space")&& frameCount%20===0){

        bullet=createSprite(530,200);
        bullet.x=fighter.x+25;
        bullet.y=fighter.y-11;
        bullet.velocityX=10;
        bullet.addImage(bulletImg);
        bullet.scale=0.05;
        bulletGroup.add(bullet);
    // bullet.debug=true;
    }
    if(frameCount%100===0){
        zombie1=createSprite(800,300);
    zombie1.addAnimation("standing",zombie1Img);
    zombie1.velocityX=-(4+score/20);
    zombie1.y=Math.round(random(100,400))
    zombie1.scale=0.4
    zombieGroup1.add(zombie1);
    //zombie1.debug=true;
    }
    if(frameCount%60===0){
        zombie2=createSprite(1000,300);
    zombie2.addAnimation("standing",zombie2Img);
    zombie2.velocityX=-(4+score/20);
    zombie2.y=Math.round(random(100,300));
    zombie2.scale=0.4;
    zombie2.lifetime=300;
    zombieGroup2.add(zombie2);
    //zombie2.debug=true;
    }
    if(bulletGroup.isTouching(zombie1)){
        zombieGroup1.destroyEach();
        score=score+1;
    }
    if(bulletGroup.isTouching(zombie2)){
    zombieGroup2.destroyEach();
    score=score+1; 
    }
    if(zombieGroup1.isTouching(zone)||zombieGroup2.isTouching(zone)){
        zone.shapeColor="green"
    }
    fill("red")
    strokeWeight(10)
    textSize(20);
    text("Zombies Dead:"+score,700,50);
}
drawSprites();
}