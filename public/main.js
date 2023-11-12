let historyTasks = [];
let upcomingTasks = [];

const upcomingSelectID = "upcomingTasksSelect";
const upcomingTableBodyID = "upcomingTasksTableBody";
const historySelectID = "historyTasksSelect";
const historyTableBodyID = "historyTasksTableBody";

const historySelectEmp = "historyTasksSelectEmployee";
const historyTableBodyIDEmp = "historyTasksTableBodyEmployee";
const tableIgnoreProps = ['customer', 'otherNotes', 'startTime', 'endTime'];


// const dataSelectHTML = `<td><a onclick="fillModal(orderID)" href="#" class="link-info" data-toggle="modal" data-target="#productModal">Details</a></td>`;

function updateOrders() {


    upcomingTasks = upcomingTasks.filter((taskObj) => {
        return taskObj.endTime === null
    });    
}

function isPastThreeMonth(someDate, currDate) {
    let currDateBack = new Date(currDate);
    currDateBack.setMonth(currDateBack.getMonth()-3);
    return (currDateBack <= someDate && someDate <= currDate);
}

function isPastMonth(someDate, currDate) {
    let currDateBack = new Date(currDate);
    currDateBack.setMonth(currDateBack.getMonth()-1);
    return (currDateBack <= someDate && someDate <= currDate);
}

function isPastWeek(someDate, currDate) {
    let currDateBack = new Date(currDate.getTime() - (7 * 24 * 60 * 60 * 1000));
    return (currDateBack <= someDate && someDate <= currDate);
}

function isToday(someDate, currDate) {
    let currDateBack = new Date(currDate.getTime() - 1 * 24 * 60 * 60 * 1000);
    let currDateForward = new Date(currDate.getTime() + 1 * 24 * 60 * 60 * 1000);
    return (currDateBack <= someDate && someDate <= currDate
        || someDate >= currDate && someDate <= currDateForward);
}

function isInThreeMonths(someDate, currDate) {
    let currDateForward = new Date(currDate);
    currDateForward.setMonth(currDateForward.getMonth() + 3);
    return (someDate >= currDate && someDate <= currDateForward);
}

function isInMonth(someDate, currDate) {
    let currDateForward = new Date(currDate);
    currDateForward.setMonth(currDateForward.getMonth() + 1);
    return (someDate >= currDate && someDate <= currDateForward);
}

function isInWeek(someDate, currDate) {
    let currDateForward = new Date(currDate.getTime() + (7 * 24 * 60 * 60 * 1000));
    return (someDate >= currDate && someDate <= currDateForward);
}

function getDateFunction(date) {
    if (date == "Today") {
        return isToday;
    } else if (date == "Past Week" ) {
        return isPastWeek;
    } else if (date == "Past Month") {
        return isPastMonth;
    } else if (date == "Past 3 Months") {
        return isPastThreeMonth;
    }  else if (date == "Current Week") {
        return isInWeek
    } else if (date == "Current Month") {
        return isInMonth
    } else if (date == "Current 3 Months") {
        return isInThreeMonths;
    }

}

function fillModal(orderID) {
    let task = historyTasks.filter((taskObj) => {
        return taskObj.orderID === orderID;
    })
    if (task == null || task == undefined || task == [] || task.length == 0) {
        task = upcomingTasks.filter((taskObj) => {
            return taskObj.orderID === orderID;
        })
        if (task.length == 0) {
            alert("Order Does Not Exist");
            return;
        }
    }
    task = task[0];
    if (task == undefined) {
        alert("Order Does Not Exist2");
        return;
    }

    document.getElementById("orderIDInput").value = task.orderID;
    document.getElementById("productNameInput").value = task.productName;
    let date = new Date(task.dueDate);
    let dateString = date.toISOString().substring(0, 10) + " : " + date.toISOString().substring(11, 19);
    document.getElementById("dueDateInput").value = dateString;
    document.getElementById("customerInput").value = task.customer;
    document.getElementById("otherNotesInput").value = task.otherNotes;

    if (task.startTime == null) {
        document.getElementById("startTime").innerText = "Not Started";
    } else {
        document.getElementById("startTime").innerText = `Start Time: ${task.startTime}`;
    }

    if (task.endTime == null) {
        document.getElementById("endTime").innerText = "Not Ended";
    } else {
        document.getElementById("endTime").innerText = `End Time: ${task.endTime}`;
    }
}

function searchOrder() {
    let orderID = document.getElementById("productSearch").value;
    if (orderID == null || orderID == "") {
        alert("Empty");
        return;
    }
    fillModal(orderID);
}

async function startTask() {
    let orderID = document.getElementById("orderIDInput").value;
    let task = upcomingTasks.find((obj) => {
        return obj.orderID === orderID;
    })
    if (task === undefined || task.startTime !== null) {
        alert("Already Started (or Not Found)");
        return;
    }
    task.startTime = new Date();
    try {
        await fetch('/updateTask', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task)
        });
    } catch {
        alert("Error Updating Task")
    }
}

async function endTask() {
    let orderID = document.getElementById("orderIDInput").value;
    let task = upcomingTasks.find((obj) => {
        return obj.orderID == orderID;
    })
    if (task === undefined || task.endTime !== null) {
        alert("Already Ended (or Not Found)");
        return;
    }
    task.endTime = new Date();
    try {
        await fetch('/updateTask', {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task)
        });
    } catch {
        alert("Error Updating Task")
    }
}

async function createTask() {
    let orderIDInput = document.getElementById("orderIDInputCreate").value;
    let productNameInput = document.getElementById("productNameInputCreate").value;
    let dueDateInput = document.getElementById("dueDateInputCreate").value;
    let customerInput = document.getElementById("customerInputCreate").value;
    let otherNotesInput = document.getElementById("notesInputCreate").value;
    if (orderIDInput == "" || productNameInput == "" || productNameInput == ""
        || dueDateInput == "" || customerInput == "") {
            alert("Missing Item");
            return;
    }

    let task = {orderID : orderIDInput, productName : productNameInput, 
        dueDate : dueDateInput, customer : customerInput, otherNotes : otherNotesInput}

    try {
        await fetch('/addTask', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task)
        });
    } catch {
        alert("Error in Adding Task. Try again");
    }
}



function createRows(selectOption, tableData, tableBodyID) {
    // updateOrders();
    let tableBodyTag = document.getElementById(tableBodyID);
    tableBodyTag.innerHTML = '';
    
    let dateFunc = getDateFunction(selectOption);

    tableData.forEach((dataObj) => {
        let someDate = new Date(dataObj.dueDate)
        let currDate = new Date();
        if (!dateFunc(someDate, currDate)) {
            return;
        }

        let orderID = null;
        let tableRowTag = document.createElement("tr");
        for (const property in dataObj) {
            if (tableIgnoreProps.includes(property)) {
                continue;
            }
            if (property == "orderID") {
                orderID = dataObj[property];
            }

            let tableDataCell = document.createElement("td")
            tableDataCell.innerText = dataObj[property];
            tableRowTag.appendChild(tableDataCell);
        }
        let detailElem = document.createElement("td");
        detailElem.innerHTML = `<td><a onclick="fillModal('${orderID}')" href="#" class="link-info" data-toggle="modal" data-target="#productModal">Details</a></td>`;

        tableRowTag.appendChild(detailElem)
        tableBodyTag.appendChild(tableRowTag);
    });
}

function displayQuote(data) {
    const defaultQuote = `“Computers are incredibly fast, accurate, and stupid. Human beings are incredibly slow, 
    inaccurate, and brilliant. Together they are powerful beyond imagination.”- Albert Einstein`;
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const quoteParagraph = document.getElementById("quote");
        quoteParagraph.innerText = data.content + " -" + data.author;
        })
    .catch((data) => {
        const quoteParagraph = document.getElementById("quote");
        quoteParagraph.innerText = defaultQuote;
    })
}

displayQuote();


async function loadData() {
    let response = await fetch(`/getPastTasks`)
    historyTasks = await response.json();
    console.log(historyTasks)

    response = await fetch(`/getFutureTasks`);
    upcomingTasks = await response.json();
    console.log(upcomingTasks)


    let selectHistoryTag = document.getElementById(historySelectID);
    selectHistoryTag.onchange = () => {
        historyTasks.sort((a, b) => {
            return ((new Date(b.dueDate)).getTime() - (new Date(a.dueDate)).getTime());
        });
        createRows(selectHistoryTag.options[selectHistoryTag.selectedIndex].value, historyTasks, historyTableBodyID);
    }

    let selectHistoryTagModal = document.getElementById(historySelectEmp);
    if (selectHistoryTagModal != null) {
        selectHistoryTagModal.onchange = () => {
            historyTasks.sort((a, b) => {
                return ((new Date(b.dueDate)).getTime() - (new Date(a.dueDate)).getTime());
            });
            createRows(selectHistoryTag.options[selectHistoryTag.selectedIndex].value, historyTableBodyIDEmp, historyTableBodyID);    
        }
    }

    let selectUpcomingTag = document.getElementById(upcomingSelectID);
    selectUpcomingTag.onchange = () => {
        upcomingTasks.sort((a, b) => {
            return ((new Date(a.dueDate)).getTime() - (new Date(b.dueDate)).getTime());
        });
        createRows(selectUpcomingTag.options[selectUpcomingTag.selectedIndex].value, upcomingTasks, upcomingTableBodyID);
    }

    try {
        // let summaryTableBodyTag = document.getElementById("summaryTableBody");
        upcomingTasks.sort((a, b) => {
            return ((new Date(a.dueDate)).getTime() - (new Date(b.dueDate)).getTime());
        });
        createRows("Current Week", upcomingTasks, "summaryTableBody");
    } catch {
        console.log("summary table does not exist")
    }
}

async function updateWebpage() {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    while (true) {
        loadData();
        await delay(5000);
    }
}

updateWebpage();
