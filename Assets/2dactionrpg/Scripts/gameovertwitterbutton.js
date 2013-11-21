#pragma strict

var twitterURL = "https://twitter.com/intent/tweet?text=Just%20played%20FWD.us%27s%20%23undocumented%20game%2C%20about%20the%20tough%20life%20of%20an%20undocumented%20immigrant.%20http%3A%2F%2Fwww.facebook.com%2Fundocumented";

function OnMouseDown() {
	Application.OpenURL(twitterURL);
}
