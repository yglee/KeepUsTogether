#pragma strict

var weaponDamage:float = 1;
//we set up a variable for life counter so we can keep track of how long the magic has existed
private var lifeCounter:float = 0.0;

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

//we add time to the life counter so it can actually track time.
lifeCounter += Time.deltaTime;

//if the life counter gets to 3 seconds, we destroy it. this means it didn't hit anything in that span of time so we want to make sure it can't go forever... just in case.
if(lifeCounter > 3){
Destroy(gameObject);
}
}

function OnTriggerEnter (other : Collider){
if(other.tag == "enemy"){
other.BroadcastMessage("takeDamage", weaponDamage, SendMessageOptions.DontRequireReceiver);
}
}