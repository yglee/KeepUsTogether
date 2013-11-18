#pragma strict

//here are the 2 textures to make the door look like it opens and closes
var closedDoor:Texture;
var openDoor:Texture;
//here is the sound of the door when it opens and closes
var doorSound:AudioClip;

//if the player enters the collider, we change the texture to an open door, and play the door sound
function OnTriggerEnter (other : Collider) {
if(other.tag == "Player"){
	audio.PlayOneShot(doorSound);
	transform.parent.renderer.material.mainTexture = openDoor;
}
}

//if the player exits the collider, we change the texture to a closed door, and play the door sound
function OnTriggerExit (other : Collider){
if(other.tag == "Player"){
	audio.PlayOneShot(doorSound);
	transform.parent.renderer.material.mainTexture = closedDoor;
}
}