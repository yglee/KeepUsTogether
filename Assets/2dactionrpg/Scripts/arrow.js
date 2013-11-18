#pragma strict

//here are the 3 textures we use for the arrow animation. 2 and 3 are so it wiggles when it hits things. it looks nice that way.
var arrow1:Texture;
var arrow2:Texture;
var arrow3:Texture;
var weaponDamage:float = 1;

//here are private variables we use to keep track of stuff for the arrows like animation and time its alive for.
private var lifeCounter:float = 0.0;
private var counter:float = 0.0;
private var hit = false;

function Update () {

//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

//here we count time to see how long it has been alive
lifeCounter += Time.deltaTime;

//if the lifeCounter counts over 10 seconds, we destroy the object, we don't want too many arrows in the scene for no reason.
if(lifeCounter > 10){
	Destroy(gameObject);
}

//if the arrow hits something, true is set in OnCollisionEnter, then we animate it here so it wiggles for a short time.
if(hit == true){
counter += Time.deltaTime*24;
	if(counter > 0 && counter < 1 && renderer.material.mainTexture != arrow1){
		renderer.material.mainTexture = arrow1;
	}
	if(counter > 1 && counter < 2 && renderer.material.mainTexture != arrow2){
		renderer.material.mainTexture = arrow2;
	}
	if(counter > 2 && counter < 3 && renderer.material.mainTexture != arrow3){
		renderer.material.mainTexture = arrow3;
	}
	if(counter > 3 && counter < 4 && renderer.material.mainTexture != arrow2){
		renderer.material.mainTexture = arrow2;
	}
	if(counter > 4 && counter < 5 && renderer.material.mainTexture != arrow1){
		renderer.material.mainTexture = arrow1;
	}
	if(counter > 5 && counter < 6 && renderer.material.mainTexture != arrow2){
		renderer.material.mainTexture = arrow2;
	}
	if(counter > 6 && counter < 7 && renderer.material.mainTexture != arrow3){
		renderer.material.mainTexture = arrow3;
	}
	if(counter > 7 && renderer.material.mainTexture != arrow2){
		renderer.material.mainTexture = arrow2;
		//we now set it to false because the animation is done and we don't want it to keep track of time anymore.
		hit = false;
	}
}

}

//if the arrow hits something we check to see what thing its hitting, then react from there.
function OnCollisionEnter (other : Collision){
//if it is not the player or weapon, then things happen, we don't want the arrow to get stuck to the player for no reason.
if(other.collider.tag != "Player" && other.collider.tag != "weapon"){
	//we use isKinematic as a workaround to make sure the rigidbody doesn't keep working. If you deactivate the rigidbody, the textures will disappear.
	if(rigidbody.isKinematic == false){
		rigidbody.velocity = Vector3(0,0,0);
	}
	//we set isKinematic for the workaround
	rigidbody.isKinematic = true;
	//we set whatever the arrow hit as the parent so it stays with the object it hits, in case its moving.
	transform.parent = other.transform;
	//we set trigger to be true so it no longer is affected by collisions.
	collider.isTrigger = true;
}
//here we set hit to true so the arrow will wiggle.
hit = true;

if(other.collider.tag == "enemy"){
other.collider.BroadcastMessage("takeDamage", weaponDamage, SendMessageOptions.DontRequireReceiver);
}
collider.enabled = false;
}