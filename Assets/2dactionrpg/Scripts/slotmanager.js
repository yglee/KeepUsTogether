#pragma strict

//this script is attached to guitexture slots in the inventory guiobject. we manage what item is designated to this slot
//this string needs to be the same id at the item when or if its purchased.
var itemId:String;

//when a slot is enabled, we check to see if theres an itemid set to it
function OnEnable () {
//if the string length of the itemid is greater than zero that means something was typed in as the item id.
if(itemId.Length > 0){
//then we check the state of that id, to see if it was purchased or wants is accessible. 
var idState = PlayerPrefs.GetFloat(itemId);
//if its 0 it cannot be accessible, and we turn the guitexture for this slot off.
if(idState == 0){
guiTexture.enabled = false;
//if its NOT 0 then it is accessible and we turn it on so the player can access that item.
}else{
guiTexture.enabled = true;
}
}else{
guiTexture.enabled = false;
}
}