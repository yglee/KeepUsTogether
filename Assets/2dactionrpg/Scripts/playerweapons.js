#pragma strict

//here we access the playeranimation script. we do this so we can call functions in the playeranimation faster than sendmessage or broadcastmessage
var animScript:playeranimation;
//here we access playercontrols for the same reason as above.
var controlScript:playercontrols;

//here are the 3 weapons we use that we activate and deactivate. they are attached as children to the player.
var sword:GameObject;
var bow:GameObject;
var wand:GameObject;
//here are the 3 different sounds for each weapon.
var swordSound:AudioClip;
var bowSound:AudioClip;
var magicSound:AudioClip;

//we use these private variables to manage using weapons.
//we keep track of when we're attacking or not
private var attacking = false;
//we keep track of what direction we're attacking
private var direction:int = 0;
//we keep track of the current weapon we are using
private var curWeapon:GameObject;

function OnEnable () {
//if slotSet was never set (default for save prefs is 0, we set it to 1, which is sword.
if(PlayerPrefs.GetFloat("slotSet") == 0){
PlayerPrefs.SetFloat("slotSet", 1);
curWeapon = sword;
}
}

function Start () {
//We set the sword idstate to be 1 so it displays in the inventory and is ready to be used.
PlayerPrefs.SetFloat("sword", 1);
//on start we make sure sword is deactivated. we only activate it when we're attacking.
sword.SetActive(false);
}

function Update () {
//if we're not attacking, but the player presses spacebar, we get attacking stuff going.
if(attacking == false){
if(Input.GetKeyDown("space")){
animScript.strike();
controlScript.strike();
strike();
}
}
}

//we get the direction from the animation script.
function getDir (dir : int){
direction = dir;
}

//when we strike with a weapon, we figure out which weapon we're using, then activate it
function strike () {
attacking = true;

//if slotSet is 1, we use the sword
if(PlayerPrefs.GetFloat("slotSet") == 1){
	//we set curWeapon to sword
	curWeapon = sword;
	//set the direction the sword will go
	useDir();
	//then activate the sword
	sword.SetActive(true);
	//then make sure the swords collider is enabled
	sword.collider.enabled = true;
	//then play the sword sound.
	audio.PlayOneShot(swordSound);
}
//if slotSet is 2, we use the bow
if(PlayerPrefs.GetFloat("slotSet") == 2){
	//we set curWeapon to bow
	curWeapon = bow;
	//set the direction the bow will go
	useDir();
	//activate the bow
	bow.SetActive(true);
	//then send a message to the bow to make sure it resets and does its thing. the bow manages the actual shooting of an arrow.
	bow.SendMessage("resetBow", SendMessageOptions.DontRequireReceiver);
	//then we play the bow sound.
	audio.PlayOneShot(bowSound);
}
//if slotSet is 3, we use the wand
if(PlayerPrefs.GetFloat("slotSet") == 3){
	//we set curWeapon to wand
	curWeapon = wand;
	//set the direction the wand will go
	useDir();
	//activate the wand,
	wand.SetActive(true);
	//then send a message to the wand to shoot a magic shot. the wand manages the shooting of a magic shot.
	wand.SendMessage("magicShot", SendMessageOptions.DontRequireReceiver);
	//then we play the wand sound
	audio.PlayOneShot(magicSound);
}
//if slotSet is 4, we check to see if a potion is available. its easier to manage using potions here because everything for spacebar is managed here.
if(PlayerPrefs.GetFloat("slotSet") == 4){
//if we havea potion and its not 0, we do stuff
if(PlayerPrefs.GetFloat("potion") > 0){
//we subtract the potions by 1
PlayerPrefs.SetFloat("potion", PlayerPrefs.GetFloat("potion")-1);
//then we broadcast a message that playerhealth will receive and give us full health.
BroadcastMessage("fullHealth", SendMessageOptions.DontRequireReceiver);
}
//if we don't have any more potions, we make that slot disappear in inventory.
if(PlayerPrefs.GetFloat("potion") == 0){
var tempSelect = GameObject.Find("GUI/itemselected");
tempSelect.guiTexture.texture = null;
}
}

if(PlayerPrefs.GetFloat("slotSet") == 5){
//your code goes here
}

//we wait for 0.25 seconds before we do more, because thats how long we make attacks take.
yield WaitForSeconds(0.25);
//after 0.25 seconds, we are no longer attacking so we set attacking to false
attacking = false;
//then deactivate the weapon we just used. curWeapon is set to the last object we just used.
curWeapon.SetActive(false);
}

//here we set the direction of the weapon that we're using
function useDir () {
//1-4 is a direction received from the animation script, up down left or right.
//then we set the rotation and position of the weapon based on direction so it matches up with the player using. we do this so we only have to use one object instead of 4 for each weapon.
if(direction == 1){
	curWeapon.transform.localPosition = Vector3(-1.375,-0.312,transform.position.z);
	curWeapon.transform.localRotation = Quaternion.Euler(0,0,270);	
}
if(direction == 2){
	curWeapon.transform.localPosition = Vector3(1.375,-0.313,transform.position.z);
	curWeapon.transform.localRotation = Quaternion.Euler(0,0,90);	
}
if(direction == 3){
	curWeapon.transform.localPosition = Vector3(-0.4375,0.625,transform.position.z);
	curWeapon.transform.localRotation = Quaternion.Euler(0,0,180);
}
if(direction == 4){
	curWeapon.transform.localPosition = Vector3(0.5,-1.375,transform.position.z);
	curWeapon.transform.localRotation = Quaternion.Euler(0,0,0);
}
}