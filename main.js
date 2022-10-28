objects= [];
status1= "";
song1 = "";

function preload(){
    song1 = loadSound("alarm.mp3");
}

function setup(){
    canvas = createCanvas(640,420);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(640,420);
    video.hide();
    objectDetection= ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("Model Loaded!");
    status1 = true;
    
}

function gotResult(error,results){
    console.log(results);
    if (error){
        console.log(error);
    }
    else{
        
        console.log(results);
        objects= results;
    }
}

function draw(){
    image(video,0,0,640,420);
    if(status1!= ""){
    objectDetection.detect(video,gotResult);
    document.getElementById("status").innerHTML= "Status : Object Detected";
    document.getElementById("status").className="btn btn-info";
    document.getElementById("baby").innerHTML = "Baby is Found ";

    length = objects.length;
    r = random(255);
    g = random(225);
    b = random(225);
    for(i=0;i<length;i++){
        object_name = objects[i].label;
        object_x = objects[i].x;
        object_y = objects[i].y;
        object_width = objects[i].width;
        object_height = objects[i].height;
        object_confidence = floor(objects[i].confidence*100);

        fill(r,g,b);
        noFill();
        text(object_name + " " + object_confidence + "%" , object_x + 15, object_y + 15);
        stroke(r,g,b);
        rect(object_x, object_y, object_width, object_height);
    }}
    else{
        document.getElementById("baby").innerHTML = "Baby is not Found ";
        song1.play();
        song1.setVolume(1);
        song1.rate(1);
    }
}