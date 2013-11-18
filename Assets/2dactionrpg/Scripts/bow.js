#pragma strict

//here are the 2 textures we use to animate the bow when its being used.
var bow1:Texture;
var bow2:Texture;
//here is the arrow that the bow spawns
var arrow:GameObject;
//here is the speed of the arrow we want to give it.
var arrowSpeed:float = 16.0;

//here are private variables we keep track of for the animation and random extra angle we give to the arrow so they aren't quite perfectly straight shots.
private var counter:float = 0.0;
private var randAngle:float = 0.0;

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

//here we keep track of time for the bow animation.
counter += Time.deltaTime;
//if the counter hits 0.125 we change the texture so that it looks like the string was let go.
if(counter > 0.125 && renderer.material.mainTexture != bow2){
	renderer.material.mainTexture = bow2;
	//here we choose a random angle between -2 and 2 so the arrows have a 4 degree difference of firing.
	randAngle = Random.Range(-2,2);
	//here we set a spawn arrow as a temp variable so we can add force plus the extra random angle to it.
	var arrowPrefab = Instantiate(arrow, Vector3(transform.position.x,0.5,transform.position.z), Quaternion.Euler(-90,transform.localEulerAngles.z+180+randAngle,0));
	//here we add force to the arrow we just shot
	arrowPrefab.rigidbody.velocity = arrowPrefab.transform.up*-arrowSpeed;
	}
}

//here we receive a message from player weapons to tell the bow to reset so it can be fired over and over.
function resetBow () {
counter = 0.0;
renderer.material.mainTexture = bow1;
}