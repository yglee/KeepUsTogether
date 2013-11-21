#pragma strict

//this script accesses the playerweapons script so it can send messages to the script quickly. this is faster than sendmessage or broadcastmessage.
var weaponScript:playerweapons;

//here are all of the textures we use to animate the player.
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
var attackLeft:Texture;
var attackRight:Texture;
var attackUp:Texture;
var attackDown:Texture;
var vehicleLeft:Texture;
var vehicleRight:Texture;

//here are private variables we use to keep track of animation stuff.
private var direction:int = 1;
private var counter:float = 0.0;
private var frameRate:float = 7.0;
private var attacking = false;

function Update () {

//before we allow the player to do animation, we check to see if attacking is false
if(attacking == false){
//now we check the velocity of the player and animate it based on that velocity by choosing a direction.
if(rigidbody.velocity.x > 0.25 && rigidbody.velocity.z == 0){
direction = 1;
//weaponScript.getDir(direction);
}
if(rigidbody.velocity.x < -0.25 && rigidbody.velocity.z == 0){
direction = 2;
//weaponScript.getDir(direction);
}
if(rigidbody.velocity.z > 0.25 && rigidbody.velocity.x == 0){
direction = 3;
//weaponScript.getDir(direction);
}
if(rigidbody.velocity.z < -0.25 && rigidbody.velocity.x == 0){
direction = 4;
//weaponScript.getDir(direction);
}

//we check to see if our direction doesn't match what way the player is actually going so we can fix it. this helps keep the animation polished in case of any weird incidents
if(direction == 1 && rigidbody.velocity.x < -0.25){
direction = 2;
//weaponScript.getDir(direction);
}
if(direction == 2 && rigidbody.velocity.x > 0.25){
direction = 1;
//weaponScript.getDir(direction);
}
if(direction == 3 && rigidbody.velocity.z < -0.25){
direction = 4;
//weaponScript.getDir(direction);
}
if(direction == 4 && rigidbody.velocity.z > 0.25){
direction = 3;
//weaponScript.getDir(direction);
}

//if the direction = 1 and is in fact going the right direction for that, we allow it to animate right
if(direction == 1 && rigidbody.velocity.x > 0.25){
counter += Time.deltaTime*frameRate;
if(counter > 0 && renderer.material.mainTexture != right1){
renderer.material.mainTexture = right1;
}
if(counter > 1 && renderer.material.mainTexture != idleRight){
renderer.material.mainTexture = idleRight;
}
if(counter > 2 && renderer.material.mainTexture != right2){
renderer.material.mainTexture = right2;
}
if(counter > 3 && renderer.material.mainTexture != idleRight){
renderer.material.mainTexture = idleRight;
}
if(counter > 4){
counter = 0;
}
}

//if the direction = 1 and is in fact going the right direction for that, we allow it to animate left
if(direction == 2 && rigidbody.velocity.x < -0.25){
counter += Time.deltaTime*frameRate;
if(counter > 0 && renderer.material.mainTexture != left1){
renderer.material.mainTexture = left1;
}
if(counter > 1 && renderer.material.mainTexture != idleLeft){
renderer.material.mainTexture = idleLeft;
}
if(counter > 2 && renderer.material.mainTexture != left2){
renderer.material.mainTexture = left2;
}
if(counter > 3 && renderer.material.mainTexture != idleLeft){
renderer.material.mainTexture = idleLeft;
}
if(counter > 4){
counter = 0;
}
}

//if the direction = 1 and is in fact going the right direction for that, we allow it to animate up
if(direction == 3 && rigidbody.velocity.z > 0.25){
counter += Time.deltaTime*frameRate;
if(counter > 0 && renderer.material.mainTexture != up1){
renderer.material.mainTexture = up1;
}
if(counter > 1 && renderer.material.mainTexture != idleUp){
renderer.material.mainTexture = idleUp;
}
if(counter > 2 && renderer.material.mainTexture != up2){
renderer.material.mainTexture = up2;
}
if(counter > 3 && renderer.material.mainTexture != idleUp){
renderer.material.mainTexture = idleUp;
}
if(counter > 4){
counter = 0;
}
}

//if the direction = 1 and is in fact going the right direction for that, we allow it to animate down
if(direction == 4 && rigidbody.velocity.z < -0.25){
counter += Time.deltaTime*frameRate;
if(counter > 0 && renderer.material.mainTexture != down1){
renderer.material.mainTexture = down1;
}
if(counter > 1 && renderer.material.mainTexture != idleDown){
renderer.material.mainTexture = idleDown;
}
if(counter > 2 && renderer.material.mainTexture != down2){
renderer.material.mainTexture = down2;
}
if(counter > 3 && renderer.material.mainTexture != idleDown){
renderer.material.mainTexture = idleDown;
}
if(counter > 4){
counter = 0;
}
}

//if the player is not moving anywhere, we choose the idle texture based on the direction last set.
if(rigidbody.velocity.x == 0 && rigidbody.velocity.z == 0){
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
//end of if attacking is false
}
//end of function update
}

//if strike is called, we do the attack animation, pause for 0.25 seconds and let the player go back to what he was doing.
function strike () {
attacking = true;
if(direction == 1){
renderer.material.mainTexture = attackRight;
}
if(direction == 2){
renderer.material.mainTexture = attackLeft;
}
if(direction == 3){
renderer.material.mainTexture = attackUp;
}
if(direction == 4){
renderer.material.mainTexture = attackDown;
}
yield WaitForSeconds(0.25);
attacking = false;
}