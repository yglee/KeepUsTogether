#pragma strict

//here are the public variables for the 4 lines typed into the inspector that the npc will say.
var line1:String;
var line2:String;
var line3:String;
var line4:String;

//we find the talkGUI gameobject so we can activate it when needed. its the visual box with 4 text lines attached to it.
private var talkGUI:GameObject;
//we use this state to either enter or exit talking with the same button
private var talkState = false;
//we find inv to check to see if its open or not, we can't talk and check inventory at the same time. that would be buggy.
private var inv:GameObject;

function Start () {
//we find the 2 objects that we use to get the conversations going
talkGUI = GameObject.Find("GUI/talkbg");
inv = GameObject.Find("GUI/inventory");
}

function OnTriggerStay (other : Collider){
// if the player presses e, and he's in fact inside the talking collider, we do the talk check stuff
if(Input.GetKeyDown("e")){
if(other.name == "Player"){
//we find inventory to see if its activated or not, if its not it will return as null
inv = GameObject.Find("GUI/inventory");
//if inv is in fact null, we can get talking going
if(inv == null){
//we send a message to the npcbehavior script to get the direction to face for talking
SendMessageUpwards("findPlayerDirection", SendMessageOptions.DontRequireReceiver);
//we make sure a rigidbody is on the npc before we stop its movement
if(rigidbody != null){
if(rigidbody.isKinematic == false){
//if the rigidbody is good to go, we stop the movement.
transform.parent.rigidbody.velocity = Vector3(0,0,0);
}
}
//if talkstate is false, that means the player wants to talk, not exit so we set it to true and do stuff
if(talkState == false){
talkState = true;
//we enable the guitexture for the talking box.
talkGUI.guiTexture.enabled = true;
//we tell the npc that we're talking
SendMessageUpwards("talking", 1, SendMessageOptions.DontRequireReceiver);
//we also tell the player that we're talking so he can't be controlled either.
other.BroadcastMessage("talking", 1, SendMessageOptions.DontRequireReceiver);
//we check each line to see if somethings actually set in the line string before we send the line to the talkGUI
if(line1.Length != 0){
talkGUI.BroadcastMessage("lineOne", line1, SendMessageOptions.DontRequireReceiver);
}
if(line2.Length != 0){
talkGUI.BroadcastMessage("lineTwo", line2, SendMessageOptions.DontRequireReceiver);
}
if(line3.Length != 0){
talkGUI.BroadcastMessage("lineThree", line3, SendMessageOptions.DontRequireReceiver);
}
if(line4.Length != 0){
talkGUI.BroadcastMessage("lineFour", line4, SendMessageOptions.DontRequireReceiver);
}
//if talkstate is true, that means the player wants to leave the conversation so we turn everything off instead.
}else{
talkState = false;
talkGUI.guiTexture.enabled = false;
SendMessageUpwards("talking", 0, SendMessageOptions.DontRequireReceiver);
other.BroadcastMessage("talking", 0, SendMessageOptions.DontRequireReceiver);
talkGUI.BroadcastMessage("clearStrings", SendMessageOptions.DontRequireReceiver);
SendMessageUpwards("merchantStop", SendMessageOptions.DontRequireReceiver);
}
}
}
}
}