#pragma strict

//this magic object is the magic flame thing that shoots out of the wand. we manage it here.
var magic:GameObject;
//we set the speed of the magic flame thing here. this can be accessed in the inspector.
var magicSpeed:float = 16.0;

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;
}

function magicShot () {
//when the playerweapons script activates the wand and sends the magicShot message, we spawn a magic flame thing and add speed to it.
var magicPrefab = Instantiate(magic, Vector3(transform.position.x,0.5,transform.position.z), Quaternion.Euler(-90,transform.localEulerAngles.z+180,0));
magicPrefab.rigidbody.velocity = magicPrefab.transform.up*-magicSpeed;
}