img="";
object=[];
status="";
function preload() {
    alarm=loadSound("alarm_beep_3.mp3");
}


function setup() {
    canvas=createCanvas(380,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectdectect=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Status:Object Detecting";
}
function modelLoaded() {
    console.log("Model Is Loaded");
    status=true;
}
function gotResult(error,result){
if (error) {
    console.error(error);
}
else{
    console.log(result);
    object=result;
}
}

function draw() {
    image(video,0,0,380,380);
    if(status!=""){
        r=random(255);
g=random(255);
b=random(255);
objectdectect.detect(video,gotResult);
for (i=0; i < object.length; i++)  {
    document.getElementById("status").innerHTML="Status:Objects Detected ";
 fill(r,g,b); 
 percent=floor(object[i].confidence * 100);
 text(object[i].label+" "+percent+"% ",object[i].x+15,object[i].y+15);
 noFill();
 stroke(r,g,b);
 rect(object[i].x,object[i].y,object[i].width,object[i].height );  
if(object[i].label=="person"){
document.getElementById("babystatus").innerHTML="Baby Found";
alarm.stop();
}
else{
   document.getElementById("babystatus").innerHTML="Baby Not Found";
   alarm.play(); 
}
if(object.length==0){
    document.getElementById("babystatus").innerHTML="Baby Not Found";
    alarm.play(); 
}
}
    }
}