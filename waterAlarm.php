<?php
session_start();
$authenticated = isset($_SESSION["authenticated"]) && $_SESSION["authenticated"];
if (!($authenticated && isset($_SESSION["user_id"])))
{
    header("Location: login.php");
    die();
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0" , shrink-to-fit=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon" sizes="128x128" href="img/icon101.png">
    <link rel="icon" sizes="192x192" href="img/icon101.png">
    <script src="./alarms.js" defer></script>

    <title>Alarm</title>
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>

</head>
<body>
<div id="nav-placeholder">

</div>
<audio id="audio" src="./audio.wav"></audio>

<div id="main-section">
    <script src="./alarms.js" defer></script>
    <div class="divv">
        <div>
            <div id="water" style="text-align: center;">
                <h1>Water timer</h1>
                <p id="demo"></p>
                <label>Hours:Minutes</label>
                <input id="waterTime" type="text" class="inputt" value="03:00" required>
                <button id="water-btn">Send notification every</button>
            </div>
            <div id="alarm" style="text-align: center;margin-top: 20px;">
                <h1>Alarm</h1>
                <p id="demo-alarm"></p>
                <label>Hours:Minutes</label>
                <input type="time" id="time" required>
                <button id="time-btn">Sleeping Alarm by date</button>
                <div>
                    <button id="cancel-alarm" >cancel alarm</button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    $(function(){
        $("#nav-placeholder").load("navBar.html");
    });
</script>
</body>
</html>
