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

private var trigger = "e";

private var scriptIndex = 0;

function Start () {
	//we find the 2 objects that we use to get the conversations going
	talkGUI = GameObject.Find("GUI/talkbg");
	inv = GameObject.Find("GUI/inventory");
}

function OnTriggerEnter (other : Collider){
	if (forceContact && talkState == false && other.name == "Player")
	{
		beginInteraction(other);
		 
		scriptIndex = 0;
		playScript(scriptIndex);
	}
}

function OnTriggerStay (other : Collider){
	if(other.name == "Player")
	{
		// if the player presses e, and he's in fact inside the talking collider, we do the talk check stuff
		if(Input.GetKeyDown(trigger))
		{
	
			//if talkstate is false, that means the player wants to talk, not exit so we set it to true and do stuff
			if(talkState == false)
			{
				beginInteraction(other);
				
				scriptIndex = 0;
				playScript(scriptIndex);
			}
			else //if talkstate is true, that means the player wants continue the conversation until the end of the script array
			{
				scriptIndex++;
				if (scriptIndex < script.Length)
				{
					playScript(scriptIndex);
				}
				else
				{
					finishInteraction(other);
				}
			}
		}
	}
}

private function playScript(index : int){
	//we check each line to see if somethings actually set in the line string before we send the line to the talkGUI
	if(script.Length != 0 && script[index].Length > 1)
	{
		// if there is a '*' at the second char, the first char is the trigger
		var message = "";
		if (script[index][1] == "*")
		{
			trigger = script[index][0].ToString();
			message = script[index].Substring(2);
		}
		else
		{
			trigger = "e";
			message = script[index];
		}
		
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
	trigger = "e";
	talkGUI.guiTexture.enabled = false;
	SendMessageUpwards("talking", 0, SendMessageOptions.DontRequireReceiver);
	other.BroadcastMessage("talking", 0, SendMessageOptions.DontRequireReceiver);
	talkGUI.BroadcastMessage("clearStrings", SendMessageOptions.DontRequireReceiver);
	SendMessageUpwards("merchantStop", SendMessageOptions.DontRequireReceiver);
}
