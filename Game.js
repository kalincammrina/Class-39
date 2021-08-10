class Game {
  constructor(){
   this.resetTitle = createElement('h2');
   this.restButton = createButton('');
   this.leaderBoardTitle = createElement('h2');
   this.leader1 = createElement('h2');
   this.leader2 = createElement('h2');
  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }



    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1, car2, car3, car4];
  }

  handleElements(){
    form.hide();
    form.titleImg.position(40,50);
    this.form.titleImg.class('gameTitleAfterEffect')
    this.resetTitle.html("resetGame")
    this.resetTitle.class(resetText)
    this.resetTitle.position(width/2+200,40)
    this.resetButton.class('resetButton');
    this.resetButton.position(width/2+230,100);

    this.leaderBoardTitle.html('leaderBoard');
    this.leaderBoardTitle.class('resetText');
    this.leaderBoardTitle.position('width/3-60+40');
    this.leader1.class(leadersText);
    this.leader1.position(width/3-50,80);

    this.leader2.class(leadersText);
    this.leader2.position(width/3-50,80);

  }


  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;
        var x = allPlayers[plr].positionX;
        var y = height-allPlayers[plr].positionY;

        //position the cars a little away from each other in x direction
        //use data form the database to display the cars in y direction
        cars[index-1].position.x = x;
        cars[index-1].position.y = y;

        if (index === player.index){
          stroke[10]
          fill["red"]
          ellipse(x, y, 60);
          camera.position.y = cars[index-1].position.y
      }
      this.handlePlayerControls();
    }
    drawSprites();
  }
  }
handleResetButton(){
  this.resetButton.mousePressed(()=>{
    database.ref("/").set({
      carsAtEnd:0,
      playerCount:0,  
      gameState:0,
      players:{}
    })
    windows.location.reload()
  })
}

showLeaderBoard(){
  var leader1, leader2
  var players = Object.values(allPlayers)
  if((
    players[0].rank === 0 && players[1] === 0)|| players[0].rank === 1
  )
  {
    leader1 = players[0].rank+'&emsp'+players[0].name+'&emsp'+players[0].score
    leader2 = players[1].rank+'&emsp'+players[1].name+'&emsp'+players[1].score
  }

  this.leader1.html(leader1)
  this.leader2.html(leader2)
}

 handlePlayerControls(){
if(keyIsDown(UP_ARROW)){
player.positionY +=10
player.update()

}
if(keyIsDown(LEFT_ARROW)&& player.positionX>width/3-50){
  player.positionX -=5 
  player.update();
}
if(keyIsDown(RIGHT_ARROW)&& player.positionX<width/2+300){
  player.positionX +=5
  player.update();
}
 }
}
