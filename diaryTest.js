"use strict";
let input = document.getElementById("myInput");
let list = document.getElementById("myUL");
let clearButton = document.getElementById("clear-btn")




// Create a new list item when clicking on the "Add" button
function newElement() {
    if (input.value === "") {
        alert("No value entered")
    } else {
        let li = document.createElement("li");

        let check = document.createElement("input")
        check.classList.add("checkbox");
        check.type = ("checkbox");

        let TextVal = input.value;

        let text = document.createTextNode(TextVal);
        li.appendChild(text);
        li.appendChild(check);
        list.appendChild(li);
        input.value = "";
        checked(li);
    }
}

function checked(elem){
    elem.addEventListener("click", function() {

            elem.classList.toggle("checked")

        }
    )

}
function clearList(){
    [...list.children].forEach(i => list.removeChild(i))
}


let li = document.querySelectorAll("li");
li.forEach((e) => {checked(e)})















