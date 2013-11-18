#pragma strict

//all public variables can be edited in the inspector
//here are the 2 textures we use to animate the bat flapping its wings
var bat1:Texture;
var bat2:Texture;
//here we state the bats health, by default its 2 but can be changed in inspector
var health:int = 2.0;
//here we attach a heart and gem so they can spawn one at random when it dies
var heart:GameObject;
var gem:GameObject;
//here we attach a sound so it can make a noise when its hurt
var hurtSound:AudioClip;
//here we attach the explosion which is an animation so it looks pretty when it dies.
var explosion:GameObject;

//here are private variables we keep track of so the bat can behave and have a simple AI
private var distance:float;
private var zdistance:float;
private var counter:float = 0.0;
private var colorCounter:float = 0.0;
private var target:GameObject;

//in function start we find the player so the bat can react to the players position
function Start () {
target = GameObject.Find("Player");
}

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

counter += Time.deltaTime*8;
//here we check the distance the player is from the bat.
distance = target.transform.position.x - transform.position.x;
zdistance = target.transform.position.z - transform.position.z;
if(distance < 0){
	distance *= -1;
}
if(zdistance < 0){
	zdistance*= -1;
}

//if the player is close enough, start animating and moving.
if(distance < 14 && zdistance < 14){
	if(counter > 0 && renderer.material.mainTexture != bat1){
		renderer.material.mainTexture = bat1;
	}
	if(counter > 1 && renderer.material.mainTexture != bat2){
		renderer.material.mainTexture = bat2;
	}
	if(counter > 2){
		counter = 0.0;
	}

	//this is how we get the bat to always move towards the player if he's close enough.
	if(target != null){
		var dir = target.transform.position - transform.position;
		dir = dir.normalized;
		rigidbody.AddForce(dir * 800 * Time.deltaTime);
	}
//end of direction < 16
}

//if the bat was hurt, his color would have been changed to show that he was hurt. here we give it some time (0.125 seconds) to be seen then switch it back to normal.
if(renderer.material.color.g != 1){
	colorCounter += Time.deltaTime;
	if(colorCounter > 0.125){
		renderer.material.color.r = 1;
		renderer.material.color.g = 1; 
		renderer.material.color.b = 1; 
	}
}

//end of function update
}

//here we use check to see if it was hit by a weapon
function takeDamage (damage : int){

	//here we play the sound that it got hurt
	audio.PlayOneShot(hurtSound);
	//here we change the color of the bat to give a visual indication that it was hit
	renderer.material.color.r = 1;
	renderer.material.color.g = 0; 
	renderer.material.color.b = 0; 
	//we set the color counter to zero so we can track how long we have the color indication going for.
	colorCounter = 0.0;
	//we subtract health to track how much it has so it can die
	health -= damage;
	//if the health hits zero or is somehow less than zero, we want to get the death stuff going
	if(health <= 0){
		//here we choose a random number to determine what he will drop
		var randNum:int = Random.Range(1,4);
		//if the number is 2 we'll do a heart
		if(randNum == 2){
			Instantiate(heart, transform.position, Quaternion.Euler(-90,180,0));
		//if its any other number besides 2, we'll drop a gem instead
		}else{
			Instantiate(gem, transform.position, Quaternion.Euler(-90,180,0));
		}
	//before we destroy the bat we want to spawn the explosion animation so it looks pretty.
	Instantiate(explosion, transform.position, Quaternion.Euler(-90,180,0));
	//here we delete the bat. you won!
	Destroy(gameObject);
}

//if the bat got hurt, we set the velocity to zero before we choose which direction it will go
rigidbody.velocity = Vector3(0,0,0);

}

function OnCollisionEnter (other : Collision){
//if the bat hits something in the scene like another enemy, player, or any object with a collider, we make him bounce off of it. it makes the bat look crazy and scary fast.
if(other.transform.position.x < transform.position.x - 0.25){
	rigidbody.velocity.x = 8;
}
if(other.transform.position.x > transform.position.x + 0.25){
	rigidbody.velocity.x = -8;
}
if(other.transform.position.z < transform.position.z - 0.25){
	rigidbody.velocity.z = 8;
}
if(other.transform.position.z > transform.position.z + 0.25){
	rigidbody.velocity.z = -8;
}

}

function OnTriggerEnter (other : Collider) {
if(other.tag == "weapon"){
//here we choose which direction we add velocity based on the position of the weapon.
if(other.transform.position.x < transform.position.x - 0.25){
	rigidbody.velocity.x = 12;
}
if(other.transform.position.x > transform.position.x + 0.25){
	rigidbody.velocity.x = -12;
}
if(other.transform.position.z < transform.position.z - 0.25){
	rigidbody.velocity.z = 12;
}
if(other.transform.position.z > transform.position.z + 0.25){
	rigidbody.velocity.z = -12;
}
}
}