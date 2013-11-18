#pragma strict

//this is the id of the item that the player is purchasing. this is used to save into playerprefs if its purchased its saved. The itemid is for the slot it goes into. it has to be the same.
var itemId:String;
//heres the price required to purchase it.
var price:int = 0;
//heres the quantity of the purchased item. It will set the saved variable to the number quantity is set to.
var quantity:int = 0;
//this is to check to see if this item can only be purchased once. 
var singlePurchase = true;
//this is the text that shows what the price is.
var priceText:GameObject;

function Start () {
//if single purchase is true and the itemid's saved variable is greater than 0, we take it away because it can't be purchased again
if(singlePurchase == true && PlayerPrefs.GetFloat(itemId) > 0){
gameObject.SetActive(false);
}
//if we don't have enough money, we change the color of the price text so it indicates that you have enough money or not.
if(PlayerPrefs.GetFloat("money") < price){
priceText.GetComponent(MeshRenderer).material.color = Vector4(1,0,0,1);
}else{
priceText.GetComponent(MeshRenderer).material.color = Vector4(0,1,0,1);
}
}


function Update () {
//if the player presses e any time while he's around inventory, the start function will be called again to make sure that id's are updated and colors of the price text change if we don't have enough money anymore.
if(Input.GetKeyDown("e")){
Start();
}
}

function OnTriggerStay (other : Collider) {
//if the player presses e, we check to see if the player is in fact in the collider trigger area to start the transaction.
if(Input.GetKeyDown("e")){
if(other.name == "Player"){
	//if the player has enough money, we go ahead and make the transaction.
	if(PlayerPrefs.GetFloat("money") >= price){
		//if singlepurchase is true, we update our money by sending the player how much it was as a function message, then we update our inventory so we can access the item right away.
		if(singlePurchase == true){
			PlayerPrefs.SetFloat(itemId, 1);
			other.BroadcastMessage("itemPrice", price, SendMessageOptions.DontRequireReceiver);
			other.BroadcastMessage("inventoryFix", SendMessageOptions.DontRequireReceiver);
			//now we take the object away because its a single purchase
			gameObject.SetActive(false);
		}else{
		//if its not a single, we leave the item there and just update our price and inventory without disabling the item.
			PlayerPrefs.SetFloat(itemId, PlayerPrefs.GetFloat(itemId)+quantity);
			other.BroadcastMessage("itemPrice", price, SendMessageOptions.DontRequireReceiver);
			other.BroadcastMessage("inventoryFix", SendMessageOptions.DontRequireReceiver);
		}
}
}
}

}


