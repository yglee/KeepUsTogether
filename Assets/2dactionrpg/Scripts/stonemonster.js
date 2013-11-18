#pragma strict

//here are all of the textures we use to animate the stone monster
var right1:Texture;
var right2:Texture;
var idleRight:Texture;
var left1:Texture;
var left2:Texture;
var idleLeft:Texture;
var up1:Texture;
var up2:Texture;
var idleUp:Texture;
var down1:Texture;
var down2:Texture;
var idleDown:Texture;
//here is the health of the stone monster, by default we set it to 4 but this can be changed in the inspector.
var health:int = 4;
//here is the speed of the stone monster.
var speed:float = 3.0;
//here is sound when it gets hurt.
var hurtSound:AudioClip;
//here is the heart and gem gameobject that can spawn if the monster dies.
var heart:GameObject;
var gem:GameObject;
//here is the explosion animation that is spawned when the monster dies to make it look pretty.
var explosion:GameObject;

//here are private variables we use to keep track of stuff and animation for the stone monster. Helps manage simple things that create a basic AI.
private var counter:float = 0.0;
private var colorCounter:float = 0.0;
private var direction:int = 4;
private var isAlive = false;
private var target:GameObject;

function Start () {
//here we set target to be the player. we use the players position as a reference to make the stone monster walk towards the player.
target = GameObject.Find("Player");
}

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

//we don't let the monster do anything until something from the player disturbs it, like a weapon or running into him.
if(isAlive == true){

//we keep track of time * 6 for the counter so the monster animates at 6 frames per second.
counter += Time.deltaTime*6;

//this is how we get the stone monster to always move towards the player.
if(target != null){
var dir = target.transform.position - transform.position;
dir = dir.normalized;
rigidbody.AddForce(dir * speed*200 * Time.deltaTime);
}

//now we check the velocity of the monster. if he's moving faster than 0.5 on the x plane, we'll animate him going right.
if(rigidbody.velocity.x > 0.5){
direction = 1;
	if(counter > 0 && counter < 1 && renderer.material.mainTexture != right1){
	renderer.material.mainTexture = right1;
	}
	if(counter > 1 && counter < 2 && renderer.material.mainTexture != idleRight){
	renderer.material.mainTexture = idleRight;
	}
	if(counter > 2 && counter < 3 && renderer.material.mainTexture != right2){
	renderer.material.mainTexture = right2;
	}
	if(counter > 3 && counter < 4 && renderer.material.mainTexture != idleRight){
	renderer.material.mainTexture = idleRight;
	}
	if(counter > 4){
	counter = 0.0;
	}
}
//now we check the velocity of the monster. if he's moving faster than -0.5 on the x plane, we'll animate him going left.
if(rigidbody.velocity.x < -0.5){
direction = 2;
	if(counter > 0 && counter < 1 && renderer.material.mainTexture != left1){
	renderer.material.mainTexture = left1;
	}
	if(counter > 1 && counter < 2 && renderer.material.mainTexture != idleLeft){
	renderer.material.mainTexture = idleLeft;
	}
	if(counter > 2 && counter < 3 && renderer.material.mainTexture != left2){
	renderer.material.mainTexture = left2;
	}
	if(counter > 3 && counter < 4 && renderer.material.mainTexture != idleLeft){
	renderer.material.mainTexture = idleLeft;
	}
	if(counter > 4){
	counter = 0.0;
	}
}
//now we check the velocity of the monster. if he's moving faster than 0.5 on the z plane, we'll animate him going up.
if(rigidbody.velocity.z > 0.5){
direction = 3;
	if(counter > 0 && counter < 1 && renderer.material.mainTexture != up1){
	renderer.material.mainTexture = up1;
	}
	if(counter > 1 && counter < 2 && renderer.material.mainTexture != idleUp){
	renderer.material.mainTexture = idleUp;
	}
	if(counter > 2 && counter < 3 && renderer.material.mainTexture != up2){
	renderer.material.mainTexture = up2;
	}
	if(counter > 3 && counter < 4 && renderer.material.mainTexture != idleUp){
	renderer.material.mainTexture = idleUp;
	}
	if(counter > 4){
	counter = 0.0;
	}
}
//now we check the velocity of the monster. if he's moving faster than -0.5 on the z plane, we'll animate him going down.
if(rigidbody.velocity.z < -0.5){
direction = 4;
	if(counter > 0 && counter < 1 && renderer.material.mainTexture != down1){
	renderer.material.mainTexture = down1;
	}
	if(counter > 1 && counter < 2 && renderer.material.mainTexture != idleDown){
	renderer.material.mainTexture = idleDown;
	}
	if(counter > 2 && counter < 3 && renderer.material.mainTexture != down2){
	renderer.material.mainTexture = down2;
	}
	if(counter > 3 && counter < 4 && renderer.material.mainTexture != idleDown){
	renderer.material.mainTexture = idleDown;
	}
	if(counter > 4){
	counter = 0.0;
	}
}

//if the monster isn't moving anywhere, we'll set an idle based on direction. This wouldn't be used often, but we want it here just in case.
if(rigidbody.velocity == Vector3(0,0,0)){
	if(direction == 1){
	renderer.material.mainTexture = idleRight;
	}
	if(direction == 2){
	renderer.material.mainTexture = idleLeft;
	}
	if(direction == 3){
	renderer.material.mainTexture = idleUp;
	}
	if(direction == 4){
	renderer.material.mainTexture = idleDown;
	}
}
}

//if the color is not normal, we'll get the color counter going so we can change it back after 0.25 seconds. only happens when the monster is hurt.
if(renderer.material.color.g != 1){
colorCounter += Time.deltaTime;
if(colorCounter > 0.25){
renderer.material.color.r = 1;
renderer.material.color.g = 1; 
renderer.material.color.b = 1; 
}
}

//end of function update
}

//if a trigger hits the monster, we want to check to see what hit him.
function takeDamage (damage : int){
//if he was already alive, then we actually hurt the monster
if(isAlive == true){
//here we play the sound that he was hurt
audio.PlayOneShot(hurtSound);
//then change the color to give a visual indication that he was hurt
renderer.material.color.r = 1;
renderer.material.color.g = 0.5; 
renderer.material.color.b = 0.5; 
//then reset the colorcounter so it can keep track of the 0.25 seconds that he's changed to a different color.
colorCounter = 0.0;
//then subtract health
health -= damage;
//if his health hits 0 or is somehow less than 0, we get the death stuff going
if(health <= 0){
//we choose a random number then based on that number, drop a heart or gem.
var randNum:int = Random.Range(1,4);
if(randNum == 2){
Instantiate(heart, transform.position, Quaternion.Euler(-90,180,0));
}else{
Instantiate(gem, transform.position, Quaternion.Euler(-90,180,0));
}
//now we spawn the explosion animation object
Instantiate(explosion, transform.position, Quaternion.Euler(-90,180,0));
//then destroy the monster. you win!
Destroy(gameObject);
}

//before we apply a force for the monster to get hit back, we set the velocity to zero so its even.
rigidbody.velocity = Vector3(0,0,0);

//this else statement refers to the if(isAlive == true). If its not true, then he doesn't get hurt, but we make him come alive instead.
}

}

//we check to see if the player ran into us, then check to see if isAlive is false. If this is all true, we do the same activation process 
//just like we did just above this.
function OnCollisionEnter (other : Collision){
if(other.collider.tag == "Player" && isAlive == false || other.collider.tag == "weapon" && isAlive == false){
renderer.material.mainTexture = idleDown;
yield WaitForSeconds(0.5);
rigidbody.isKinematic = false;
isAlive = true;
}
}

function OnTriggerEnter (other : Collider) {
//if he was already alive, then we do stuff
if(isAlive == true && other.tag == "weapon"){
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

//if the monster is not alive but a weapon hits him, then activate him
if(isAlive == false && other.tag == "weapon"){
//we change the idle to idleDown so that his eyes turn red.
renderer.material.mainTexture = idleDown;
//we wait for half a second before we make him come alive
yield WaitForSeconds(0.5);
//we turn off isKinematic because by default its set. This is a workaround so that when isKinematic is on, the rigidbody doesn't work but doesn't cause errors.
rigidbody.isKinematic = false;
//now we set him to be alive and all the animations and walking will work in function Update.
isAlive = true;
}

//end of OnTriggerEnter
}