Everything_I_wanted = "";
Ilomilo = "";
leftWristX =  0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
score_leftWrist = 0;
score_rightWrist = 0;
status_of_song1 = "";
status_of_song2 = "";


function preload()
{
    Everything_I_wanted = loadSound("everythingiwant");
    Ilomilo = loadSound("ilomilo1");
}
function setup()
{
    canvas= createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(videos, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log("PoseNet has initialized");
}
function gotPoses()
{
    if (results.length > 0)
    {
        score_leftWrist = results[0].pose.keypoints[9].score;
        score_rightWrist = results[0].pose.keypoints[10].score;

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristX + "LeftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("RightWristX = " + rightWristX + "RightWristY = " + rightWristY);

    }
}

function draw()
{
    image(video, 0,0,600,500);
    status_of_song1 = Everything_I_wanted.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");

    if (score_leftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        Ilomilo.stop()

        if(status_of_song1 = "false")
        {
            Everything_I_wanted.play();
            document.getElementById("name").innerHTML = "Song name is " + "Everything I wanted";
        }
    }
    status_of_song2 = Ilomilo.isPlaying();
    
    if(score_rightWrist > 0.2)
    {
    circle(rightWristX,rightWristY,20);
    Everything_I_wanted.stop()
    if(status_of_song2 = "false")
    {
        Ilomilo.play()
        document.getElementById("name").innerHTML = "Song name is " + "Ilomilo";
    }
    }
}

