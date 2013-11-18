#pragma strict

//public variables that can be accessed in the inspector
//if canmove is set to true (by default it is) then the npc will walk around at random, otherwise will stay in one place.
var canMove = true;
//here are all of the textures used to animate the npc.
var idleLeft:Texture;
var idleRight:Texture;
var idleUp:Texture;
var idleDown:Texture;
var left1:Texture;
var left2:Texture;
var right1:Texture;
var right2:Texture;
var up1:Texture;
var up2:Texture;
var down1:Texture;
var down2:Texture;
//here is the speed we set for the npc when walking.
var speed:float = 3.0;

//here are private variabled we use to keep track of stuff while animating the npc or when the player wants to talk to it.
private var counter:float = 0.0;
private var randDir:int = 0;
private var randTime:float = 0.0;
private var direction:int = 0;
private var beingPushed = false;
private var isTalking = false;
//we find the player and set it as target so we can access stuff from the player when needed.
private var target:GameObject;

function Start () {
//here we find the player and set it as the target.
target = GameObject.Find("Player");
//here we check to see if canmove is false or true. if false we add a bunch of drag to the npc so we can't slide around
if(canMove == false){
rigidbody.drag = 150;
}else{
//if its true however we set drag to zero so he can walk freely
rigidbody.drag = 0;
}
}

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

//we keep track of counter for animation * 6 so the animation is at 6 frames per second.
counter += Time.deltaTime*6;
//we keep track of randTime so we can choose a random amount of time the npc walks, or stays still. this also works with nonmoving npcs and chooses a direction the npc looks.
randTime -= Time.deltaTime;

//if the velocity of the npc on the is greater than 0.5 in any direction, we allow animation to work. this applies to the next 4 chunks that look similar. i'll meet you below that.
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

//if the velocity is 0 for everything, we choose which idle he is based on the last direction he went.
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

//if the npc can move, we see do some stuff for it.
if(canMove == true){
//before we do any of the stuff we need to make sure he's not talking to the player, cant have him walking away in the middle of a "conversation".
if(isTalking == false){
//if randtime is less than zero, its time to choose a new direction and new amount of time to do the next thing.
if(randTime < 0){
//we set randtime to a random range (0 to 3.5 seconds)
randTime = Random.Range(0,3.5);
// we get a random direction, we are looking for more than 4 so the npc can also be idle
randDir = Random.Range(1,9);
}else{
rigidbody.velocity = Vector3(0,0,0);
}
}

//if the npc is not being pushed by the player, then we allow the movement to happen.
if(beingPushed == false && isTalking == false){
//we double check that drag is zero so he can walk without looking like he can barely move and is probably sick.
rigidbody.drag = 0;
//we make sure randtime is greater than 0 so things can happen
if(randTime > 0){
//based on randdir, we either choose a speed to go or stay idle.
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
if(randDir >= 5 && randDir <= 8){
rigidbody.velocity = Vector3(0,0,0);
}
}
//if he's talking or being pushed, we set the drag up so he can be pushed but isn't sliding around.
}else{
rigidbody.drag = 100;
}
}

//if can move isn't true this is all we need to set up random directions for the idle npc.
if(canMove == false){
if(isTalking == false){
if(randTime < 0){
randTime = Random.Range(1,4);
direction = Random.Range(1,5);
}
}
}

//end of function update
}

//we do some stuff if the npc gets hit by something
function OnCollisionEnter (other : Collision){
//if the player runs into the npc, we set beingpushed to true so the npc stops what he was doing before
if(other.collider.tag == "Player"){
beingPushed = true;
randTime = 2;
randDir = 5;
}

//if the npc was hit by an arrow, we take it away because thats mean.
if(other.collider.name == "arrow(Clone)"){
Destroy(other.gameObject);
}
}

//if any collision exits the npc, we make being pushed false so he can do the things he does again.
function OnCollisionExit (other : Collision){
beingPushed = false;
}

//if this function is called, we check to see if we're entering a conversation or exiting one. then we set istalking to something based on that.
function talking (state : float){
if(state == 1){
isTalking = true;
}
if(state == 0){
isTalking = false;
}
}

//we check the player's direction when getting into a conversation. when this function calls it'll check where the player is in reference to the ncp so we can try to get the npc to face the player.
function findPlayerDirection () {
var xDist = target.transform.position.x - transform.position.x;
var zDist = target.transform.position.z - transform.position.z;
if(xDist < -0.5 && xDist < zDist){
direction = 2;
}
if(xDist > 0.5 && xDist > zDist){
direction = 1;
}
if(zDist < -0.5 && zDist < xDist){
direction = 4;
}
if(zDist > 0.5 && zDist > xDist){
direction = 3;
}

}