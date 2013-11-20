#pragma strict

//here are the public variables for the 4 lines typed into the inspector that the npc will say.
var script:String[];

var forceContact = false;

//we find the talkGUI gameobject so we can activate it when needed. its the visual box with 4 text lines attached to it.
private var talkGUI:GameObject;
//we use this state to either enter or exit talking with the same button
private var talkState = false;
//we find inv to check to see if its open or not, we can't talk and check inventory at the same time. that would be buggy.
private var inv:GameObject;

private var scriptIndex = 0;

//user input maps to the element number.
private var triggerKeyToElementNumber={};

private var trigger = "";



function Start () {
	//we find the 2 objects that we use to get the conversations going
	talkGUI = GameObject.Find("GUI/talkbg");
	inv = GameObject.Find("GUI/inventory");
}

function Update () {
	for (var key in triggerKeyToElementNumber.Keys) {
		// Input check should only be called in Update function and not in any physics function
		if (Input.GetKeyUp(key.ToString())) {
			// save the trigger key for checking in OnTriggerStay	
			trigger = key.ToString();
			break;
		}
	}
}

function OnTriggerEnter (other : Collider){
	if (forceContact && talkState == false && other.name == "Player")
	{
		triggerKeyToElementNumber = {};
		beginInteraction(other);	 
		scriptIndex = 0;
		playScript(scriptIndex);
	}
}

function OnTriggerStay (other : Collider){
	if(other.name == "Player") {
		// if the player presses e, and he's in fact inside the talking collider, we do the talk check stuff
		if (trigger!= "") {
			//if talkState is false, this is the first time the player will start the conversation
			if(talkState == false) {
				beginInteraction(other);
				scriptIndex = 0;
				playScript(scriptIndex);
			}
			else { //if talkstate is true, the player is in the middle of conversation and wants to advance to new conversation page
				scriptIndex = int.Parse(triggerKeyToElementNumber[trigger]);	
				if (scriptIndex < 0) {
					finishInteraction(other);
				} else {						
					playScript(scriptIndex);
				}
			}
			
			// set trigger back to empty string
			trigger = "";
		}
	}
}

private function getBranchNotation(line : String) {
	var index = 0;
	for (var i = 1; i< line.Length; i++) {
		if (line[i] == "*") {
			index = i;
			break;
		}				
	}
	
	triggerKeyToElementNumber = {};

	var branchNotations = line.Substring(1,index-1);
	var branches = branchNotations.Split(','[0]);
	
	for (var branch in branches) {
		var relationship = branch.ToString().Split('-'[0]);
		triggerKeyToElementNumber[relationship[0]] = relationship[1];
		//trigger = relationship[0], and element # = relationship[1];
	}
	return index;
}


private function playScript(index : int){
	//we check each line to see if somethings actually set in the line string before we send the line to the talkGUI
	if(script.Length != 0 && script[index].Length > 1)
	{
		//if * is in the beginning, you can only choose one of the options to go forward in the dialogue.
		var message = "";
		if (script[index][0] == "*") {
//			trigger = script[index][0].ToString();
			var secondStarIndex = getBranchNotation(script[index]);
//			message = script[index].Substring(2);
			message = script[index].Substring(secondStarIndex+1);
		} else {
			triggerKeyToElementNumber = {};
			triggerKeyToElementNumber["e"] = "-1"; //end of conversation (leaf line)
			message = script[index];
		}
		Debug.Log(message);
		talkGUI.BroadcastMessage("clearStrings", SendMessageOptions.DontRequireReceiver);
		talkGUI.BroadcastMessage("updateLines", message, SendMessageOptions.DontRequireReceiver);
	}
}

function beginInteraction(other : Collider)
{
	//we send a message to the npcbehavior script to get the direction to face for talking
	SendMessageUpwards("findPlayerDirection", SendMessageOptions.DontRequireReceiver);
	//we make sure a rigidbody is on the npc before we stop its movement
	if(rigidbody != null)
	{
		if(rigidbody.isKinematic == false)
		{
			//if the rigidbody is good to go, we stop the movement.
			transform.parent.rigidbody.velocity = Vector3(0,0,0);
		}
	}

	talkState = true;
	//we enable the guitexture for the talking box.
	talkGUI.guiTexture.enabled = true;
	//we tell the npc that we're talking
	SendMessageUpwards("talking", 1, SendMessageOptions.DontRequireReceiver);
	//we also tell the player that we're talking so he can't be controlled either.
	other.BroadcastMessage("talking", 1, SendMessageOptions.DontRequireReceiver);
}

function finishInteraction(other : Collider)
{
	talkState = false;
	talkGUI.guiTexture.enabled = false;
	SendMessageUpwards("talking", 0, SendMessageOptions.DontRequireReceiver);
	other.BroadcastMessage("talking", 0, SendMessageOptions.DontRequireReceiver);
	talkGUI.BroadcastMessage("clearStrings", SendMessageOptions.DontRequireReceiver);
	SendMessageUpwards("merchantStop", SendMessageOptions.DontRequireReceiver);
}
