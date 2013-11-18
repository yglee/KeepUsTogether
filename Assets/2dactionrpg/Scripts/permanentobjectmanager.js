#pragma strict

//this is the script that manages objects that carry over to all scenes like the gui stuff, the player, etc. 
//all objects that are children of the object that this script is attached to will carry over into all scenes.

function Start () {
//on start we call dontdestroyonload so it never is destroyed when a new scene loads. this carrys the object over into other scenes.
DontDestroyOnLoad(gameObject);
}

//when a new level is loaded, we check to see if the the scene is the menu, so we can deactivate or reactivate all of the children objects.
function OnLevelWasLoaded () {
if(Application.loadedLevelName == "menu"){
//we create an array of all the objects that are children, then deactivate all of them if its the menu.
	for( var i = 0; i < transform.childCount; ++i ){
		transform.GetChild(i).gameObject.SetActive(false);
	}
//if the scene is not the menu, we make sure all children are activated using the same process above.
}else{
	for( i = 0; i < transform.childCount; ++i ){
		transform.GetChild(i).gameObject.SetActive(true);
	}
}
}