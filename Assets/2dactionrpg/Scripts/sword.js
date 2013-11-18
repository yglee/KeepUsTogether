#pragma strict

var weaponDamage:float = 1;
//this is attached to the sword that is tagged as a weapon.

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;
}

function OnTriggerEnter (other : Collider) {
//if we hit an enemy we turn off the collider, so that it can't hit anything else or more than once.
if(other.tag == "enemy"){
collider.enabled = false;
other.BroadcastMessage("takeDamage", weaponDamage, SendMessageOptions.DontRequireReceiver);
}
}