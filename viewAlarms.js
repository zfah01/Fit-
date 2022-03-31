const btnAlarm = document.getElementById("time-btn");
const dateAlarm = document.getElementById("time");
const cancelAlarm = document.getElementById("cancel-alarm");
const addAlarm = document.getElementById("add-alarm");
const alarmCon = document.getElementById("alarm");
const errorAlarm = document.getElementById("error-alarm");
const audio = document.getElementById("audio");
const mainCon = document.getElementById("main-con");
const alarmsParent = document.getElementById("alarms-parent");
const error = document.getElementById("error");

// Functions

// min 2 dates togethers
// ex : 02:03:00 - 14:05:00 = 16:08:00

function minDates(countDown){
    var nowAlarm = new Date().getTime();
    var distanceAlarm = countDown - nowAlarm;
    var hours = Math.floor ((distanceAlarm % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distanceAlarm % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}:${minutes}`
}

// notification function

function showNot(message, bodyM) {
    const notification = new Notification(message, {
        body: bodyM,

        icon : 'img/icon101.png'
    });

    notification.onclick = (e) => { window.location.href = "https://devweb2021.cis.strath.ac.uk/~xnb19206/group17/viewAlarms.html";};
}



cancelAlarm.addEventListener("click", () => {localStorage.setItem("spammer", `false`);});

addAlarm.addEventListener('click' , ()=>{
    if (dateAlarm.value == ""){
        error.innerHTML = "You cannot insert empty time"
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

function timeNodeUpdate(){
    const totalAlarmsList = []
    for (let i = 0 ; i < window.localStorage.length ; i++){
        // convert local storage keys and values to list
        const localList = Object.entries(localStorage)
        if (localList[i][0].search("sleeping") == 0){
            // will push only sleeping alarms in totalAlarmsList
            totalAlarmsList.push(localList[i])
            // Create empty div and set alarm id inside it
            const elementDiv  = document.createElement('div')
            elementDiv.id = localList[i]
            elementDiv.className = "infoCon"
            elementDiv.style.display = "flex"
            elementDiv.style.justifyContent = "space-around"
            alarmsParent.appendChild(elementDiv)
        }
    }
}

let waiter = 0
let waiterport = 10

setInterval(() => {
    if (window.localStorage.getItem("spammer") == "true"){
        waiter +=1
        console.log(waiter == waiterport);
        if (waiter == waiterport){
            waiterport+=10

            if (Notification.permission == "granted") {
                showNot("Drink water", "Its time to drink water!");
            } else {
                Notification.requestPermission();
            }
        }
        cancelAlarm.style.display = "block"
        audio.play()
    }
    else{
        audio.pause()
    }

    // remove all element id = 'alarms-parent' so it will delete old time and upload the new time
    alarmsParent.innerHTML = ''
    timeNodeUpdate()

    checkerDateList = []
    const parentElementChild = alarmsParent.childNodes
    for (let i = 0; i <parentElementChild.length ;i++){
        // this will get parent of element id (the parent is time in local storage), use minDate function for get the minutes and hours , then it will sum hours and minutes and push it
        const dateID = parentElementChild[i].id
        // get time from parent
        const date = dateID.split(",")[1]
        const dateTime = dateID.split(",")[2]
        const dateObj = new Date(`${date},${dateTime}`);

        // use minDate function for get the minutes and hours
        const differentBetweenDates = minDates(dateObj.getTime())
        // split hours:minutes
        const sumHoursWithMinutes = differentBetweenDates.split(':')
        // sum hours:minutes then insert it to checkerDateList list to check if time finished
        checkerDateList.push(parseInt(sumHoursWithMinutes[0])+parseInt(sumHoursWithMinutes[1]))

        const newDate = new Date().getTime()


        // create empty p element + button element and insert inside div

        const elementBtn  = document.createElement('button')
        const elementP  = document.createElement('p')
        const elementP_remaining  = document.createElement('p')
        elementBtn.id = "remove"
        elementP_remaining.id = "elapsed-time"
        elementBtn.innerHTML = "remove"
        elementP.innerHTML = differentBetweenDates
        elementP_remaining.innerHTML = dateTime
        parentElementChild[i].appendChild(elementP)
        parentElementChild[i].appendChild(elementP_remaining)
        parentElementChild[i].appendChild(elementBtn)
    }

    // search for 0 in checkerDateList
    // if zero founded checkerDateList.indexOf(0) it will return 0

    if (checkerDateList.indexOf(0) == 0) {
        // set spammer to true
        localStorage.setItem("spammer" , "true");
    }

    // get index of clicked element remove button , so it will find parent (parent contains key in local storage) then remove it
    var button = document.querySelectorAll('#remove');
    for (var i = 0; i < button.length; i++) {
        button[i].addEventListener('click', ((j) => {
            return function() {
                const parentNode = button[j].parentNode.id
                window.localStorage.removeItem(parentNode.split(',')[0]);
            }
        })(i))
    }

}, 1000);