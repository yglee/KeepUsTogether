#pragma strict

//this script is so that we can allow different objects to look like they're above or behind, depending on the position of the object.
//for example, if the player on the z plane is below a wall, we want his head to be above the texture. this script sets the y position based on z to achieve this.
//its more simple than it might look!

//we have a true-false statment set up so we can set the position to non-moving objects only once. If the object does move, don't have isStatic on. This can be changed in the inspector.
var staticPosition = true;

function Start () {
//on start we set the y position based on z plane. it is divided by 10000 so there is very little chance that the player will go below the ground which is at 0.
transform.position.y = -transform.position.z/10000+0.5;
//if static is in fact true in the inspector, we take away this script so it doesn't keep updating during play.
if(staticPosition == true){
Destroy(this);
}
}

function Update () {
//if this script isn't destroyed because its attached to an object that moves, then we allow the position to keep updating.
transform.position.y = transform.parent.position.y;
}