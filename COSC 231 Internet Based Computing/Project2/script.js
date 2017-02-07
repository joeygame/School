//create global variables and set their default values if needed
var playerX = 30;
var playerY = 30;
var direction = false;
var facing = 83;
var score = 0;
var health = 100.0;
var bulletX = 0;
var bulletY = 0;
var shooting = false;
var shotCountdown = 20;
var shootInt;
var allCells;
var display = new Array();
var zombieX = new Array();
var zombieY = new Array();
var zombieStat = new Array();
var chaseInt = 300;
var chaseChange = .99;

//create a 2d array that will be used as our "pixels"
for(var i=0;i<19;i++){
	display[i] = new Array();
}
var field = new Array();
for(var i=0;i<60;i++){
	field[i] = new Array();
}

//create a 2d array that is our game's map / field 
for(var i=0;i<60;i++){
	for(var j=0;j<60;j++){
		if(Math.random() > .8){
			field[i][j] = tile("wall");
			var coords = [i,j];
		} else {
			field[i][j] = tile("empty");
		}
	}
}

//set highscore in th cookies
function setHighScore(scoreValue) {
	if(scoreValue > getHighScore()){
		document.cookie = "highscore=" + scoreValue;
		alert("New Highscore!");
	}
}

//retrieve highscore value from cookie
function getHighScore(){
    var name = "highscore=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
			//alert(c.substring(name.length, c.length));
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

//this function spawns 20 zombies randomly on the field
function spawnZombie(){
  for(var i=0; i < 20; i++) {
    zombieX[i] = Math.floor(Math.random() * 60);
    zombieY[i] = Math.floor(Math.random() * 60);
    zombieStat[i] = true;
	field[zombieX[i]][zombieY[i]].occupying = "zombie";
  }
  zombieHandler();
}

//this function controls the movement of zombies
function zombieHandler(){
  for(var i=0; i < 20; i++) {
    field[zombieX[i]][zombieY[i]].occupying = "empty";
    field[zombieX[i]][zombieY[i]].live = "true";
    if(zombieX[i] > playerX && zombieY[i] > playerY) {
      if(Math.random() > 0.5) {
        zombieX[i]--;
      } else {
        zombieY[i]--;
      }
    } else if(zombieX[i] < playerX && zombieY[i] < playerY){
      if(Math.random() > 0.5) {
        zombieX[i]++;
      } else {
        zombieY[i]++;
      }
    } else if(zombieX[i] > playerX && zombieY[i] < playerY) {
      if(Math.random() > 0.5) {
        zombieX[i]--;
      } else {
        zombieY[i]++;
      }
    } else if (zombieX[i] < playerX && zombieY[i] > playerY) {
      if(Math.random() > 0.5) {
        zombieX[i]++;
      } else {
        zombieY[i]--;
      }
    } else if (zombieX[i] > playerX && zombieY[i] == playerY) {
      zombieX[i]--;
    } else if (zombieX[i] < playerX && zombieY[i] == playerY) {
      zombieX[i]++;
    } else if (zombieX[i] == playerX && zombieY[i] < playerY) {
      zombieY[i]++;
    } else if (zombieX[i] == playerX && zombieY[i] > playerY) {
      zombieY[i]--;
    }
	if(zombieX[i] == bulletX && zombieY[i] == bulletY && shooting == true){
		zombieX[i] = Math.floor(Math.random()*60);
		zombieY[i] = Math.floor(Math.random()*60);
		score = score + 500;
		shotCountdown=0;
		shooting = false;
	}
	if(zombieX[i] == playerX && zombieY[i] == playerY){
		health = health - 15;
		zombieX[i] = Math.floor(Math.random()*60);
		zombieY[i] = Math.floor(Math.random()*60);
	}
	field[zombieX[i]][zombieY[i]].occupying = "zombie";
  }
  if(chaseInt <75){
	  chaseChange = 1.01
  } else if (chaseInt > 200){
	  chaseChange = .99
  }
  chaseInt = chaseInt*chaseChange;
  setTimeout(zombieHandler, chaseInt);
}

function loadDisplay(){
	allCells = document.getElementsByTagName('td');
	var horiz = 0;
	var vert = 0;
	for(var i = 0; i<361; i++){
		display[horiz][vert] = allCells[i];
		horiz++;
		if(horiz>=19){
			horiz=0;
			vert++;
		}
	}
}

function beginGame(){
	setTimeout(loadDisplay, 200);
	setTimeout(spawnPlayer, 205);
	setTimeout(spawnZombie, 300);
	render = setInterval(runDisplay, 16.67);
	setInterval(moveMan, 60);
}

function scramble(){
	for(var i = 0; i<19; i++){
		for(var j = 0; j<19; j++){
			var colors = Math.floor(Math.random()*108);
			display[i][j].style.backgroundColor = "rgb(" + 256 + ","+colors+"," +  (colors+90) + ")";
		}
	}
}

function runDisplay(){
	var startX = playerX - 9;
	var startY = playerY - 9;
	var cX = startX;
	score++;
	for(var i=0;i<19;i++){
		for(var j=0;j<19;j++){
			if(startX >= 0 && startX <= 59 && startY >= 0 && startY <= 59){
				//display[j][i].innerHTML = startX+"x"+startY;
				if(field[startX][startY].occupying == "wall"){
					display[j][i].style.backgroundColor = "magenta";
					display[j][i].style.backgroundImage = "";
				}else if(field[startX][startY].occupying == "player"){
					if(facing == 83)
						display[j][i].style.backgroundImage = "url('downChar.jpg')";
					if(facing == 87)
						display[j][i].style.backgroundImage = "url('upChar.jpg')";
					if(facing == 68)
						display[j][i].style.backgroundImage = "url('rightChar.jpg')";
					if(facing == 65)
						display[j][i].style.backgroundImage = "url('leftChar.jpg')";
				}else if(field[startX][startY].occupying == "empty"){
					display[j][i].style.backgroundColor = "floralwhite";
					if((startX % 2) == 0)
						display[j][i].style.backgroundColor = "white";
					if((startY % 2) == 0)
						display[j][i].style.backgroundColor = "floralwhite";
					display[j][i].style.backgroundImage = "";
				}else if(field[startX][startY].occupying == "bullet"){
					display[j][i].style.backgroundImage =  "url('shot.jpg')";
				}else if(field[startX][startY].occupying == "zombie"){
					display[j][i].style.backgroundImage =  "url('zombie.jpg')";
				}
			} else {
				display[j][i].style.backgroundColor = "pink";
				display[j][i].style.backgroundImage = "";
			}
			startX++;
			if(startX>=cX+19){
				startX=cX;
			}
		}
	startY++;
	}
	document.getElementById("score").innerHTML = "Score: " + score + "<br />" + "Health: " + health + "<br />" + "Highscore: " + getHighScore();
	if(health<=0) {
		if(score > getHighScore())
			setHighScore(score);
		clearInterval(render);
	}
}

function moveMan(){
	var prevX = playerX;
	var prevY = playerY;

	field[playerX][playerY].occupying = "empty";

	//move in WASD direction
	if(direction == 68){
		playerX++;
	}else if(direction == 87){
		playerY--;
	}else if(direction == 83){
		playerY++;
	}else if(direction == 65){
		playerX--;
	}

	//if moving off screen [place back on screen]
	if(playerX>59){
		playerX = 59;
	} else if(playerX<0){
		playerX = 0;
	}

	if(playerY>59){
		playerY = 59;
	}else if(playerY<0){
		playerY = 0;
	}

	//dont let yourself walk on a wall
	if(field[playerX][playerY].occupying == "wall"){
		playerX = prevX;
		playerY = prevY;
	}

	for(var i=0; i<20; i++){
		if(zombieX[i] == playerX && zombieY[i] == playerY){
			health = health - 15;
			zombieX[i] = Math.floor(Math.random()*60);
			zombieY[i] = Math.floor(Math.random()*60);
		}
	}

	field[playerX][playerY].occupying = "player";
}

function spawnPlayer() {
	field[playerX][playerY].occupying = "player";
}

function keyPress(event) {
	if(event.keyCode == 83 || event.keyCode == 68 || event.keyCode == 65 || event.keyCode == 87){
		direction = (event.keyCode);
		facing = (event.keyCode);
	}

	if(event.keyCode == 37 || event.keyCode == 38 || event.keyCode == 39 || event.keyCode == 40){
		shoot(event.keyCode);
	}
}

function shoot(dir){
	if(!shooting){
		bulletX = playerX;
		bulletY = playerY;
		shooting=true;
		shootInt = setInterval(function(){bulletHandler(dir);},20);
	}
}

function bulletHandler(dir){
	shotCountdown--;

	for(var i = 0; i<20; i++){
		if(zombieX[i] == bulletX && zombieY[i] == bulletY){
			zombieX[i] = Math.floor(Math.random()*60);
			zombieY[i] = Math.floor(Math.random()*60);
			score = score + 500;
			shotCountdown=0;
		}
	}

	if(bulletX >= 60 || bulletX < 0 || bulletY >= 60 || bulletY < 0){
		countdown =0;
	} else {
		field[bulletX][bulletY].occupying = "empty";
	}
	if(dir==38){
		bulletY--;
	}else if(dir==37){
		bulletX--;
	}else if(dir==39){
		bulletX++;
	}else if(dir==40){
		bulletY++;
	}
	if(bulletX >= 60 || bulletX < 0 || bulletY >= 60 || bulletY < 0){
		shotCountdown = 0;
	} else {
		field[bulletX][bulletY].occupying = "bullet";
	}
	if(shotCountdown<=0){
		shotCountdown=20;
		clearInterval(shootInt);
		shooting = false;
		field[bulletX][bulletY].occupying = "empty";
	}
}

function keyRelease() {
	if(event.keyCode == direction){
		direction = false;
	}
}

function tile(inSpot){
	var tile = {
		occupying: inSpot,
		bullet: false,
		ignore: false
	}
	return tile;
}

document.addEventListener("keydown", keyPress);
document.addEventListener("keyup", keyRelease);
