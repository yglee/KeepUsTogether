#pragma strict

//here is a private object that we'll set as the player in start
private var target:GameObject;

function Start () {
//once this script starts (when a heart exists) we find the player so we can have it move towards the player
target = GameObject.Find("Player");
//here we add a bit of force at the beginning to help give the heart a nice little animation once it is spawned
rigidbody.AddForce(Random.Range(-600,600),0,Random.Range(-600,600));
}

function Update () {

//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

//before we do anything, we just check to see if the target is not null. this helps avoid any unwanted errors
if(target != null){
//here we check the square distance so we can see how close the player is to the object.
var sqrDistance = (target.transform.position - transform.position).sqrMagnitude;
//if the square distance is less than 16, we'll let the heart do stuff.
if (sqrDistance <= 16){
//before we can get the heart to move towards the player, we want to find the direction
var dir = target.transform.position - transform.position;
dir = dir.normalized;
//now we apply force towards the player using the variable dir (aka direction).
rigidbody.AddForce(dir * 3000 * Time.deltaTime);
}
}
}