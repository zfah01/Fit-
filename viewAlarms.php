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
    <script src="viewAlarms.js" defer></script>

    <title>Alarm</title>
    <script src="https://code.jquery.com/jquery-1.10.2.js"></script>
</head>
<body>
<div id="nav-placeholder">

</div>

<audio id="audio" src="./audio.wav"></audio>

<div id="main-section">
    <div style="display: flex;justify-content: center;height: 100vh;align-items: center;">
        <div>
            <h2 style="text-align: center;" id="error"></h2>
            <div id="main-con">
                <div id="alarm" style="text-align: center;margin-top: 20px;">
                    <h1>Alarm</h1>
                    <label>Hours:Minutes</label>
                    <input type="time" id="time" required>
                    <div style="margin-top: 15px;">
                        <button id="add-alarm" style="text-align: center;margin-left: auto;margin-right: auto;">add alarm</button>
                    </div>
                </div>
                <div id="alarms-parent" style="text-align: center;margin-top: 10px;"></div>
            </div>
            <button id="cancel-alarm" style="text-align: center;margin-left: auto;margin-right: auto;display: none;margin-top: 10px;">cancel alarm</button>
        </div>
    </div>
</div>

<!-- when its clicked the value for spammer will be false -->
<script>
    setInterval(() => {
        const cancel = document.getElementById("cancel-alarm")
        const spamValue = localStorage.getItem("spammer")
        if (spamValue == "true"){
            cancel.style.display = "block"
        }
        else{
            cancel.style.display = "none"
        }
        cancel.addEventListener('click' , ()=>{
            if (spamValue == "true"){
                localStorage.setItem("spammer" , "false")
                localStorage.setItem("spammer" , "false")
            }
        })
    }, 1000);
</script>
<script>
    $(function(){
        $("#nav-placeholder").load("navBar.html");
    });
</script>
<script src="model.js"></script>
<script src="view.js"></script>
<script src="controller.js"></script>
</body>
</html>
