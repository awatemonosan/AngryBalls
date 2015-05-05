#pragma strict
private var follow : Transform;
function Start(){
  follow = this.transform;
  StartCoroutine("Disable",12.0);
}
function FixedUpdate () {
  Camera.main.transform.position = Vector3.Lerp(
    Camera.main.transform.position, //<-- interpolate from here...
    follow.position+Camera.main.transform.rotation*Vector3.back*10, //<-- to here..
  	0.1 //<-- distance to travel ( 1/10th )
  );
}
function OnCollisionEnter(collision : Collision){
  if(follow===this.transform){
    if(collision.rigidbody){
      follow = collision.transform;
    }
  }
  StartCoroutine("Disable",3.0);
}
function Disable( waitTime : float ){
  yield WaitForSeconds(waitTime);
  this.enabled=false;
}