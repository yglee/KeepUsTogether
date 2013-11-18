#pragma strict

//here is the scene name that we want the door to load when entered
var sceneName:String;
//here is the position we want to the player to be when the new scene is loaded
var teleportX:float;
var teleportZ:float;

//when the player hits the door collider, we want load the new scene and do a couple other things
function OnCollisionEnter (other : Collision) {
if(other.collider.tag == "Player"){
	//here we find the fader
	var fader = GameObject.Find("fader");
	//then tell the fader to fade out before the new scene loads
	fader.BroadcastMessage("FastFadeOut", SendMessageOptions.DontRequireReceiver);
	//we wait for a quarter of a second before we teleport the player to the new position, then load the new scene
	yield WaitForSeconds(0.25);
	//here we teleport the player
	other.transform.position.x = teleportX;
	other.transform.position.z = teleportZ;
	//then low the scene we want.
	Application.LoadLevel(sceneName);
}
}