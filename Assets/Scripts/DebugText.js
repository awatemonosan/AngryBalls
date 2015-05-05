#pragma strict
import UnityEngine.UI;

function Start () {

}
var AvarageTouchPosition = function(){
  var pos = new Vector3();
  for (var touch : Touch in Input.touches) {
    pos.x+=touch.position.x;
    pos.y+=touch.position.y;
  }
  
  pos = pos / Input.touchCount;
  return pos;
};

function Update () {
	
  var position=Input.mousePosition;
  if(Input.touchCount>0){
	position = AvarageTouchPosition();
  }
  GetComponent(Text).text="Touches: "+Input.touchCount+"\nPosition: "+position;
}