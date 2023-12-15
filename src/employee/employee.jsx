import React from 'react';
import  './employee.css';

// NOT MISSING IDS IN TEXT AREA AND INPUT
export function Employee(props) {
    const [orderID, setOrderID] = React.useState("");
    const [productName, setProductName] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const [customer, setCustomer] = React.useState("");
    const [otherNotes, setOtherNotes] = React.useState("");

    
    const [upcomingTasks, setUpcomingTasks] = React.useState([]);
    const [historyTasks, setHistoryTasks] = React.useState([]);

    let groupID = props.groupID;


    function updateCurrentTask(orderID) {
        if (orderID == "" || orderID == null) {
            setOrderID(orderID);
        }
        console.log(orderID);
        let currentTask = upcomingTasks.filter((task) => {
            return task.orderID === orderID;
        })
        currentTask = currentTask.at(0);
        if (currentTask === null || currentTask === "" || currentTask == undefined) {
            currentTask = historyTasks.filter((task) => {
                return task.orderID === orderID;
            })
            currentTask = currentTask.at(0);
            if (currentTask === null || currentTask === "" || currentTask == undefined) {
                return;
            }
        }
        console.log(currentTask);
        setOrderID(orderID);
        setProductName(currentTask.productName);
        setDueDate(currentTask.dueDate);
        setCustomer(currentTask.customer);
        setOtherNotes(currentTask.otherNotes);
    }



    async function createTask() {   

        console.log(`${orderID} ${productName} ${customer}`)


        if (orderID === null || productName == null
            || dueDate == null || customer == null) {
                alert("Missing Item");
                return;
        }
        const todayDate = new Date();
        const taskDate = new Date(dueDateInput);
        if (taskDate < todayDate) {
            alert("Previous Date");
            return;
        }

        let task = {orderID : orderID, productName : productName, 
            dueDate : dueDate, customer : customer, otherNotes : otherNotes, groupID: groupID, startTime: null, endTime: null};

        try {
            console.log(`Sending ${{groupID: groupID, message : "ADDING TASK"}}`)
            socket.send(JSON.stringify({groupID: groupID, message : "ADDING TASK"}));
            let res = await fetch('/api/addTask', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(task)
            });
            if (!res.ok) {
                alert("Duplicate OrderID");
            }
            
        } catch {
            alert("Error in Adding Task. Try again");
        }
    }

    async function loadAllTasks() {
       
        let response = await fetch(`/api/getPastTasks`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({groupID: groupID})
        })
        let historyTasksJson = await response.json();
        // historyTasks = historyTasks.pastTasks;
        setHistoryTasks(historyTasksJson.pastTasks);
        console.log(historyTasksJson.pastTasks);  
    

        
        response = await fetch(`/api/getFutureTasks`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({groupID: groupID})
        });

        let upcomingTasksJson = await response.json();
        setUpcomingTasks(upcomingTasksJson.futureTasks);
        console.log(upcomingTasksJson.futureTasks);
        
    }


    const [socket, setSocket] = React.useState(null);

    React.useEffect(() => {
        loadAllTasks();
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const socket = new WebSocket(`${protocol}://${window.location.hostname}:3000`);
        socket.onopen = (event) => {
            console.log('WebSocket connection opened'); 
            socket.send(JSON.stringify({groupID: groupID, message: "ADDING CONNECTION"}));
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event.code, event.reason); 
        };

        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        socket.onmessage = (event) => {
            let object = JSON.parse(event.data);
            console.log(`Received ${object.message}`)
            if (object.message == "UPDATE TASKS") {
                loadAllTasks();
            }
        };

        setSocket(socket);

        return () => {
            socket.close();
        };
    }, []);

    const historyTasksHTML = [];
    for (const historyTask of historyTasks) {
        historyTasksHTML.push(
            <tr key={historyTask.orderID}>
                <td>{historyTask.orderID}</td>
                <td>{historyTask.productName}</td>
                <td>{historyTask.dueDate}</td>
                {/* <td><a onclick="fillModal('${orderID}')" href="#" className="link-info" data-toggle="modal" data-target="#productModal">Details</a></td> */}
            </tr>
        );
    }

    const upcomingTasksHTML = [];
    for (const upcomingTask of upcomingTasks) {
        upcomingTasksHTML.push(
            <tr key={upcomingTask.orderID}>
                <td>{upcomingTask.orderID}</td>
                <td>{upcomingTask.productName}</td>
                <td>{upcomingTask.dueDate}</td>
                
                {/* <td><a onclick="fillModal('${orderID}')" href="#" className="link-info" data-toggle="modal" data-target="#productModal">Details</a></td> */}
            </tr>
        );
    }



    return (
        <main>
            <div id="searchTask" className="container">
                <h2>Search Task</h2>
                
                <div className="container container-null" id="searchButtonEmployee">
                    <input type="text" id="productSearch" placeholder="Order ID" onChange={(e) => {updateCurrentTask(e.target.value)}} />
                </div>

                {(orderID !== null && orderID !== "") && (
                    <div>
                        <br />
                        <form>
                            <div className="form-group">
                                <label>Order ID:</label>
                                <input readOnly id="orderIDInput" type="text" placeholder="Order ID" value={orderID} />
                            </div>
                                            
                            <div className="form-group">
                                <label>Product Name:</label>
                                <input readOnly id="productNameInput" type="text" placeholder="Product Name" value={productName} />    
                            </div>
                            
                            <div className="form-group">
                                <label>Due Date:</label>
                                <input readOnly id="dueDateInput" type="text" name="varDatetime" value={dueDate} />
                            </div>
                            
                            <div className="form-group">
                                <label>Customer:</label>
                                <input readOnly id="customerInput" type="text" placeholder="Customer" value={customer} />
                            </div>
        
                            <div className="form-group">
                                <label htmlFor="otherNotesInput">Other Notes:</label>
                                <textarea readOnly id="otherNotesInput" className="form-control" value={otherNotes}></textarea>
                            </div>
                            </form>
                    </div>
                )} 
            </div>

            <div id="upcomingTasks" className="container">
                <h2>Upcoming</h2>
                <br />
                <div className="container container-null table-scroll" >
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product Name</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody id="upcomingTasksTableBody">{upcomingTasksHTML}</tbody>
                    </table>
                </div>
            </div>

            <div id="historyTasks" className="container">
                <h2>History</h2>
                <br />
                <div className="container container-null table-scroll">
                    <table className="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product Name</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        <tbody id="historyTasksTableBody">{historyTasksHTML}</tbody>
                    </table>
                </div>
            </div>
        </main>
    );
}