let breakfastCals = document.getElementById("breakfastInput");
let lunchCals = document.getElementById("lunchInput");
let dinnerCals = document.getElementById("dinnerInput");
let snackCals = document.getElementById("snackInput");
let exerciseCals = document.getElementById("exerciseInput");
let dailyAllowance = document.getElementById("dailyCals")


function getTotalCals(){
    let arr = document.getElementsByName("cals");


    let totCals= 0;
    for(let i=0; i<arr.length; i++){
        if(parseInt(arr[i].value)){
            totCals+=parseInt(arr[i].value);
            totCals-=parseInt(exerciseCals.value)
        }
        document.getElementById("totCals").value=totCals;



        let message= document.querySelector("h3")
        let remAmount = dailyAllowance.value - totCals;
        console.log(remAmount)
        message.innerText = "Remaining calories left for the day is " + remAmount;
    }






}
