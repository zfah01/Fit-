let breakfastCals = document.getElementById("breakfastInput");
let lunchCals = document.getElementById("lunchInput");
let dinnerCals = document.getElementById("dinnerInput");
let snackCals = document.getElementById("snackInput");
let form = document.getElementById("form");
let breakfastMeal = document.getElementById("breakfastText");
let error = document.getElementById("error");




function getTotalCals(){
    let arr = document.getElementsByName("cals");
    let dailyAllowance = document.getElementById("dailyCals");


    localStorage.setItem("CalorieAllowance", dailyAllowance.toString())

    let totCals= 0;
    for(let i=0; i<arr.length-1; i++) {
        if (parseInt(arr[i].value)) {
            totCals += parseInt(arr[i].value)

    //minus the exercise calories

        localStorage.setItem("calories", totCals.toString())
            document.getElementById("totCals").value=totCals;
        }


    }

    let exerciseCals = document.getElementById("exerciseInput");


    let message= document.querySelector("h3")
    let remAmount = dailyAllowance.value-totCals + parseInt(exerciseCals.value);
    message.innerText="Remaining amount left including exercise calories is " + remAmount;
    message.innerText+="\n"+ "Breakdown: Calorie allowance= "+dailyAllowance.value +"\n"+ "calories consumed from food= "+ totCals+"\n"+" calories burned from exercise= "+ parseInt(exerciseCals.value);






















}
