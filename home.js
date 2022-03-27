'use strict';
/*globals $:false */


    let wnt = {};
    wnt.mobile = false;
    wnt.ie = false;
    wnt.steps = localStorage.steps;


    //check if device is mobile
    if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i)
    ) {
        wnt.mobile = true;
    }

    //using geolocation to automatically update user location
    if (wnt.mobile === true) {
        navigator.geolocation.watchPosition(getPosition, positionError,
            {'enableHighAccuracy': true, 'timeout': 10000, 'maximumAge': 20000});
    } else {
        alert("Geo location is not available on this device");
    }


    //load the steps on screen
    $(function () {
        $('#steps').ready(function () {
            wnt.steps = 0;
            calcStepsTaken(wnt.steps);
            saveSteps();
            setStepsTo0();
        });
    });

    //save steps between page loads and refreshes
    function saveSteps() {
        let steps = document.getElementById("steps").value;
        localStorage.setItem("steps", steps);
        console.log(localStorage.getItem("steps"));
        return false;
    }

    window.onload = function () {
        document.getElementById("steps").value = localStorage.getItem("steps");
    };


    //set steps to 0 at midnight
    function setStepsTo0() {
        let d = new Date();
        d.setHours(0,0,0,0);

        if (d) {
            localStorage.clear();
            wnt.steps = 0;
        }

    }
    //get user position
    function getPosition(pos) {
        let steps = pos.coords.speed / 0.762;
        calcStepsTaken(steps);
    }

    //if error occurs alert user
    function positionError(err) {
        if (err.code === 1) {
            alert("User denied geolocation.");
        } else if (err.code === 2) {
            alert("Position unavailable.");
        } else if (err.code === 3) {
            alert("Timeout expired.");
        } else {
            alert("ERROR:" + err.message);
        }
    }

    //calculate steps detected
    function calcStepsTaken(steps) {
        wnt.steps = wnt.steps + steps;
        localStorage.steps = wnt.steps;
        $('#steps').html('<span>' + Math.round(wnt.steps) + '/6000 Steps</span>');
    }

    //calculate calories remaining
    function calcCaloriesRemaining(){
        let caloricGoal =  document.getElementsByClassName("calories")[0].value;//2500
        let breakfast = document.getElementById("breakfastInput").value;//300
        let lunch = document.getElementById("lunchInput").value;//350
        let dinner = document.getElementById("dinnerInput").value;//400
        let snack = document.getElementById("snackInput").value;//50
        let exercise = document.getElementById("exerciseInput").value;//300
        let remaining;
        let food;

        food = breakfast + lunch + dinner + snack

        remaining = (caloricGoal - food) + exercise

        document.getElementById("goal").innerHTML = caloricGoal;
        document.getElementById("food").innerHTML = food;
        document.getElementById("exercise").innerHTML = exercise;
        document.getElementById("remaining").innerHTML = remaining;

        if (!caloricGoal || !food|| !exercise){
            caloricGoal = 0;
            food= 0;
            exercise= 0;


        }

    }
calcCaloriesRemaining();

