#pragma strict

//This is what manages the menu when the player clicks either continue or new game.

//setting a "fake" texture that actually has no texture applied to make sure GUI.Button doesn't add extra graphics to it.
//if we don't do this, unity will assume that we want default buttons with graphics. It would not look good in this game.
private var blankGfx:Texture;

function OnGUI () {
//Continue Button
if(GUI.Button(Rect(Screen.width/3,Screen.height/5*2,Screen.width/3,Screen.height/5), blankGfx, "")){
//this loads the game without deleting of the preferences saved during play.
Application.LoadLevel("playerhouse");
}
//New Game Button
if(GUI.Button(Rect(Screen.width/3,Screen.height/5*3,Screen.width/3,Screen.height/5), blankGfx, "")){
//This deletes all PlayerPrefs saved during the game such as gems, weapons purchased, and opened chests.
PlayerPrefs.DeleteAll();
Application.LoadLevel("playerhouse");
}
}