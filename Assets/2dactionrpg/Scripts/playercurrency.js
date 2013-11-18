#pragma strict

//here are the 2 sounds we use when we either buy something or pick up a gem.
var purchaseSound:AudioClip;
var gemSound:AudioClip;

//here are 2 private variables we use to manage how much money the player has and the money gui in the top left corner of the screen.
private var money:int;
private var moneygui:GameObject;

//on start we check some stuff to figure out currency
function Start () {
//we check to see how much money was saved
PlayerPrefs.SetFloat("money", PlayerPrefs.GetFloat("money"));
//then apply it to the variable money
money = PlayerPrefs.GetFloat("money");
//then find the guitext that shows how much money we have
moneygui = GameObject.Find("permanentobjects/GUI/moneygui/moneytext");
//then update the string to show how much money we have
moneygui.guiText.text = money.ToString();
}

//whenever this script is enabled, we check money again just in case, start does not occur if an object/script is activated or deactivated.
function OnEnable () {
money = PlayerPrefs.GetFloat("money");
moneygui = GameObject.Find("permanentobjects/GUI/moneygui/moneytext");
moneygui.guiText.text = money.ToString();
}

//if we receive a message from itemforpurchase, we subtract our money and update it.
function itemPrice (price : int) {
//play the sound when somethings purchased.
audio.PlayOneShot(purchaseSound);
money -= price;
updateMoney();
}

//if we get hit by a trigger, we check to see if it was a gem, if it was we get more money.
function OnTriggerEnter (other : Collider) {
if(other.tag == "gem"){
//destroy the gem
Destroy(other.gameObject);
//play the gem sound
audio.PlayOneShot(gemSound);
//we have money get added by 5 here. just change the number here if you want it to be different!
money += 5;
//we update our money and guitext
updateMoney();
}
}

//here is where we update how much money we have, then update the guitext when needed.
function updateMoney () {
PlayerPrefs.SetFloat("money", money);
moneygui.guiText.text = money.ToString();
}