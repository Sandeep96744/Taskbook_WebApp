const inputContent = document.getElementById("input-content");
const listContent = document.getElementById("list-content");

function addTask() {
    const task = inputContent.value.trim();
    if(task == '')
        alert("Write some Task to add!");
    else {
        let li = document.createElement("li");
        li.innerHTML = task;
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
    const completedTasks = [];
    const uncompletedTasks = [];

    function addNumbering(index, content) {
        return (index + 1) + ". " + content;
    }

    let uncompletedIndex = 0;
    let completedIndex = 0;
    liElements.forEach((li) => {
        const val = li.textContent;
        const str = val.slice(0, -1);
        if (li.classList.contains("checked")) {
            completedTasks.push(addNumbering(completedIndex++, str));
        } else {
            uncompletedTasks.push(addNumbering(uncompletedIndex++, str));
        }
    });

    if (completedTasks.length === 0 && uncompletedTasks.length === 0) {
        alert("No Items available to Share");
        return;
    }
    let messageText = "Check out! My To-Do List:\n\n";
    if (uncompletedTasks.length > 0) {
        messageText += "Incompleted Tasks:\n" + uncompletedTasks.join("\n") + "\n\n";
    }

    if (completedTasks.length > 0) {
        messageText += "Completed Tasks:\n" + completedTasks.join("\n") + "\n\n";
    }
    const encodedMessage = encodeURIComponent(messageText);

    const whatsappURL = "https://api.whatsapp.com/send?text=" + encodedMessage;
    window.open(whatsappURL, "_blank");
} 