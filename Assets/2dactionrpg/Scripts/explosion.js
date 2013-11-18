#pragma strict

//all of these scripts can be accessed in the inspector for the script
//here are the 3 textures that animate the explosion
var explosion1:Texture;
var explosion2:Texture;
var explosion3:Texture;
//here we have the explosion sound
var explosionSound:AudioClip;

//here we use counter to keep track of time.
private var counter:float = 0.0;

function Start () {
//when the explosion object is spawned, on start we play the sound.
audio.PlayOneShot(explosionSound);
}

function Update () {
//here we keep track of time with counter and multiply it by 12 to get 12 frames per second.
counter += Time.deltaTime*12;
//here we do the animations based on the counter's time.
if(counter > 0 && renderer.material.mainTexture != explosion1){
renderer.material.mainTexture = explosion1;
}
if(counter > 1 && renderer.material.mainTexture != explosion2){
renderer.material.mainTexture = explosion2;
}
if(counter > 2 && renderer.material.mainTexture != explosion3){
renderer.material.mainTexture = explosion3;
}
//when the counter is greater than 3 we destroy the explosion.
if(counter > 3){
Destroy(gameObject);
}
}