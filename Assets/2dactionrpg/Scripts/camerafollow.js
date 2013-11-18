#pragma strict

// This script gets attached to the player. It will find the camera and make it follow. 
// Set Dead Zone to 0 if you want the camera to follow the player exactly.

var deadZone:float;
var followVertical = false;
var followHorizontal = true;

// The camera in the scene. It is private because it is dealt with in function Start()
private var target : GameObject;

function Start () {
//The variable cam will look for the Main Camera in the scene before the scene starts running and make it become the variable cam.
target = GameObject.Find("permanentobjects/Player");
}

function Update () {
if(target != null){
//If Follow Horizontal is checked in inspector, the camera follows player horizonally with the deadzone.
if(followHorizontal == true){
	if (transform.position.x >= target.transform.position.x + deadZone){
		transform.position.x = target.transform.position.x + deadZone;
	}
	if (transform.position.x <= target.transform.position.x - deadZone){
		transform.position.x = target.transform.position.x - deadZone;
	}
}

//If Follow Vertical is checked in inspector, the camera follows player vertically with the deadzone.
if(followVertical == true){
	if (transform.position.z >= target.transform.position.z + deadZone){
		transform.position.z = target.transform.position.z + deadZone;
	}
	if (transform.position.z <= target.transform.position.z - deadZone){
		transform.position.z = target.transform.position.z - deadZone;
	}
}
}
}