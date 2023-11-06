let historyTasks = [
    {orderID : "safe#ab12", productName : "Stainless Steel Safe", dueDate : "10/25/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
    {orderID : "chair#cd34", productName : "Stainless Steel Chair", dueDate : "10/11/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
    {orderID : "plate#ef45", productName : "Stainless Steel Plate", dueDate : "10/12/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
    {orderID : "bowl#gh67", productName : "Stainless Steel Bowl", dueDate : "8/10/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
    {orderID : "safe3#ab34", productName : "Stainless Steel Safe", dueDate : "8/7/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
    {orderID : "chair3#cd56", productName : "Stainless Steel Chair", dueDate : "10/2/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
    {orderID : "plate3#ef710", productName : "Stainless Steel Plate", dueDate : "2/12/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"},
    {orderID : "bowl3#gh90   ", productName : "Stainless Steel Bowl", dueDate : "10/2/23", startTime : "2023-09-29T05:20:30.319Z", endTime :"2023-10-29T05:20:30.319Z", customer : "Billy S", otherNotes : "Blank"}
];

let upcomingTasks = [
    {orderID : "safe2#ab12", productName : "Stainless Steel Safe", dueDate : "11/01/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
    {orderID : "safe2#ab100", productName : "Stainless Steel Safe", dueDate : "11/03/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
    {orderID : "chair2#cd34", productName : "Stainless Steel Chair", dueDate : "12/11/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
    {orderID : "plate2#ef45", productName : "Stainless Steel Plate", dueDate : "12/12/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
    {orderID : "bowl2#gh67", productName : "Stainless Steel Bowl", dueDate : "11/12/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
    {orderID : "safe4#ab34", productName : "Stainless Steel Safe", dueDate : "11/17/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
    {orderID : "chair4#cd56", productName : "Stainless Steel Chair", dueDate : "12/2/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
    {orderID : "plate4#ef710", productName : "Stainless Steel Plate", dueDate : "11/13/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"},
    {orderID : "bowl4#gh90   ", productName : "Stainless Steel Bowl", dueDate : "12/3/23", startTime : null, endTime : null, customer : "Billy S", otherNotes : "Blank"}
];

const upcomingSelectID = "upcomingTasksSelect";
const upcomingTableBodyID = "upcomingTasksTableBody";
const historySelectID = "historyTasksSelect";
const historyTableBodyID = "historyTasksTableBody";

const historySelectEmp = "historyTasksSelectEmployee";
const historyTableBodyIDEmp = "historyTasksTableBodyEmployee";
const tableIgnoreProps = ['customer', 'otherNotes', 'startTime', 'endTime'];


// const dataSelectHTML = `<td><a onclick="fillModal(orderID)" href="#" class="link-info" data-toggle="modal" data-target="#productModal">Details</a></td>`;

function updateOrders() {
    // for (let i = 0; i < upcomingTasks.length; i++) {
    //     let orderObj = upcomingTasks[i];
    //     if (orderObj.endTime != null) {
    //         console.log(orderObj);
    //         console.log(i);
    //         // upcomingTasks.pop(i);
    //         upcomingTasks = upcomingTasks.slice(i);
    //         upcomingTableBodyID
    //         historyTasks.push(orderObj);
    //     }
    // }

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

function createTask() {
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
    upcomingTasks.push({orderID : orderIDInput, productName : productNameInput, 
        dueDate : dueDateInput, customer : customerInput, otherNotes : otherNotesInput});
    
    historyTasks.push({orderID : orderIDInput, productName : productNameInput, 
        dueDate : dueDateInput, customer : customerInput, otherNotes : otherNotesInput});
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
        // detailElem.innerHTML = dataSelectHTML
        detailElem.innerHTML = `<td><a onclick="fillModal('${orderID}')" href="#" class="link-info" data-toggle="modal" data-target="#productModal">Details</a></td>`;

        tableRowTag.appendChild(detailElem)
        tableBodyTag.appendChild(tableRowTag);
    });
}




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

let summaryTableBodyTag = document.getElementById("summaryTableBody");
upcomingTasks.sort((a, b) => {
    return ((new Date(a.dueDate)).getTime() - (new Date(b.dueDate)).getTime());
});
createRows("Current Week", upcomingTasks, "summaryTableBody");



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function createAndCompleteTasks() {
    let i = 0;
    while (true) {
        console.log(`Waiting 5 seconds...`);
        console.log(upcomingTasks);
        console.log(historyTasks);
        i += 2;
        await sleep(i * 5000);
        let date = new Date()
        date.setMonth(date.getMonth()+1);
        upcomingTasks.push({orderID : `NEW#${i}`, productName : "Stainless Steel Safe", 
            dueDate: date.toISOString(), startTime: null, endTime: null, customer:"Bob", otherNotes:"Test"});

        let task = upcomingTasks[0];
        task.startTime = date.toISOString();
        date.setMonth(date.getMonth()+1);
        task.endTime = date.toISOString();
        updateOrders();

        createRows("Current Week", upcomingTasks, "summaryTableBody");
    }
}

createAndCompleteTasks();