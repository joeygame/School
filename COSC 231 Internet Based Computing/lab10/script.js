function beginRandomness(table){
	var cells = table.getElementsByTagName('td');
	randomizeCellColor(cells, cells.length);
	setInterval(function(){randomizeCellColor(cells, cells.length);},50);
}

function randomizeCellColor(cells, numOf){
	for(var i = 0;i<numOf;i++){
		if(!cells[i].dontRun){
			cells[i].style.backgroundColor =
			"rgb(" + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + "," + getRandomInt(0, 255) + ")";
		}
	}
}

//function taken from MDN 
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
	var min = Math.ceil(min);
	var max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}

function clickTd(event){
	event.dontRun = !event.dontRun;
}