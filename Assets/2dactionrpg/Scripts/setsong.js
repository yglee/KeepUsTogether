#pragma strict

//this is the simple script we use to set what song we want. we just use an int and send the int to the musicmanager.
//the object this script is attached to is in the scenes that might need to be updated like the town, monsterarea, and playerhouse.
var songNumber:int = 1;

function Start () {
//we find the musicmanager
var musicManager = GameObject.Find("permanentobjects/musicmanager");
//then send a message to the music manager with the song number we want to play.
musicManager.BroadcastMessage("setsong", songNumber, SendMessageOptions.DontRequireReceiver);
}