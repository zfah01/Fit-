<?php

$name = strip_tags(isset($_POST["name"]) ? $_POST["name"] : "");
$email = strip_tags(isset($_POST["email"]) ? $_POST["email"] : "");
$password = strip_tags(isset($_POST["password"]) ? $_POST["password"] : "");
$password1 = strip_tags(isset($_POST["password1"]) ? $_POST["password1"] : "");
$dob = strip_tags(isset($_POST["dob"]) ? $_POST["dob"] : "");
$gender = strip_tags(isset($_POST["gender"]) ? $_POST["gender"] : "");
$height = strip_tags(isset($_POST["height"]) ? $_POST["height"] : "");
$weight = strip_tags(isset($_POST["weight"]) ? $_POST["weight"] : "");
$goals = strip_tags(isset($_POST["goals"]) ? $_POST["goals"] : "");
$calories = strip_tags(isset($_POST["calories"]) ? $_POST["calories"] : "");
$ispost = ($_SERVER['REQUEST_METHOD'] === 'POST');


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
<p class="fit"><img src="img/icon101.png" style="width:55px" >Fit+ </p>
<form method="post" action="register.php">
    <?php

    if ($ispost){
        $validated = true;
        if (!preg_match("/^[a-zA-Z-' ]*$/",$name)) {
            $nameErr = "Only letters and white space allowed in name";
            $validated = false;
        }
        if (strlen($name) < 3 || strlen($name) > 50) {
            echo_error("Name should be more than 3 letters and less than 50");
            $validated = false;
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo_error("Please enter a valid email address");
            $validated = false;
        }
        if ($password !== $password1){
            echo_error("Passwords do not match. Please re-enter them");
            $validated = false;
        }
        $dob_arr  = explode('-', $dob);
        if (count($dob_arr) == 3) {
            if (checkdate($dob_arr[1], $dob_arr[2], $dob_arr[0])) {
                $currentDate = date("d-m-Y");
                $datediff = date_diff(date_create($dob), date_create($currentDate));
                $age = $datediff->format("%y");
                if ($age < 18 || $age > 50) {
                    echo_error("You must be aged between 18 and 50");
                    $validated = false;
                }
            } else {
                echo_error("Invalid date of birth value");
                $validated = false;
                $dob = "";
            }
        } else {
            echo_error("Invalid date of birth value");
            $validated = false;
            $dob = "";
        }
        if ($gender !== "1" && $gender !== "2"){
            echo_error("Invalid gender value");
            $validated = false;
            $gender = "";
        }
        if ($goals !== "1" && $goals !== "2" && $goals !== "3" && $goals !== "4"){
            echo_error("Invalid goal selection");
            $validated = false;
            $goals = "";
        }

        if ($validated){
            $passwordhash = password_hash($password, PASSWORD_DEFAULT);
            $email = strtolower($email);
            if(check_if_email_exists($email)){
                echo_error("This email address is already registered. Click <a href='login.php'>here</a> to login");
            } else {
                $inserted = register_user($email, $passwordhash, $name, $dob, $height, $weight, $gender, $goals ,$calories);
                if ($inserted) {
                    echo_info("Registration complete. Click <a href='login.php'>here</a> to login");
                    sendemail($email, "Registration Complete", "Welcome, ".$name);
                    die();
                } else {
                    echo_error("Registration failed. Please try again");
                }
            }
        }

    }

    ?>
    <label>Name:<input type="text" class="name" name="name" minlength="3" maxlength="50" value="<?php echo $name;?>" required></label><br>
    <label>Email:<input type="email" class="email" name="email" value="<?php echo $email;?>" required></label><br>
    <label>Password:<input type="password" class="pass" name="password" minlength="6" maxlength="50" required></label><br>
    <label>Re-Password:<input type="password" class="pass1" name="password1" minlength="6" maxlength="50" required></label><br>
    <label>DoB:<input type="date" class="dob" name="dob" value="<?php echo $dob;?>" required></label><br>
    <label class="gender">Gender:
        <label><input class="manwomen" type="radio" name="gender" value="1" required <?php if ($gender === "1") {echo 'checked';}?>> Male</label>
        <label><input class="manwomen" type="radio" name="gender" value="2" required <?php if ($gender === "2") {echo 'checked';}?>> Female</label>
    </label><br>
    <label>Height (cm):<input type="number" class="height" name="height" min="90" max="300" step="0.1" value="<?php echo $height;?>" required></label><br>
    <label>Weight (kg):<input type="number" class="weight" name="weight" min="30" max="300" step="0.1" value="<?php echo $weight;?>" required></label><br>
    <label>Calories Goal:<input type="number" class="calories" name="calories" min="500" max="4000" step="any" value="<?php echo $calories;?>" required></label><br>
    <label class="goal">Goal:
        <select name="goals" class="goal" id="goals">
            <option value="1" <?php if ($goals === "1") {echo 'selected';}?>>Lose weight</option>
            <option value="2" <?php if ($goals === "2") {echo 'selected';}?>>Improve fitness</option>
            <option value="3" <?php if ($goals === "3") {echo 'selected';}?>>Monitor lifestyle</option>
            <option value="4" <?php if ($goals === "4") {echo 'selected';}?>>Bodybuilding</option>
        </select>
    </label><br><br>

    <button type="submit" id="register"> Register </button><br><br>

<?php

function echo_error($errormsg){
    echo "<p style='color:red;'>Error: $errormsg</p>";
}

function echo_info($infomsg){
    echo "<p style='color:black;'>$infomsg</p>";
}

function check_if_email_exists($email){
    $server = "devweb2021.cis.strath.ac.uk";
    $username = "cs317madgroup22";
    $password = "hig4Leic8Red";
    $database = "cs317madgroup22";

    $connection = new mysqli($server, $username, $password, $database);
    $sql = "SELECT user_id FROM user_profile WHERE email=?"; // SQL with parameters
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
        return $result->num_rows > 0;
    }

}


function register_user($email, $passwordhash, $name, $dob, $height, $weight, $gender, $goal, $calories){
    $server = "devweb2021.cis.strath.ac.uk";
    $username = "cs317madgroup22";
    $password = "hig4Leic8Red";
    $database = "cs317madgroup22";

    $connection = new mysqli($server, $username, $password, $database);
    $sql = "INSERT INTO user_profile (email, password, name, dob, height, weight, gender, goal, calories) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"; // SQL with parameters
    $stmt = $connection->prepare($sql);
    $stmt->bind_param("ssssddiii", $email, $passwordhash, $name, $dob, $height, $weight, $gender, $goal, $calories);

    if ($connection->connect_error){
        echo "MySQL error";
        return null;
    } else {
        $stmt->execute();
        if ($connection->error)
            echo_error("Could not contact database: " . $connection->error);
        $connection->close();
        return $stmt->affected_rows == 1;
    }

}

function sendemail($email, $emailsubject, $emailbody){
    $headers = 'From: FitPlus <info@fitplus.usg.uk>' . "\r\n" .
        'Reply-To: info@fitplus.usg.uk' . "\r\n";
    mail($email, $emailsubject, $emailbody, $headers);
}

?>

</form>
</body>
</html>
