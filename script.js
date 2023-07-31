const inputContent = document.getElementById("input-content");
const listContent = document.getElementById("list-content");

function addTask() {
    if(inputContent.value == '')
        alert("Write some Task to add!");
    else {
        let li = document.createElement("li");
        li.innerHTML = inputContent.value;
        listContent.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputContent.value = "";
    saveData();
}


listContent.addEventListener("click", function(e) {
    if(e.target.tagName === "LI")
    e.target.classList.toggle("checked");
    else if(e.target.tagName === "SPAN")
    e.target.parentElement.remove();
    saveData();
}, false);



function saveData() {
    localStorage.setItem("data", listContent.innerHTML);
}

function showData() {
    listContent.innerHTML = localStorage.getItem("data");
}

showData();

function share() {
    const liElements = listContent.querySelectorAll("li");
    const liContentArray = [];

    function addNumbering(index, content) {
        return (index + 1) + ". " + content;
    }

    liElements.forEach((li, index) => {
        const val = li.textContent;
        const str = val.slice(0, -1);
        liContentArray.push(addNumbering(index, str));
    });
    if(liContentArray.length === 0) {
        alert("No Items available to Share");
        return;
    }
    const messageText = "Check out! My To-Do List:\n" + liContentArray.join("\n");
    const encodedMessage = encodeURIComponent(messageText);

    const whatsappURL = "https://api.whatsapp.com/send?text=" + encodedMessage;
    window.open(whatsappURL, "_blank");
} 

