#pragma strict

//this is attached to the talkGui object. This receives the strings from the npc when you try to talk to them.
//this is one of the most complicated scripts in this kit but I'll try my best to explain everything.

//here are the 4 GUITexts that are children of the talkGui object. these take the strings and display them.
var line1GUI:GUIText;
var line2GUI:GUIText;
var line3GUI:GUIText;
var line4GUI:GUIText;
//this is the really short beep sounds that plays each time a letter is added while talking.
var talkSound:AudioClip;

//this takes the first line and saves the string.
private var line1:String;
//this keeps track of how many letters are left to add to the guiText before it starts the next line
private var line1left:int;
//this keeps track of whether or not the line will be used by determining if it received anything for a line.
private var line1State = false;
//same thing as line1 for the rest.
private var line2:String;
private var line2left:int;
private var line2State = false;
private var line3:String;
private var line3left:int;
private var line3State = false;
private var line4:String;
private var line4left:int;
private var line4State = false;
//this counter keeps track of time.
private var counter = 0.0;
//this variable manages how long to pause before it does the next letter.
private var letterPause = 0.05;
//these next 5 variables switch so only one npc can be talked to at a time, otherwise this could receive 2 npc strings at once and really mess up the game.
private var canTalk = false;
private var canReceive1 = true;
private var canReceive2 = true;
private var canReceive3 = true;
private var canReceive4 = true;

//this function is received by the npc
function lineOne (string : String){
//this checks if it can receive a string. this would be false if the player is already receiving stuff from another npc.
if(canReceive1 == true){
//this clears the strings so they can be filled with new ones.
line1 = null;
line2 = null;
line3 = null;
line4 = null;
//this sets canreceive to false so we can't get any other strings from another npc
canReceive1 = false;
//this sets line 1 to the npc's received string for line 1
line1 = string;
//this sets how many characters are in line1
line1left = line1.Length;
//this sets line1 state to be true so line one will be typed out
line1State = true;
canTalk = true;
//this makes sure the strings in the guitext are cleared before we add to it
line1GUI.guiText.text = null;
line2GUI.guiText.text = null;
line3GUI.guiText.text = null;
line4GUI.guiText.text = null;
//this calls the typelineone function so line one will be typed out
TypeLineOne();
}
}

//this receives the string for line 2, just like lineOne above, but doesn't do anything until TypeLineTwo is called.
function lineTwo (string : String){
if(canReceive2 == true){
canReceive2 = false;
line2 = string;
line2left = line2.Length;
}
}

//this receives the string for line 3, just like lineOne above, but doesn't do anything until TypeLineThree is called.
function lineThree (string : String){
if(canReceive3 == true){
canReceive3 = false;
line3 = string;
line3left = line3.Length;
}
}

//this receives the string for line 4, just like lineOne above, but doesn't do anything until TypeLineFour is called.
function lineFour (string : String){
if(canReceive4 == true){
canReceive4 = false;
line4 = string;
line4left = line4.Length;
}
}

//now we start typing out each character for line one
function TypeLineOne () {
//if the string line1 is not empty, we do it.
if(line1 != null){
//we make the string an array, then type each one out one by one
	for (var letter in line1.ToCharArray()) {
		// if cantalk is true, we add a letter.
		if(canTalk == true){
		line1GUI.guiText.text += letter;
		//then we subtract one from the total length of hte string
		line1left -= 1;
		//if the length hits 0 or is somehow less than 0, we stop trying to add more to the line, and move on to the next line
		if(line1left <= 0){
		//here we set this line state to false
		line1State = false;
		//then set line 2 to true
		line2State = true;
		//then we move to TypeLineTwo to work on that line.
		TypeLineTwo();
		}
		//when we play the sound for each character, we just want to make sure its not a space.
		if(letter != " "){
		audio.PlayOneShot(talkSound);
		}
		//we pause for the same amount of time as letterPause thats set in the private variables section
		yield WaitForSeconds (letterPause);
		}
	}
}
}

//this process is the same as function TypeLineOne ()
function TypeLineTwo () {
if(line2 != null){
	for (var letter in line2.ToCharArray()) {
		if(canTalk == true){
		line2GUI.guiText.text += letter;
		line2left -= 1;
		if(line2left <= 0){
		line2State = false;
		line3State = true;
		TypeLineThree();
		}
		if(letter != " "){
		audio.PlayOneShot(talkSound);
		}
		yield WaitForSeconds (letterPause);
		}
	}
}	
}

//this process is the same as function TypeLineOne ()
function TypeLineThree () {
if(line3 != null){
	for (var letter in line3.ToCharArray()) {
		if(canTalk == true){
		line3GUI.guiText.text += letter;
		line3left -= 1;
		if(line3left <= 0){
		line3State = false;
		line4State = true;
		TypeLineFour();
		}
		if(letter != " "){
		audio.PlayOneShot(talkSound);
		}
		yield WaitForSeconds (letterPause);
		}
	}		
}
}

//this process is the same as function TypeLineOne ()
function TypeLineFour () {
if(line4 != null){
	for (var letter in line4.ToCharArray()) {
		if(canTalk == true){
		line4GUI.guiText.text += letter;
		line4left -= 1;
		if(line4left <= 0){
		line1State = false;
		line2State = false;
		line3State = false;
		line4State = false;
		}
		if(letter != " "){
		audio.PlayOneShot(talkSound);
		}
		yield WaitForSeconds (letterPause);
		}
	}
}	
}

//when we are called to clear the strings, we do so. That way the guiText strings won't accidentally add to something that already exists. Instead its refreshed so it can be used over and over.
function clearStrings () {
line1GUI.guiText.text = null;
line2GUI.guiText.text = null;
line3GUI.guiText.text = null;
line4GUI.guiText.text = null;
canTalk = false;
canReceive1 = true;
canReceive2 = true;
canReceive3 = true;
canReceive4 = true;
}
