#pragma strict

//here we hold the 3 different guitextures for the hearts on the top of the screen so we can change them when health changes.
var heart1:GUITexture;
var heart2:GUITexture;
var heart3:GUITexture;
//here are the 3 textures that change the hearts to empty, half, or whole
var whole:Texture;
var half:Texture;
var empty:Texture;
//here are the 2 sounds for getting hurt and getting a heart
var hurtSound:AudioClip;
var heartSound:AudioClip;

//here's the player's health.
private var health:int;
//here's the color counter that manages how long the player is changed color when hurt.
private var colorCounter:float = 0.0;

//when a level was loaded we check up on health. 
function OnLevelWasLoaded () {
//when the player dies the volume goes to 0 so if this is 0 when a level was loaded that means he died and we need to reset some things.
if(audio.volume == 0){
//make sure the drags back to 0
rigidbody.drag = 0;
//give the player full hearts again,
health = 6;
//update the hearts so the guitexture displays the right amount
updateHearts();
//set the volume for the audio source attached back to 0.3
audio.volume = 0.3;
}else{
//if volume wasn't zero (the player didn't die... thats just how we're checking..) we just make sure hearts are updated 
updateHearts();
}
}

//on start, we set up health to be the last saved heart amount with playerHealth.
function Start () {
health = PlayerPrefs.GetFloat("playerHealth");
//if it equaled 0 (player died or this is the first time they opened the game or clicked new game)
if(health == 0){
//we set the hearts to full health.
health = 6;
//save it to playerprefs
PlayerPrefs.SetFloat("playerHealth", health);
}
//then update the guitextures so they match how much health the player has.
updateHearts();
}

function Update () {
//if the players material color is not normal (we just check the red channel to see) we need to keep track of how long so we can switch it back at a certain point.
if(renderer.material.color.r != 1){
//if the color was changed because the player was hurt, we keep track of time with colorcounter
colorCounter += Time.deltaTime;
//at 1/3 of a second, we will switch the colors back to where they need to be.
if(colorCounter > 0.33){
//only the red and green channel need to be switched back because thats all that was changed.
renderer.material.color.r = 1;
renderer.material.color.g = 1;
}
}

//if health is 0 or less somehow, and volume hasn't been switched yet, we do some stuff to prepare the death scene stuff.
if(health <= 0 && audio.volume != 0){
//first we make the players drag a lot just to make him not be able to move really without messing up the rigidbody.
rigidbody.drag = 1000;
//then we set the audio to 0 so no sounds come from him anymore. we also use volume to check if death happened at the top of the script, just an easy way to keep track since this is the only time volume for the player is changed, on death.
audio.volume = 0;
//now we call the function prepDeath to do more stuff.
prepDeath();
}

//end of function update
}

//on collision with another object, we check to see if its tagged as an enemy.
function OnCollisionStay (other : Collision) {
//if object was an enemy, and our color is normal (we can just use this to see if we were hurt within the last 1/3 of a second) we do stuff.
if(other.collider.tag == "enemy" && renderer.material.color.r == 1){
//of course we take health away,
health -= 1;
//play the hurt sound,
audio.PlayOneShot(hurtSound);
//change the material color of the player (which is changed back in update above if you read it)
renderer.material.color.r = 0.6;
renderer.material.color.g = 0.6;
//reset the colorcounter
colorCounter = 0.0;
//then update the guitextures so our health is displaying to the player accurately.
updateHearts();
}
//end of oncollisionenter
}

//we check triggers in health too to see if we grabbed a heart. this is the easiest place to check that so we don't have to send messages anywhere.
function OnTriggerEnter (other : Collider) {
//if the tag of the trigger is in fact heart, we do stuff.
if(other.tag == "heart"){
//we destroy the heart,
Destroy(other.gameObject);
//play the heart sound,
audio.PlayOneShot(heartSound);
//add 2 health which equals a full heart,
health += 2;
//then update the heart guitextures to display them accurately to the player.
updateHearts();
}
}

//if we used a potion, then this function is called by a sent message from the playerweapons which manages the potion.
function fullHealth () {
//we set hearts to exactly 6, since thats full health.
health = 6;
//play the heart sound.
audio.PlayOneShot(heartSound);
//then update the guitextures to make sure they display accurately to the player.
updateHearts();
}

//here is where we manage the heart guitextures that always display on the top of the screen. we need them to be updated whenever anything health related happens.
function updateHearts () {
//first we check to make sure the player doesn't have more than max health. if so we reset it to full health.
if(health > 6){
health = 6;
}

//now we check how much health the player has, then update the guitextures accordingly.
if(health == 6){
heart1.guiTexture.texture = whole;
heart2.guiTexture.texture = whole;
heart3.guiTexture.texture = whole;
}
if(health == 5){
heart1.guiTexture.texture = whole;
heart2.guiTexture.texture = whole;
heart3.guiTexture.texture = half;
}
if(health == 4){
heart1.guiTexture.texture = whole;
heart2.guiTexture.texture = whole;
heart3.guiTexture.texture = empty;
}
if(health == 3){
heart1.guiTexture.texture = whole;
heart2.guiTexture.texture = half;
heart3.guiTexture.texture = empty;
}
if(health == 2){
heart1.guiTexture.texture = whole;
heart2.guiTexture.texture = empty;
heart3.guiTexture.texture = empty;
}
if(health == 1){
heart1.guiTexture.texture = half;
heart2.guiTexture.texture = empty;
heart3.guiTexture.texture = empty;
}
if(health <= 0){
heart1.guiTexture.texture = empty;
heart2.guiTexture.texture = empty;
heart3.guiTexture.texture = empty;
}

//after we update the hearts, we update the saved variable that will be loaded when the player turns the game back on and presses continue.
PlayerPrefs.SetFloat("playerHealth", health);

//end of updateHearts();
}

//if the player has 0 health this is called.
function prepDeath () {
//we reset the hearts, so when the new scene is loaded he's full health again.
health = 6;
//we find the fader
var findFader = GameObject.Find("fader");
//then tell the fader to do a specific death fade animation that will turn the "You Died" text on when it fully fades out
findFader.BroadcastMessage("setGameOver", SendMessageOptions.DontRequireReceiver);
//we wait for 1.5 seconds so the fader has mostly faded out before we update the hearts.
yield WaitForSeconds(1.5);
//then we update the hearts
updateHearts();
//now we move the player into the position he needs to be in when playerhouse scene is loaded.
transform.position = Vector3(-2.5,0.5,3.5);
}