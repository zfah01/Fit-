<?php

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0",shrink-to-fit=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">

    <title>Fit+</title>
    <link rel="apple-touch-icon" sizes="128x128" href="img/icon101.png">
    <link rel="icon" sizes="192x192" href="img/icon101.png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="register.css">
</head>

<body>
<p class="welcome">Welcome to </p>
<p class="fit"> Fit+ </p>
<form method="post" action="register.php">
    <label>Name:<input type="text" class="name" name="name"></label><br>
    <label>Email:<input type="email" class="email" name="email"></label><br>
    <label>Password:<input type="password" class="pass" name="password"></label><br>
    <label>Re-Password:<input type="password" class="pass1" name="password1"></label><br>
    <label>DoB:<input type="date" class="dob" name="dob"></label><br>
    <label class="gender">Gender:
        <label><input class="manwomen" type="radio" name="gender" value="man"> Man</label>
        <label><input class="manwomen" type="radio" name="gender" value="women"> Women</label>
    </label><br>
    <label>Height:<input type="text" class="height" name="height"></label><br>
    <label>Weight:<input type="text" class="weight" name="weight"></label><br>
    <label>Goal:<input type="text" class="goal" name="goal"></label><br><br>

    <button type="submit" id="register"> Register </button><br><br>



</form>
</body>
</html>
