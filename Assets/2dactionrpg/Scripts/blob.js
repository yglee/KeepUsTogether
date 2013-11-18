#pragma strict

//here are public variables that can be changed in the inspector
//here are the 3 textures that we use to animate the blob
var blob1:Texture;
var blob2:Texture;
var blob3:Texture;
//here we have have his health, by default it is 2, but it can be changed in the inspector
var health:int = 2;
//here we set the speed of the blob, which can also be changed in the inspector
var speed:float = 3.0;
//here we have the sound ready for when the blob gets hurt
var hurtSound:AudioClip;
//here we have the heart and gem ready so it can be spawned when it dies
var heart:GameObject;
var gem:GameObject;
//here is the explosion that helps make the death animation of the blob look pretty
var explosion:GameObject;

//here are private variables we use to animate and manage the blob's simple AI
private var counter:float = 0.0;
private var randDir:int = 0;
private var randTime:float = 0.0;
private var colorCounter:float = 0.0;
private var hurtCounter:float = 0.0;

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

//here we keep track of time with counter for the animation of the blob in seconds * 8 (aka, 8 frames per second)
counter += Time.deltaTime*8;
//randTime is so we can keep track of time to have the blob moving or staying idle for certain amounts of time. 
randTime -= Time.deltaTime;

//here we animate the blob based on counter time. 
if(counter > 0 && counter < 1 && renderer.material.mainTexture != blob1){
	renderer.material.mainTexture = blob1;
}
if(counter > 1 && counter < 2 && renderer.material.mainTexture != blob2){
	renderer.material.mainTexture = blob2;
}
if(counter > 2 && counter < 3 && renderer.material.mainTexture != blob3){
	renderer.material.mainTexture = blob3;
}
//if the counter hits 3 it resets so the blob can animate infinitely
if(counter > 3){
	counter = 0.0;
}

//here we check to see if randTime is less than zero so we can reset new times and direction for the blob to move
if(randTime < 0){
	randTime = Random.Range(0,3.5);
	randDir = Random.Range(1,8);
}

//we check the hurtcounter to make sure the blob wasn't hurt recently, that way we can do other movements during that time
if(hurtCounter > 0.125){
	if(randTime > 0){
		//here we check to see if the randDir was 1-4, if that number is chosen, it will move in that given direction
		if(randDir == 1){
			rigidbody.velocity = Vector3(-speed,0,0);
		}
		if(randDir == 2){
			rigidbody.velocity = Vector3(speed,0,0);
		}
		if(randDir == 3){
			rigidbody.velocity = Vector3(0,0,speed);
		}
		if(randDir == 4){
			rigidbody.velocity = Vector3(0,0,-speed);
		}
		//if randDir is 5-7, we make him idle instead
		if(randDir >= 5 && randDir <= 7){
			rigidbody.velocity = Vector3(0,0,0);
		}
	}
}else{
	//this else statement is tied to if hurtcounter > 0.125. so he's hurt we won't do normal animations, but temporarily keep track of how long he was hurt here.
	hurtCounter += Time.deltaTime;
}

//here we check to see if the blob is a different color. the color is changed when he is hurt to give a visual representation of being hurt.
if(renderer.material.color.r != 1){
	colorCounter += Time.deltaTime;
		//if the counter is greater than 0.25 while being hurt, it will switch back to normal colors.
	if(colorCounter > 0.25){
		renderer.material.color.r = 1.0;
		renderer.material.color.b = 1.0; 
	}
}

//end of function update
}

//here we check to see if a trigger hit the enemy
function takeDamage (damage : int){
//if the trigger was tagged as a weapon, we need to do stuff for it being hurt.
//if(other.tag == "weapon"){
	//here we play the sound that the blob was hurt
	audio.PlayOneShot(hurtSound);
	//here we change the color of the blob for a visual representation of being hurt.
	renderer.material.color.r = 0.5;
	renderer.material.color.b = 0.5;
	//we reset the color counter so that we can keep track of how long the colors are not normal
	colorCounter = 0.0;
	//we update the health so the blob can die
	health -= damage;
	//if the health hits 0 or somehow is less than 0, we start the death stuff
	if(health <= 0){
		//here we choose a random number to see what object the blob drops
		var randNum:int = Random.Range(1,4);
		//if the random number is 2 we drop a heart
		if(randNum == 2){
			Instantiate(heart, transform.position, Quaternion.Euler(-90,180,0));
			//if the random number is anything else, we drop a gem.
		}else{
			Instantiate(gem, transform.position, Quaternion.Euler(-90,180,0));
		}
	//before we destroy the blob, we spawn the explosion to make the animation of the blobs death pretty.
	Instantiate(explosion, transform.position, Quaternion.Euler(-90,180,0));
	//here we destroy the blob so he isn't in the scene anymore.
	Destroy(gameObject);
}

//when the blob is hurt but doesn't die, we set the velocity to 0 before we choose which way he is kicked back.
rigidbody.velocity = Vector3(0,0,0);
//we reset the hurt counter so that we can keep track of how long he is hurt so his normal wandering velocity doesn't work for a short amount of time.
hurtCounter = 0.0;
//end of if other.tag = weapon
//}

//end of ontriggerenter
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