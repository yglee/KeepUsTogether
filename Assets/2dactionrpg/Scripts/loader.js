#pragma strict

//This script is simply to load the menu. We do this because a chunk of objects will be carried through scenes using DontDestroyOnLoad.
//The loader scene exists so these objects can only be loaded once and not duplicate, since loader can't be opened again through the game.

//here is the string that is typed into the inspector. It is set to load "menu".
var loadLevel:String;

function Start () {
//on start we load the menu.
Application.LoadLevel(loadLevel);
}