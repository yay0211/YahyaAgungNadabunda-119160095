let vs = [];
let burger;
function setup() {
  createCanvas(windowHeight, windowWidth);
  v = new Vehicle(200,200);
  burger = loadImage('burger.jpg');
}

function draw() {
  background(220);
  
  v.display()
  v.edges()
  v.update();
  v.wander();
  
}

class Vehicle{
  constructor(x,y){
    this.location = createVector(x,y);
    this.velocity = createVector(0,0);
    this.acceleration = createVector(0,0);
    this.l = 30;
    this.maxspeed = 2;
    this.maxforce = 0.1;
    this.wanderTheta = PI/2;
  }
  
  wander(){
    //let steeringForce = p5.Vector.random2D()
    //steeringForce.setMag(0.1)
    //this.applyForce(steeringForce)
    //kalo gak di copy sama dengan vector nanti berubah
    let projVector = this.velocity.copy();
    projVector.setMag(100);
    let projPoint = projVector.add(this.location);
    //buat jari-jari
    let wanderRadius = 50;
    // buat sudut
    let theta = this.wanderTheta + this.velocity.heading();
    // buat x
    let xBar = wanderRadius * cos(theta);
    let yBar = wanderRadius * sin(theta);
    // membuat wander point
    let wanderPoint = p5.Vector.add(projPoint, createVector(xBar,yBar));
     let debug = true;
    
    if(debug){
      //pengaturan warna dan tampilan
      push()
      
      //noStroke()
      image(burger, projPoint.x, projPoint.y, 50, 50)
      //circle(projPoint.x, projPoint.y, 8)
      noFill();
      stroke("red");
      
      line(this.location.x, this.location.y, wanderPoint.x, wanderPoint.y);
      rect(wanderPoint.x, wanderPoint.y, 16)
      pop()
      
      
    }
    
    //membuat steering force
    let steeringForce = wanderPoint.sub(this.location);
    steeringForce.setMag(this.maxforce);
    this.applyForce(steeringForce);
    
    //+= menambahkan nilai lama dengan bilangan acak
    
    this.wanderTheta += random(-0.3, 0.3);
    //this.wanderTheta = this.wanderTheta +random(rentang)
    
   
  }
  
  seek(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    desired.normalize();
    desired.mult(this.maxspeed);
    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  arrive(vektorTarget){
    // percieve target location
    var desired = p5.Vector.sub(vektorTarget, this.location);
    var jarak = desired.mag()

    if (jarak < 100){
      var m = map(jarak, 0, 100, 0, this.maxspeed);
      desired.normalize();
      desired.mult(m);
      
    }
    else{
      desired.normalize();
      desired.mult(this.maxspeed);    
    }

    
    //kemudi
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce);
    this.applyForce(steer);
  }
  
  
  update(){
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxspeed);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
  }
  applyForce(force){
    this.acceleration.add(force);
  }
  display(){
    var theta = this.velocity.heading()// + PI/2;
    push();
    fill(175);
    stroke(0);
    translate(this.location.x, this.location.y)
    rotate(theta)
    
   //bagian kepala
  //Kepala
  //ellipse(300,50,20,30);
    fill("white")
  ellipse(-18, 2.2*this.l, 35,50)
  //ellipse(300,50,10,20);
    fill("white")
  ellipse(-18,2.2*this.l, 20,40)
  //point(298,48)
    fill("black")
  ellipse(-15,2.4*this.l,1,1)
  ellipse(-20,2.4*this.l,1,1 )
  //point(301,48)
  
  ////badan bawah
  //rect(286, 105, 30, 50, radians(500), radians(500))
    fill("white")
    rect(-50, 3*-this.l, 60,70, radians(500),radians(500))
    ////badan atas
  //rect(281,65, 40, 50, radians(500), radians(500))
    rect(-55,-this.l,70,70, radians(500),radians(500))
    pop();
  }

  edges() {
    if (this.location.x > width + 10) {
      this.location.x = -10;
    } else if (this.location.x < -10) {
      this.location.x = width + 10;
    }
    if (this.location.y > height + 10) {
      this.location.y = -10;
    } else if (this.location.y < -10) {
      this.location.y = height + 10;
    }
  }

}


