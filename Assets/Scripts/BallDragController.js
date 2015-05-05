//Confused about anything? click help in unity and search the documentation.
//  they have explained everything better there then I ever could.
#pragma strict
//----------------------------------------------------------------------------//
//HELPER FUNCTIONS
/* -theses are part of a c# library that can be found here:

    I converted parts that I needed to javascript. I might convert the whi
*/

var SignedDistancePlanePoint = function( planeNormal : Vector3, planePoint : Vector3, point : Vector3 ){
  
  return Vector3.Dot(planeNormal, (point - planePoint));
};

var SetVectorLength = function( vector : Vector3, size : float ){
  var vectorNormalized = Vector3.Normalize(vector);
  vector = vectorNormalized * size;
  return vector;
};

var ProjectPointOnPlane = function(planeNormal : Vector3, planePoint : Vector3, point : Vector3){
  var distance : Number;
  var translationVector : Vector3;

  //First calculate the distance from the point to the plane:
  distance = SignedDistancePlanePoint(planeNormal, planePoint, point);

  //Reverse the sign of the distance
  distance *= -1;

  //Get a translation vector
  translationVector = SetVectorLength(planeNormal, distance);

  //Translate the point to form a projection
  return point + translationVector;
};

//----------------------------------------------------------------------------//
//INPSECTOR VARIABLES
//  -Inspector variables go in the global scope

var maxDistance = 5;
var power=10;
var planeNormal = new Vector3(0,0,1);
//This is the plane that the ball will be launched on.
//It defaults to a plane perfect for side scrolling action
//  but it can take other values to achive diffenet dynamics.

//Check the example scenes


//These I don't want showing up in the inspector...
@HideInInspector
var startPosition : Vector3;

@HideInInspector
var clicked = false;

//----------------------------------------------------------------------------//
function Start () {
  //Store the start position.
  //  It is used later as a frame of reference when launching the ball
  this.startPosition = transform.position;
}

function Update () {
  //    If I am not being clicked
  if(!this.clicked){
    //    If the left mouse button is down
    if(Input.GetMouseButton(0)){
      //    construct a ray from the cameras position in the direction the mouse is pointing.
      var ray : Ray = Camera.main.ScreenPointToRay (Input.mousePosition);
      //    construct a RaycastHit to hold the results from the upcoming raytrace.
      var hit : RaycastHit;
      //    boom, raytrace. told ya
      if (Physics.Raycast (ray, hit, 100.0)){
        //    if the ray hit me
        if(hit.transform===this.transform){
          //    I am now clicked.
          this.clicked=true;
        }
      }
    }
  } else {
    //    get the mouses world position
    var position = Input.mousePosition;
      position.z = 10.0;
      position = Camera.main.ScreenToWorldPoint(position);
    //    snap to nearest point on my launch plane (planeNormal)
    position = ProjectPointOnPlane(planeNormal, this.startPosition, position);
    //    if over max distance, put within max distance
    if(Vector3.Distance(position,this.startPosition)>this.maxDistance){
      position=position-this.startPosition;
      position=SetVectorLength(position,this.maxDistance);
      position=position+this.startPosition;
    }
    //    finally, set the position
    this.transform.position = position;
    //    if the mouse button was just released...
    if(Input.GetMouseButtonUp(0)){
      //    launch me toward my this.start
      gameObject.GetComponent(Rigidbody).useGravity=true;
      gameObject.GetComponent(Rigidbody).velocity = (this.startPosition - transform.position) * power;
      
      gameObject.GetComponent(BallFlightController).enabled=true;
      this.enabled=false;
    }
  }
}