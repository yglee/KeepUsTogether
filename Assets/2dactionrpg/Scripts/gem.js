#pragma strict

//here is a private gameObject variable that we will set as the player
private var target:GameObject;

function Start () {
//here we find the player so it can be set as target
target = GameObject.Find("Player");
//here we set a random velocity for the gem so it moves as soon as it spawned. this is a nice little animation.
rigidbody.AddForce(Random.Range(-600,600),0,Random.Range(-600,600));
}

function Update () {
//this is a special line used to set the position of the object so its looks like its over or below things.
transform.position.y = -transform.position.z/10000+0.5;

//before we try to check the targets distance and make the gem go towards the player, we check to see if its not null. This is just to make sure no errors happen when it tries to go towards the target (which is the player).
if(target != null){
	//here we check the distance between the gem and the player
	var sqrDistance = (target.transform.position - transform.position).sqrMagnitude;
	//if the square distance is less than 16, then we allow the gem to move towards the target
	if (sqrDistance <= 16){
		//here we get the direction so we can apply force towards the direction of the player.
		var dir = target.transform.position - transform.position;
		dir = dir.normalized;
		//now we add force towards the player towards the direction of the player.
		rigidbody.AddForce(dir * 3000 * Time.deltaTime);
	}
}

//end of function update
}