#pragma strict

//here we have the 2 songs that play in the game. song1 is the town, and song2 is the wilderness song.
var song1:AudioClip;
var song2:AudioClip;

//here is a private variable audioclip that we use to check if the same song was asked to play. we want to avoid resetting the music so it doesn't sound crappy, so using this variable helps us check that easily.
private var queuedSong:AudioClip;

//if we receive a message from setsong in a scene to change it, we check to see which song it wants to play.
function setsong (songChoice : int){
if(songChoice == 1){
//if the choice was song1, we set the queued song to 1.
queuedSong = song1;
}
if(songChoice == 2){
//if the choice was song2, we set the queued song to 2.
queuedSong = song2;
}
//now we check to see if the queued song is the same as the song already playing or not. if it isn't, we make the audio.clip the new song and start playing it.
if(queuedSong != audio.clip){
audio.clip = queuedSong;
audio.Play();
}
}