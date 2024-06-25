status = "";
object_to_find = "";
objects = [];

function preload(){

}

function setup(){
    canvas = createCanvas(700, 350);
    canvas.position(300, 230);
    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_to_find = document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("Model Loaded!!");
    status = true;
}

function draw(){
    image(video, 0, 0, 700, 350);
    if(status != ""){
        for(i = 0; i < objects.length; i++){
            detector.detect(video, gotResult);
            document.getElementById("status").innerHTML = "Status : Objects Detected";

            fill("FF0000")
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == object_to_find){
                video.stop();
                detector.detect(video, gotResult);
                document.getElementById("result").innerHTML = object_to_find + " Found!!"
            }
        }
    }
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }else{
        console.log(results);
        objects = results;
    }
}

function speak(){
    speech = window.speechSynthesis;
    speak_data = object_to_find + " is found";
    utterThis = new SpeechSynthesisUtterance(speak_data);
    speak(utterThis);
}