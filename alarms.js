const timeTxt = document.getElementById("rest-time");
const btnAlarm = document.getElementById("time-btn");
const dateAlarm = document.getElementById("time");
const waterTime = document.getElementById("waterTime");
const waterBtn = document.getElementById("water-btn");
const cancelAlarm = document.getElementById("cancel-alarm");
const waterCon = document.getElementById("water");
const alarmCon = document.getElementById("alarm");
const audio = document.getElementById("audio");

// Functions

// Sum 2 dates togethers
// ex : 02:03:00 + 14:05:00 = 16:08:00


function sum(date1, date2) {
    date1 = date1.split(":");
    date2 = date2.split(":");
    const result = [];

    date1.reduceRight((carry, num, index) => {
        const max = [24, 60, 60][index];
        const add = +date2[index];
        result.unshift((+num + add + carry) % max);
        return Math.floor((+num + add + carry) / max);
    }, 0);

    return result.join(":");
}

// notification function

function showNot(message, bodyM) {
    const notification = new Notification(message, {
        body: bodyM,
        icon : 'img/icon101.png'
    });

    notification.onclick = (e) => { window.location.href = "https://devweb2021.cis.strath.ac.uk/~xnb19206/group17/waterAlarm.html";};

}

// On button click make new sleeping on water-alarm on local storage

// this function will sum current date with water cycle date so the result will be next alarm date
waterBtn.addEventListener("click", () => {
    window.localStorage.setItem("water-cycle", waterTime.value + ":00");
    const Date_ = new Date();
    Date_.setFullYear(2025);
    Date_.setDate(3);
    Date_.setMonth(3);
    Date_.setSeconds(00);
    const alarm = Date_.toLocaleTimeString("en-US", { hour12: false });

    const alarm_date = Date_.toDateString();
    const oldDate = localStorage.getItem("water-cycle");
    const sumDate = sum(oldDate, alarm);

    localStorage.setItem("water-alarm", `${alarm_date}, ${sumDate}`);
    window.location.reload()
});

// set an alarm
btnAlarm.addEventListener('click' , ()=>{
    if (dateAlarm.value == ""){
        error.innerHTML = "You cannot insert empty date"
        setTimeout(() => {
            error.innerHTML = ""
        }, 3000);
    }
    else{
        for (let i = 0 ; i < window.localStorage.length+1 ; i++){
            // will set key that's never used before
            const sleepingPush = window.localStorage.getItem(`sleeping-alarm-${i}`)
            if (sleepingPush == null){
                const AlarmDate = new Date();
                AlarmDate.setFullYear(2025);
                window.localStorage.setItem(`sleeping-alarm-${i}` , `${AlarmDate.toDateString()} , ${dateAlarm.value}:00`)
                break
            }
        }
    }
})

cancelAlarm.addEventListener("click", () => {
    console.log("clicked");
    localStorage.setItem("spammer", `false`);
});

// Check for dates to calculate

// ===================================

// Dates in local storage will be calculate from the current date
// When user input date it will be uploaded to local storage
// current date or time - date in local storage that user uploaded = time until alarm will work

// ====================================

// get the date that user uploaded from local storage

var countDownDateAlarm = new Date(window.localStorage.getItem("sleeping-alarm")).getTime();

var countDownDate      = new Date(window.localStorage.getItem("water-alarm")).getTime();

let sender = 0;
let senderAlarm = 0;


let waiter = 0
let waiterport = 10

var x = setInterval(function () {
    // Drink water

    // if spamming is true display the cancel alarm + send notifications + play audio
    // if spamming is false display none the cancel alarm + stop sending notifications + pause audio

    if (window.localStorage.getItem("spammer") == "true"){
        waiter +=1
        if (waiter == waiterport){
            waiterport+=10
            if (Notification.permission == "granted") {
                showNot("Wake up now", " Its time to wake up!");
            } else {
                Notification.requestPermission();
            }
        }
        cancelAlarm.style.display = "block"
        audio.play()
    }
    else{
        cancelAlarm.style.display = "none"
        audio.pause()
    }

    var now = new Date().getTime();
    var distance = parseInt(countDownDate) - parseInt(now);

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    //Water alarm- sum date

    if (hours + minutes == 0) {
        sender++;
        if (sender == 1) {
            const oldDate = localStorage.getItem("water-cycle");
            // Get new date hours split and sum and set it for new
            let newDateObj = new Date();
            const newDate = newDateObj.toLocaleString("en-US", { hour12: false }).split(" ")[1];
            const sumDate = sum(newDate, oldDate);
            newDateObj.setHours(parseInt(sumDate.split(":")[0]));
            newDateObj.setMinutes(parseInt(sumDate.split(":")[1]));
            newDateObj.setFullYear(2025);
            localStorage.setItem("water-alarm", newDateObj.toLocaleString("en-US", { hour12: false }));
            // NEW DATE ON LOCAL STORAGE UPDATED
            if (Notification.permission == "granted") {
                showNot("Drink water", "Its time to drink water!");
            } else {
                Notification.requestPermission();
            }
        } else {
            // pass
        }
    }

    // If there is nothing in local storage type no date available

    if (window.localStorage.getItem("water-alarm") == null){
        document.getElementById("demo").innerHTML = "No water timer available"
    }
    else{
        document.getElementById("demo").innerHTML = hours + "h " + minutes + "m ";
    }


    //  Alarm

    var nowAlarm = new Date().getTime();
    var distanceAlarm = countDownDateAlarm - nowAlarm;
    var hoursAlarm   = Math.floor ((distanceAlarm % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutesAlarm = Math.floor((distanceAlarm % (1000 * 60 * 60)) / (1000 * 60));

    // if hours + minutes == 0 then the time of the alarm is came

    if (hoursAlarm + minutesAlarm == 0) {
        senderAlarm ++;
        if (senderAlarm == 1) {
            if (Notification.permission == "granted") {
                showNot("its time to wake up", " !");
            } else {
                Notification.requestPermission();
            }
            const currentSleepingDate =new Date (localStorage.getItem("sleeping-alarm"))
            currentSleepingDate.setFullYear(2025)
            localStorage.setItem("sleeping-alarm",currentSleepingDate.toLocaleString());
            // set spammer to true
            localStorage.setItem("spammer" , "true");
        }
    }
    // if no date available then type no date available

}, 1000);