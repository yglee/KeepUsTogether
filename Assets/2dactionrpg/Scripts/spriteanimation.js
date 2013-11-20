#pragma strict

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

private var counter:float = 0.0;
private var direction:int = 0;

function Start () {
    
}

function Update () {
    
	//we keep track of counter for animation * 6 so the animation is at 6 frames per second.
	counter += Time.deltaTime*6;
	
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
}