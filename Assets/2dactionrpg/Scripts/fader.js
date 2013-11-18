#pragma strict

//private variables that manage when the fader should fade in and out. By default, it is attached to a solid black guiTexture that covers the entire screen.
private var fadeIn = true;
private var fadeOut = false;
private var fastFadeOut = false;
private var gameOver = false;
//game over text that this finds and only shows when a message is received by the player that it died.
private var gameOverText:GameObject;

function Start () {
//on start we set find the gameovertext so its ready to be used if the player dies
gameOverText = GameObject.Find("permanentobjects/GUI/youdiedtext");
//we make sure the guitexture is enabled before we fade in. this fader is attached to every scene so we have smooth looking transitions during scene changes.
guiTexture.enabled = true;
}

function Update () {
//if fade in is true, we want the alpha channel of the guitexture to be subtracted. this will make the black texture more transparent over time until its invisible.
if(fadeIn == true){
	guiTexture.color.a -= Time.deltaTime/2;
	//if the alpha channel is equal to or less than 0, we turn the fadein state to false, disable the guiTexture, and make sure alpha is set to exactly zero.
	if(guiTexture.color.a <= 0.0){
		fadeIn = false;
		guiTexture.enabled = false;
		guiTexture.color.a = 0.0;
	}
}
//if fastFadeOut is true, we want to add alpha back to the black texture to make a fadeout look. this is turned on by a message received that the function FastFadeOut below triggers.
if(fastFadeOut == true){
	guiTexture.color.a += Time.deltaTime*2;
	if(guiTexture.color.a >= 0.5){
		fadeOut = false;
	}
}
//if gameOver is true, we do a similar fadeout as fastfade out then call the function resetGame(); below to add the game over text, and load the player house scene to start the game over.
if(gameOver == true){
	guiTexture.color.a += Time.deltaTime;
	if(guiTexture.color.a >= 0.5){
		gameOver = false;
		resetGame();
	}
}

//end of function update
}

//if we receive a message named FastFadeOut, we set fastfadeout to true and make sure the guiTexture is enabled.
function FastFadeOut() {
fastFadeOut = true;
guiTexture.enabled = true;
}

//if we receive a message named setGameOver, we set gameOver to true and make sure the guiTexture is enabled.
function setGameOver() {
gameOver = true;
guiTexture.enabled = true;
}

//once the fader fades out through gameOver = true, we do some stuff to reset the game.
function resetGame() {
//here we set the text to be enabled.
gameOverText.guiText.enabled = true;
//we wait for 2 seconds so the text can display for long enough before we disable the text again, and start the game over
yield WaitForSeconds(2);
gameOverText.guiText.enabled = false;
//here we load the playerhouse scene to start the game over.
Application.LoadLevel("playerhouse");
}