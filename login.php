<?php
session_start();
$authenticated = isset($_SESSION["authenticated"]) && $_SESSION["authenticated"];

$email = strip_tags(isset($_POST["email"]) ? $_POST["email"] : "");
$pw = strip_tags(isset($_POST["pw"]) ? $_POST["pw"] : "");
$ispost = ($_SERVER['REQUEST_METHOD'] === 'POST');
//echo_error(password_hash("saeed123", PASSWORD_DEFAULT));

if ($ispost) {
    $result = get_password_from_db($email);
    if ($result->num_rows > 0) {
        $row = $result->fetch_row();
        $user_id = $row[0];
        $hash = $row[1];
        $authenticated = password_verify($pw, $hash);
        if ($authenticated) {
            $_SESSION["authenticated"] = true;
            $_SESSION["user_id"] = $user_id;
            header("Location: index.php");
            die();
        }
    }
    echo_error("Incorrect email or password");
}

if ($authenticated && isset($_SESSION["user_id"]))
{
    header("Location: index.php");
    die();
}

?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=0", shrink-to-fit=no" />
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="mobile-web-app-capable" content="yes">

    <title>Fit+</title>
    <link rel="apple-touch-icon" sizes="128x128" href="img/icon101.png">
    <link rel="icon" sizes="192x192" href="img/icon101.png">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Varela+Round&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <style>
        h1{
            text-align: center;
            font-size: 80px;
            font-family: 'Varela Round', sans-serif;
            margin-top: 200px;
        }

        button{
            width: 100px;
            height: 25px;
            font-size: 15px;
            margin: auto;
        }
        .email_login{
            margin-left: auto;
            margin-right: auto;
            font-size: 18px;
            width: 280px;
            border-color: #1c9ad5;
            font-family: 'Varela Round', sans-serif;
        }
        .password_login{
            margin-left: auto;
            margin-right: 4px;
            font-size: 18px;
            width: 244px;
            border-color: #1c9ad5;
            font-family: 'Varela Round', sans-serif;
        }
        .empw{
            text-align: center;
            font-size: 20px;
            font-family: 'Varela Round', sans-serif;
        }
        body{
            margin-top: 100px;
            text-align: center;
        }


    </style>
</head>
<h1>Fit+</h1>
<body>

<form method="post" action="login.php">
<label class="empw">Email: <input type="text" class="email_login" name="email"></label> <br>
<label class="empw">Password: <input type="password" class="password_login" name="pw"></label><br><br>
<button type="submit" id="login"> login </button><br><br>
</form>
<button id="register"> Register </button>


<?php

function echo_error($errormsg){
    echo "<p style='color:red;'>Error: $errormsg</p>";
}

function get_password_from_db($email){
    $server = "devweb2021.cis.strath.ac.uk";
    $username = "cs317madgroup22";
    $password = "hig4Leic8Red";
    $database = "cs317madgroup22";

    $connection = new mysqli($server, $username, $password, $database);
    $sql = "SELECT user_id, password FROM user_profile WHERE email=?"; // SQL with parameters
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("s", $email);

    if ($connection->connect_error){
        echo "MySQL error";
        return null;
    } else {
        $stmt->execute();
        $result = $stmt->get_result(); // get the mysqli result
        if ($connection->error)
            echo_error("Could not contact database: " . $connection->error);
        $connection->close();
        return $result;
    }

}

?>

</body>
</html>