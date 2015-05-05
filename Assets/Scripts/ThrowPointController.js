#pragma strict

private var selection : GameObject;

var throwables : GameObject[];
private var wait : boolean;

function Start () {

}
function Update () {
  if(!selection){
  	this.wait=true;
    //all this to shift... uhg
    if(throwables.Length>0){
      var array = new Array (throwables);selection = array.Shift();throwables = array.ToBuiltin(GameObject) as GameObject[];
  	} else {
  	  Application.LoadLevel('Main');
  	}
  	selection.GetComponent(Rigidbody).useGravity=false;
    selection.GetComponent(Rigidbody).velocity=new Vector3();
  } else {
  	if(!selection.GetComponent(BallFlightController).enabled){
      Camera.main.transform.position = Vector3.Lerp(
        Camera.main.transform.position, //<-- interpolate from here...
        this.transform.position+Camera.main.transform.rotation*Vector3.back*10, //<-- to here..
        0.5 //<-- distance to travel (half way)
      );
    }
    if(this.wait){
      var position = Vector3.Lerp(selection.transform.position,this.transform.position,0.1);
      if(Vector3.Distance(this.transform.position,selection.transform.position)<0.1){
        selection.GetComponent(BallDragController).enabled=true;
        position=selection.transform.position;
        wait=false;
      }
      selection.transform.position = position;
    } else {
      if(!selection.GetComponent(BallDragController).enabled && !selection.GetComponent(BallFlightController).enabled){
        this.selection=null;
      }
    }
  }
}
