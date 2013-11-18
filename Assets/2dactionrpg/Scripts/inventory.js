#pragma strict

//here are all the public variables used to manage the inventory system. The kit currently only uses 4 of the slots, but we built one that supports up
//to 16 so people will be able to easily add more items for a more complete game.
var selection:GUITexture;
var selectSound:AudioClip;
var slot1:GUITexture;
var slot2:GUITexture;
var slot3:GUITexture;
var slot4:GUITexture;
var slot5:GUITexture;
var slot6:GUITexture;
var slot7:GUITexture;
var slot8:GUITexture;
var slot9:GUITexture;
var slot10:GUITexture;
var slot11:GUITexture;
var slot12:GUITexture;
var slot13:GUITexture;
var slot14:GUITexture;
var slot15:GUITexture;
var slot16:GUITexture;

//here are private variables we use to manage the gui
//this is used for showing the name of the gui object that the mouse is hovering over.
private var guiSelect : GUILayer;
//this is set to the gui texture that shows the item selected in the single box while the player is not in inventory
private var itemSelected:GameObject;
//this is a variable used so touch screens work.
private var touching = false;
//this is a string we use for using arrows to make a selection
private var selectString:String;

function OnEnable () {
//we set the guiSelect to the camera's gui layer. this is where the all gui compenents reside, including inventory when its activated.
guiSelect = Camera.main.GetComponent(GUILayer);
}

function Start () {
//this finds the gui texture that shows the object the player has equipped when the player is not in inventory
itemSelected = GameObject.Find("GUI/itemselected");
//this sets the slotSet to 1 so when the game first starts, the player will have the sword equipped.
PlayerPrefs.SetFloat("slotSet", 1);
}

function Update() {
//if we press the mouse button or a touch screen, we'll check to see if a slot was touched.
if(Input.GetMouseButtonDown(0) || Input.touchCount > 0 && touching == false){
	touching = true;
	if(guiSelect.HitTest(Input.mousePosition) != null) {
//		print(guiSelect.HitTest(Input.mousePosition).name);
//now we call the makeSelection function and send the name of the gui object we clicked/touched.
	makeSelection(guiSelect.HitTest(Input.mousePosition).name);
	}
}
if(Input.touchCount == 0){
touching = false;
}

//we check to make sure guiSelect is not null so that we can always highlight an object. This is not required but it is just a failsafe in case
//guiselect was not applied correctly.
if(guiSelect == null){
guiSelect =  Camera.main.GetComponent(GUILayer);
}

//we check to see if the player wants to move in the inventory with wasd or arrows
if(Input.GetKeyDown("a") || Input.GetKeyDown("left")){
if(PlayerPrefs.GetFloat("slotSet") > 1){
selectString = "slot" + (PlayerPrefs.GetFloat("slotSet")-1);
goUp(selectString);
}
}

if(Input.GetKeyDown("d") || Input.GetKeyDown("right")){
if(PlayerPrefs.GetFloat("slotSet") < 16){
selectString = "slot" + (PlayerPrefs.GetFloat("slotSet")+1);
goDown(selectString);
}
}

if(Input.GetKeyDown("w") || Input.GetKeyDown("up")){
if(PlayerPrefs.GetFloat("slotSet") > 4){
selectString = "slot" + (PlayerPrefs.GetFloat("slotSet")-4);
goUp(selectString);
}
}

if(Input.GetKeyDown("s") || Input.GetKeyDown("down")){
if(PlayerPrefs.GetFloat("slotSet") < 13){
selectString = "slot" + (PlayerPrefs.GetFloat("slotSet")+4);
goDown(selectString);
}
}

//end of function update	
}

//this block is to check to see if the player wants to select an item that has an empty space in between those items, moving upward through the slots
function goUp (selected : String){
	if(selected == "slot16" && slot16.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot16"){selected = "slot15";}}
	if(selected == "slot15" && slot15.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot15"){selected = "slot14";}}
	if(selected == "slot14" && slot14.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot14"){selected = "slot13";}}
	if(selected == "slot13" && slot13.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot13"){selected = "slot12";}}
	if(selected == "slot12" && slot12.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot12"){selected = "slot11";}}
	if(selected == "slot11" && slot11.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot11"){selected = "slot10";}}
	if(selected == "slot10" && slot10.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot10"){selected = "slot9";}}
	if(selected == "slot9" && slot9.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot9"){selected = "slot8";}}
	if(selected == "slot8" && slot8.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot8"){selected = "slot7";}}
	if(selected == "slot7" && slot7.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot7"){selected = "slot6";}}
	if(selected == "slot6" && slot6.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot6"){selected = "slot5";}}
	if(selected == "slot5" && slot5.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot5"){selected = "slot4";}}
	if(selected == "slot4" && slot4.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot4"){selected = "slot3";}}
	if(selected == "slot3" && slot3.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot3"){selected = "slot2";}}
	if(selected == "slot2" && slot2.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot2"){selected = "slot1";}}
	if(selected == "slot1" && slot1.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot1"){selected = "slot16";}}
}

//this block is to check to see if the player wants to select an item that has an empty space in between those items, moving downward through the slots
function goDown (selected : String){
	if(selected == "slot1" && slot1.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot1"){selected = "slot2";}}
	if(selected == "slot2" && slot2.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot2"){selected = "slot3";}}
	if(selected == "slot3" && slot3.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot3"){selected = "slot4";}}
	if(selected == "slot4" && slot4.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot4"){selected = "slot5";}}
	if(selected == "slot5" && slot5.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot5"){selected = "slot6";}}
	if(selected == "slot6" && slot6.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot6"){selected = "slot7";}}
	if(selected == "slot7" && slot7.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot7"){selected = "slot8";}}
	if(selected == "slot8" && slot8.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot8"){selected = "slot9";}}
	if(selected == "slot9" && slot9.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot9"){selected = "slot10";}}
	if(selected == "slot10" && slot10.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot10"){selected = "slot11";}}
	if(selected == "slot11" && slot11.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot11"){selected = "slot12";}}
	if(selected == "slot12" && slot12.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot12"){selected = "slot13";}}
	if(selected == "slot13" && slot13.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot13"){selected = "slot14";}}
	if(selected == "slot14" && slot14.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot14"){selected = "slot15";}}
	if(selected == "slot15" && slot15.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot15"){selected = "slot16";}}
	if(selected == "slot16" && slot16.guiTexture.enabled == true){makeSelection(selected);}else{if(selected == "slot16"){selected = "slot1";}}
}

//here is the function that happens when a guiobject is clicked on.
function makeSelection(selected : String) {
//if the name of the object is slot1 we do stuff.
if(selected == "slot1" && slot1.guiTexture.enabled == true){
//we set the selection guitexture to the same position of the slot so it looks highlighted.
selection.transform.position = Vector3(slot1.transform.position.x,slot1.transform.position.y,2);
//we set the itemselected texture to the same texture as the object selected so the player can see what he/she has selected while playing.
itemSelected.guiTexture.texture = slot1.guiTexture.texture;
//we set the slotset to 1 and save it.
PlayerPrefs.SetFloat("slotSet", 1);
}
//the same process is repeated for each slot, depending on which slot the player selected, just like described above in slot 1, for all 16 slots.
if(selected == "slot2" && slot2.guiTexture.enabled == true){
selection.transform.position = Vector3(slot2.transform.position.x,slot2.transform.position.y,2);
itemSelected.guiTexture.texture = slot2.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 2);
}
if(selected == "slot3" && slot3.guiTexture.enabled == true){
selection.transform.position = Vector3(slot3.transform.position.x,slot3.transform.position.y,2);
itemSelected.guiTexture.texture = slot3.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 3);
}
if(selected == "slot4" && slot4.guiTexture.enabled == true){
selection.transform.position = Vector3(slot4.transform.position.x,slot4.transform.position.y,2);
itemSelected.guiTexture.texture = slot4.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 4);
}
if(selected == "slot5" && slot5.guiTexture.enabled == true){
selection.transform.position = Vector3(slot5.transform.position.x,slot5.transform.position.y,2);
itemSelected.guiTexture.texture = slot5.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 5);
}
if(selected == "slot6" && slot6.guiTexture.enabled == true){
selection.transform.position = Vector3(slot6.transform.position.x,slot6.transform.position.y,2);
itemSelected.guiTexture.texture = slot6.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 6);
}
if(selected == "slot7" && slot7.guiTexture.enabled == true){
selection.transform.position = Vector3(slot7.transform.position.x,slot7.transform.position.y,2);
itemSelected.guiTexture.texture = slot7.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 7);
}
if(selected == "slot8" && slot8.guiTexture.enabled == true){
selection.transform.position = Vector3(slot8.transform.position.x,slot8.transform.position.y,2);
itemSelected.guiTexture.texture = slot8.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 8);
}
if(selected == "slot9" && slot9.guiTexture.enabled == true){
selection.transform.position = Vector3(slot9.transform.position.x,slot9.transform.position.y,2);
itemSelected.guiTexture.texture = slot9.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 9);
}
if(selected == "slot10" && slot10.guiTexture.enabled == true){
selection.transform.position = Vector3(slot10.transform.position.x,slot10.transform.position.y,2);
itemSelected.guiTexture.texture = slot10.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 10);
}
if(selected == "slot11" && slot11.guiTexture.enabled == true){
selection.transform.position = Vector3(slot11.transform.position.x,slot11.transform.position.y,2);
itemSelected.guiTexture.texture = slot11.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 11);
}
if(selected == "slot12" && slot12.guiTexture.enabled == true){
selection.transform.position = Vector3(slot12.transform.position.x,slot12.transform.position.y,2);
itemSelected.guiTexture.texture = slot12.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 12);
}
if(selected == "slot13" && slot13.guiTexture.enabled == true){
selection.transform.position = Vector3(slot13.transform.position.x,slot13.transform.position.y,2);
itemSelected.guiTexture.texture = slot13.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 13);
}
if(selected == "slot14" && slot14.guiTexture.enabled == true){
selection.transform.position = Vector3(slot14.transform.position.x,slot14.transform.position.y,2);
itemSelected.guiTexture.texture = slot14.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 14);
}
if(selected == "slot15" && slot15.guiTexture.enabled == true){
selection.transform.position = Vector3(slot15.transform.position.x,slot15.transform.position.y,2);
itemSelected.guiTexture.texture = slot15.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 15);
}
if(selected == "slot16" && slot16.guiTexture.enabled == true){
selection.transform.position = Vector3(slot16.transform.position.x,slot16.transform.position.y,2);
itemSelected.guiTexture.texture = slot16.guiTexture.texture;
PlayerPrefs.SetFloat("slotSet", 16);
}
//we get the length of the string selected so we can play a sound when a slot is selected. we only want it to play a sound if an active slot is selected
//so we just check to see if the first 4 letters of the object = slot before we play a sound.
if(selected.Length == 5){
var tempSel = selected.Substring(0,selected.Length-1);
}
if(selected.Length == 6){
tempSel = selected.Substring(0,selected.Length-2);
}
//here we verify that the first 4 letters in the name of the gui layer we selected is slot, if so, we play a sound. slots that don't have an
//item id attached aren't activated so they can't be selected.
if(tempSel == "slot"){
audio.PlayOneShot(selectSound);
}
//end of makeSelection
}
