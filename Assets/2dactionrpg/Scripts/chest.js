#pragma strict
//here we set an ID for the chest. the ID is used to save it as a playerprefs. It can't have the same ID as another playerprefs. chest1, chest2, etc. works well.
var chestId:String;
//here we set up what object we want to come out of the chest
var treasure1:GameObject;
//here we set how many of that object we want to come out
var t1Quantity:int = 1;
//here is an optional second object
var treasure2:GameObject;
//here is the optional second object quantity, just like the first object
var t2Quantity:int = 1;
//here are the 2 textures to animate the chest
var chestOpen:Texture;
var chestClosed:Texture;

//here we use this variable to determine whether the chest is opened or not.
private var canCollect = true;

function Start () {
//if the playerpref we set as the id is 0, (0 is default if never used before), we make the chest openable when the scene is loaded.
if(PlayerPrefs.GetFloat(chestId) == 0){
	canCollect = true;
	transform.parent.renderer.material.mainTexture = chestClosed;
//if its not 0 then we change it so its not openable and the texture is set to the open texture.
}else{
	canCollect = false;
	transform.parent.renderer.material.mainTexture = chestOpen;
	transform.parent.localPosition.y = -transform.position.z/10000+0.5;
}
//end of function start
}

//here we use a trigger collider to check to see if the player is in the collider where he can open the chest.
function OnTriggerStay (other : Collider) {
//here we check to see if the player pressed e to open it and it is in fact the player that is there.
if(Input.GetKeyDown("e") && other.name == "Player"){
	//if its openable, we start the function to spawn the quantity of object one if the quantity is greater than 0
	if(canCollect == true){
		if(t1Quantity > 0){
			giveTreasureOne();
		}
		//then we also start the quantity of object 2 if quantity is greater than 0
		if(t2Quantity > 0){
			giveTreasureTwo();
		}
		//we set the canCollect to false so it can't spawn objects again.
		canCollect = false;
		//we set the playerpref that is forever saved so it can't be opened if they go back to the scene the chest is in (unless the playerprefs are deleted by clicking new game)
		PlayerPrefs.SetFloat(chestId, 1);
		//here we set the texture to make it look like the chest was opened.
		transform.parent.renderer.material.mainTexture = chestOpen;
		//this is a workaround that pauses OnTriggerStay for a bit so we can set the position of the chest to a point where the player can look like he's behind it if he goes behind it.
		yield WaitForSeconds(0.5);
		transform.parent.localPosition.y = -transform.position.z/10000+0.5;
	}
}

}

//this function is started when the chest is opened and will loop until the quantity for the first item hits 0
function giveTreasureOne () {
if(t1Quantity > 0){
	Instantiate(treasure1, transform.position, Quaternion.Euler(-90,180,0));
	t1Quantity -= 1;
	giveTreasureOne();
}
}

//this function is started when the chest is opened and will loop until the quantity for the second item hits 0
function giveTreasureTwo () {
if(t2Quantity > 0){
	Instantiate(treasure2, transform.position, Quaternion.Euler(-90,180,0));
	t2Quantity -= 1;
	giveTreasureTwo();
}
}