#pragma strict

//private variables that manage when the fader should fade in and out. By default, it is attached to a solid black guiTexture that covers the entire screen.
private var fadeIn = true;
private var fadeOut = false;
private var fastFadeOut = false;
private var gameOver = false;
//game over text that this finds and only shows when a message is received by the player that it died.
private var gameOverText:GameObject;
private var aboutMainCharText:GameObject;

function Start () {
	var permanentObjectManager = GameObject.Find("permanentobjects").GetComponent(permanentobjectmanager);
	
	//on start we set find the aboutmainchartext and gameovertext so its ready to be used if the player dies
	gameOverText = permanentObjectManager.gameOver;
	aboutMainCharText = permanentObjectManager.aboutMainChar;	
	
	//we make sure the guitexture is enabled before we fade in. this fader is attached to every scene so we have smooth looking transitions during scene changes.
	guiTexture.enabled = true;
}

function displayAboutJohnText () {
	fastFadeOut = true;
	guiTexture.enabled = true;
	aboutMainCharText.SetActive(true);
	//we wait for 2 seconds so the text can display for long enough before we disable the text again, and start the game over
	yield WaitForSeconds(10);
	aboutMainCharText.SetActive(false);
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
    	if(guiTexture.color.a < 0.4) {
        	guiTexture.color.a += Time.deltaTime;
        } else {
        	enableGameOver(); // FIX don't do every update
        	
        	// Get rid of the game over screen and reset the game on keypress
        	if (Input.GetKey("e") || Input.GetKey("space")) {
        		resetGame();
      		}
        }
        
    }
    
    //end of function update
}

function enableGameOver() {
	gameOverText.SetActive(true);
}

function resetGame() {
	gameOver = false;
	gameOverText.SetActive(false);
	PlayerPrefs.DeleteAll();
	Application.LoadLevel("playerhouse");
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
