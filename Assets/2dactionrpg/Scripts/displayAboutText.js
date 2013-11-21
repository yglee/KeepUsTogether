#pragma strict

private var time: float;

function Start () {
	var fader = GameObject.Find("fader");
	fader.BroadcastMessage("displayAboutJohnText", SendMessageOptions.DontRequireReceiver);
	time = Time.time;
}

function Update () {
	var timeDelta = Time.time-time;
	if (timeDelta > 10) {
		//teleport to player house
		Application.LoadLevel("playerhouse");
	}
}