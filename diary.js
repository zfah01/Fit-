let breakfastCals = document.getElementById("breakfastInput");
let lunchCals = document.getElementById("lunchInput");
let dinnerCals = document.getElementById("dinnerInput");
let snackCals = document.getElementById("snackInput");
let form = document.getElementById("form");
let breakfastMeal = document.getElementById("breakfastText");
let error = document.getElementById("error");
let exerciseCals = document.getElementById("exerciseInput");

breakfastCals.value = localStorage.getItem("meal0");
lunchCals.value = localStorage.getItem("meal1");
dinnerCals.value = localStorage.getItem("meal2");
snackCals.value = localStorage.getItem("meal3");
exerciseCals.value = localStorage.getItem("exercise");
getTotalCals();
function getTotalCals(){
    let arr = document.getElementsByName("cals");
    let dailyAllowance = document.getElementById("dailyCals");


    localStorage.setItem("CalorieAllowance", dailyAllowance.value.toString())

    let totCals= 0;
    let mealCal = 0;
    for(let i=0; i<arr.length-1; i++) {
        if (parseInt(arr[i].value)) {
            mealCal = parseInt(arr[i].value)
            totCals += mealCal

            //minus the exercise calories
            localStorage.setItem("meal"+i, mealCal.toString())
            localStorage.setItem("calories", totCals.toString())
            document.getElementById("totCals").value=totCals;
        } else {mealCal = 0;}

        localStorage.setItem("meal"+i, mealCal.toString())

    }


    let exerciseCalsVal = 0;
    if (parseInt(exerciseCals.value)) {
        exerciseCalsVal = parseInt(exerciseCals.value);
    }

    let message= document.querySelector("h3")
    let remAmount = dailyAllowance.value-totCals + exerciseCalsVal;
    localStorage.setItem("exercise", exerciseCalsVal.toString())
    localStorage.setItem("remainingKcal", remAmount.toString())
    message.innerText="Remaining amount left including exercise calories is " + remAmount;
    message.innerText+="\n"+ "Breakdown: Calorie allowance= "+dailyAllowance.value +"\n"+ "calories consumed from food= "+ totCals+"\n"+" calories burned from exercise= "+ exerciseCalsVal;

}
