#pragma strict

private var time: float;
private var fader: GameObject;

function Start () {
	fader = GameObject.Find("fader");
	time = Time.time;
}

function Update () {
	var timeDelta = Time.time-time;
	if (timeDelta > 5) {
		//teleport to player house
		fader.BroadcastMessage("setGameOver", SendMessageOptions.DontRequireReceiver);
	}
}