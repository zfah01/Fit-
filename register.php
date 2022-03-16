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
    <link rel="stylesheet" href="style.css">
    <style>
        body{
            text-align: center;
            font-family: 'Varela Round', sans-serif;
        }
        .fit{
            font-size: 70px;
            margin: auto;

        }
        .welcome{
            margin-top: 80px;
            margin-bottom: 0;
            font-size: 13px;
        }

        .name{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 280px;
            border-color: #1c9ad5;
        }
        .email{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 285px;
            border-color: #1c9ad5;
        }
        .pass{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 255px;
            border-color: #1c9ad5;
        }
        .pass1{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 230px;
            border-color: #1c9ad5;
        }
        .dob{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 300px;
            border-color: #1c9ad5;
            background-color: white;
        }
        .gender{
            margin-left: auto;
            margin-right: 60px;
            font-size: 18px;
            border-color: #1c9ad5;

        }
        .height{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 280px;
            border-color: #1c9ad5;
        }
        .weight{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 280px;
            border-color: #1c9ad5;
        }
        .goal{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 299px;
            border-color: #89cff0;
        }
        .manwomen{
            margin-left: 30px;
            margin-right: auto;
            font-size: 18px;
        }
        button{
            width: 100px;
            height: 25px;
            font-size: 15px;
            margin: auto;
        }

    </style>
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
