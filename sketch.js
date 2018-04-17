var ball;
var speedScale=1;

function setup() {
  createCanvas(windowWidth,windowHeight);
  ball=new BowlingBall();
  // pixelDensity(1)
}

function draw() {
  
  background(0);
  if(frameRate()){
    
    ball.update();
    ball.display();
    ball.showVel();
    
    if(ball.pos.x>width){
      ball.reset();
    }
    // ball.graphPos()
    // ball.graphVel()
    //ball.showGraphs();
  }
}
function BowlingBall(){
  this.pos=createVector(50,height/2);
  this.vel=createVector(0,0);
  this.diam=30;
  this.axisOffset=20;
  this.speedIncrement=createVector(20,0);
  this.timeIncrement=1;
  this.lastUpdate=-1
  this.velGraph;
  this.posGraph;

  //this.posGraph;
  
  //this.posGraph.pixelDensity(1)
  this.reset=function(){
    
    this.pos=createVector(50,height/2);
    this.vel=createVector(0,0);
  }
  
  this.update=function(){
    //updateSpeed?
    var currentTimeStep=floor((millis()/1000)/this.timeIncrement)*this.timeIncrement;
    
    console.log(currentTimeStep)
    if(currentTimeStep>this.lastUpdate){
      this.lastUpdate=currentTimeStep;
      this.vel.x+=this.speedIncrement.x*speedScale
      fill(255,0,0)
      ellipse(this.pos.x-this.diam/2,this.pos.y,this.diam,this.diam)
      console.log(currentTimeStep + " < " + this.lastUpdate)
    }
    this.pos.x+=this.vel.x/frameRate()
    
  }
  this.display=function(){
    fill(0,0,255);
    ellipse(this.pos.x,this.pos.y,this.diam,this.diam)
  }
  this.showVel=function(){
    fill(255)
    text(this.vel.x+" pix/s", this.pos.x,this.pos.y)
    push()
    stroke(255)
    arrow(this.pos.x,this.pos.y+this.diam/2,this.pos.x+this.vel.x,this.pos.y+this.diam/2)
    pop()
    
  }
  this.graphVel=function(){
    this.velGraph.push();
    
   
    this.velGraph.translate(this.axisOffset,-this.axisOffset);
    this.velGraph.stroke(255,0,0);
    this.velGraph.point(millis()/50,this.velGraph.height - this.vel.x)
    
    this.velGraph.pop()
  }
  
  
  this.getCleanGraph=function(_width,_height,_offset,_xAxis,_yAxis,_scaleX,_scaleY){
    var graph=createGraphics(_width,_height);
    graph.pixelDensity(1)
    graph.stroke(155);
    graph.fill(255)
    graph.line(_offset,0,_offset,graph.height);
    graph.line(0,graph.height-_offset,graph.width,graph.height-_offset);
    graph.line(0,graph.height-_offset,graph.width,graph.height-_offset);
    graph.noStroke();
    
    graph.text(_yAxis,_offset/4,_offset+10);
    graph.textAlign(RIGHT)
    graph.text(_xAxis,graph.width-_offset,graph.height-_offset);
    
    return graph;
  }
  this.resetGraphs=function(){
    this.posGraph=this.getCleanGraph(width,height/2,this.axisOffset,"time (s)","pos (m)",100,100)
    this.velGraph=this.getCleanGraph(width,height/2,this.axisOffset,"time (s)","vel (m/s)",100,100)
    
  
    
    // this.velGraph.stroke(155);
    // this.velGraph.line(this.axisOffset,0,this.axisOffset,this.velGraph.height);
    // this.velGraph.line(0,this.velGraph.height-this.axisOffset,this.velGraph.width,this.velGraph.height-this.axisOffset);
  }
  this.graphPos=function(){
    this.posGraph.push();
    
    this.posGraph.stroke(155);
    this.posGraph.translate(this.axisOffset,-this.axisOffset);
    this.posGraph.stroke(255,0,0);
    this.posGraph.point(millis()/50,this.velGraph.height - this.pos.x)
    
    this.posGraph.pop()
  }
  this.showGraphs=function(){
    image(this.posGraph,0,0,width,height/2)
    image(this.velGraph,0,height/2,width,height/2)
  }
  this.resetGraphs()
  
}
function arrow(_x,_y,_x2,_y2,_graphics){
  if(_graphics){
    
    
  }else{
    
    line(_x,_y,_x2,_y2);
    var direction=createVector(_x-_x2,_y-_y2);
    direction.normalize();
    //if(dist(_x,_y,_x2,_y2)>5){
      triangle(_x2,_y2,
      _x2+direction.y*5+direction.x*10,_y2+direction.x*-5+direction.y*10,
      _x2+direction.y*-5+direction.x*10,_y2+direction.x*5+direction.y*10)
    //}
    
  }
  

}
function keyPressed(){
  ball.reset();
}
