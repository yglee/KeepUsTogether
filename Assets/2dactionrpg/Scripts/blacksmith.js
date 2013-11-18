#pragma strict

//here are the 2 textures we use to make the blacksmith animate.
var blacksmith1:Texture;
var blacksmith2:Texture;

//this variable keeps track of time so we can switch out animations based on time.
private var counter:float = 0.0;

function Update () {
//we keep track of time based on seconds * 2
counter += Time.deltaTime*2;

//here we set the texture based on what time it is and if the texture is already set so it is only called once per time needed.
if(counter > 0 && counter < 1 && renderer.material.mainTexture != blacksmith1){
	renderer.material.mainTexture = blacksmith1;
}
if(counter > 1 && counter < 2 && renderer.material.mainTexture != blacksmith2){
	renderer.material.mainTexture = blacksmith2;
}
//if the counter goes past the amount of time needed to animate both textures, we reset so it can start over infinitely.
if(counter > 2){
	counter = 0.0;
}

}