* In the following code, what does the link element do?



* In the following code, what does a div tag do?



* In the following code, what is the difference between the #title and .grid selector?



* In the following code, what is the difference between padding and margin?

Padding represents the amount of inner space an element has, while the margin is whitespace available surrounding an element

* Given this HTML and this CSS how will the images be displayed using flex?

    Now we can use Flexbox to make it all come alive. We make the body element into a responsive flexbox by including the CSS `display` property with the value of `flex`. This tells the browser that all of the children of this element are to be displayed in a flex flow. We want our top level flexbox children to be column oriented and so we add the `flex-direction` property with a value of `column`. We then add some simple other declarations to zero out the margin and fill the entire viewport with our application frame.

    ```css
    body {
    display: flex;
    flex-direction: column;
    margin: 0;
    height: 100vh;
    }
    ```

    To get the division of space for the flexbox children correct we add the following flex properties to each of the children.

    - **header** - `flex: 0 80px` - Zero means it will not grow and 80px means it has a starting basis height of 80 pixels. This creates a fixed size box.
    - **footer** - `flex: 0 30px` - Like the header it will not grow and has a height of 30 pixels.
    - **main** - `flex: 1` - One means it will get one fractional unit of growth, and since it is the only child with a non-zero growth value, it will get all the remaining space. Main also gets some additional properties because we want it to also be a flexbox container for the controls and content area. So we set its display to be `flex` and specify the `flex-direction` to be row so that the children are oriented side by side.

    ```css
    header {
    flex: 0 80px;
    background: hsl(223, 57%, 38%);
    }

    footer {
    flex: 0 30px;
    background: hsl(180, 10%, 10%);
    }

    main {
    flex: 1;
    display: flex;
    flex-direction: row;
    }
    ```

    Now we just need to add CSS to the control and content areas represented by the two child section elements. We want the controls to have 25% of the space and the content to have the remaining. So we set the `flex` property value to 1 and 3 respectively. That means that the controls get one unit of space and the content gets three units of space. No matter how we resize things this ratio will responsively remain.

    ```css
    section:nth-child(1) {
    flex: 1;
    background-color: hsl(180, 10%, 80%);
    }
    section:nth-child(2) {
    flex: 3;
    background-color: white;
    }
    ```

    ## Media Query

    That completes our original design, but we also want to handle small screen sizes. To do this, we add some media queries that drop the header and footer if the viewport gets too short, and orient the main sections as rows if it gets too narrow.

    To support the narrow screen (portrait mode), we include a media query that detects when we are in portrait orientation and sets the `flex-direction` of the main element to be column instead of row. This causes the children to be stacked on top of each other instead of side by side.

    To handle making our header and footer disappear when the screen is to short to display them, we use a media query that triggers when our viewport height has a maximum value of 700 pixels. When that is true we change the `display` property for both the header and the footer to `none` so that they will be hidden. When that happens the main element becomes the only child and since it has a flex value of 1, it takes over everything.

    ```css
    @media (orientation: portrait) {
    main {
        flex-direction: column;
    }
    }

    @media (max-height: 700px) {
    header {
        display: none;
    }
    footer {
        display: none;
    }
    }
    ```

* What does the following padding CSS do?

    Next comes the padding. The padding will inherit things like the background color. After padding is the border, which has properties like color, thickness and line style. The final box is the margin. The margin is considered external to the actual styling of the box and therefore only represents whitespace. It is important to understand each of these boxes so that you can achieve the desired visual result by applying the proper CSS declaration.


    By default, the width and height of an element is defined by the width and height of the content box. You can change the box-sizing CSS property from the default value of content-box to border-box in order to redefine the width and height to also include the padding and the border. This often makes it easier to style elements when their visual size matches their actual size.

* What does the following code using arrow syntax function declaration do?



* What does the following code using map with an array output?

```js
const numbers = [4, 9, 16, 25];
const newArr = numbers.map(Math.sqrt)

// [2, 3, 4, 5]
```

* What does the following code output using getElementByID and addEventListener?



* What does the following line of Javascript do using a # selector?



* Which of the following are true? (mark all that are true about the DOM)

    The Document Object Model (DOM) is an object representation of the HTML elements that the browser uses to render the display. The browser also exposes the DOM to external code so that you can write programs that dynamically manipulate the HTML.

    The browser provides access to the DOM through a global variable name `document` that points to the root element of the DOM. If you open the browser's debugger console window and type the variable name `document` you will see the DOM for the document the browser is currently rendering.

    ```html
    > document

    <html lang="en">
    <body>
        <p>text1 <span>text2</span></p>
        <p>text3</p>
    </body>
    </html>
    ```

    ```css
    p {
    color: red;
    }
    ```

    For everything in an HTML document there is a node in the DOM. This includes elements, attributes, text, comments, and whitespace. All of these nodes form a big tree, with the document node at the top.

    ## Accessing the DOM

    Every element in an HTML document implements the DOM Element interface, which is derived from the DOM Node interface. The [DOM Element Interface](https://developer.mozilla.org/en-US/docs/Web/API/Element) provides the means for iterating child elements, accessing the parent element, and manipulating the element's attributes. From your JavaScript code, you can start with the `document` variable and walk through the every element in the tree.

    ```js
    function displayElement(el) {
    console.log(el.tagName);
    for (const child of el.children) {
        displayElement(child);
    }
    }

    displayElement(document);
    ```

    You can provide a CSS selector to the `querySelectorAll` function in order to select elements from the document. The `textContent` property contains all of the element's text. You can even access a textual representation of an element's HTML content with the `innerHTML` property.

    ```js
    const listElements = document.querySelectorAll('p');
    for (const el of listElements) {
    console.log(el.textContent);
    }
    ```

    ## Modifying the DOM

    The DOM supports the ability to insert, modify, or delete the elements in the DOM. To create a new element you first create the element on the DOM document. You then insert the new element into the DOM tree by appending it to an existing element in the tree.

    ```js
    function insertChild(parentSelector, text) {
    const newChild = document.createElement('div');
    newChild.textContent = text;

    const parentElement = document.querySelector(parentSelector);
    parentElement.appendChild(newChild);
    }

    insertChild('#courses', 'new course');
    ```

    To delete elements call the `removeChild` function on the parent element.

    ```js
    function deleteElement(elementSelector) {
    const el = document.querySelector(elementSelector);
    el.parentElement.removeChild(el);
    }

    deleteElement('#courses div');
    ```

    ## Injecting HTML

    The DOM also allows you to inject entire blocks of HTML into an element. The following code finds the first `div` element in the DOM and replaces all the HTML it contains.

    ```js
    const el = document.querySelector('div');
    el.innerHTML = '<div class="injected"><b>Hello</b>!</div>';
    ```

    However, directly injecting HTML as a block of text is a common attack vector for hackers. If an untrusted party can inject JavaScript anywhere in your application then that JavaScript can represent itself as the current user of the application. The attacker can then make requests for sensitive data, monitor activity, and steal credentials. The example below shows how the img element can be used to launch an attack as soon as the page is loaded.

    ```html
    <img src="bogus.png" onerror="console.log('All your base are belong to us')" />
    ```

    If you are injecting HTML, make sure that it cannot be manipulated by a user. Common injection paths include HTML input controls, URL parameters, and HTTP headers. Either sanitize any HTML that contains variables, or simply use DOM manipulation functions instead of using `innerHTML`.

    ## Event Listeners

    All DOM elements support the ability to attach a function that gets called when an event occurs on the element. These functions are called [event listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener). Here is an example of an event listener that gets called when an element gets clicked.

    ```js
    const submitDataEl = document.querySelector('#submitData');
    submitDataEl.addEventListener('click', function (event) {
    console.log(event.type);
    });
    ```

    There are lots of possible events that you can add a listener to. This includes things like mouse, keyboard, scrolling, animation, video, audio, WebSocket, and clipboard events. You can see the full list on [MDN](https://developer.mozilla.org/en-US/docs/Web/Events). Here are a few of the more commonly used events.

    | Event Category | Description           |
    | -------------- | --------------------- |
    | Clipboard      | Cut, copied, pasted   |
    | Focus          | An element gets focus |
    | Keyboard       | Keys are pressed      |
    | Mouse          | Click events          |
    | Text selection | When text is selected |

    You can also add event listeners directly in the HTML. For example, here is a `onclick` handler that is attached to a button.

    ```html
    <button onclick='alert("clicked")'>click me</button>
    ```

* By default, the HTML span element has a default CSS display property value of: 

display: inline;

* How would you use CSS to change all the div elements to have a background color of red?

```css
div {
    background-color: red;
}

```

* How would you display an image with a hyperlink in HTML?

<a href="link address"><img src="image destination"></a>


* In the CSS box model, what is the ordering of the box layers starting at the inside and working out?

    Content: This innermost layer represents the actual content of the HTML element, such as text, images, or other media.

    Padding: The padding is the space between the content and the border. It provides space around the content inside the element. Padding can be specified using the padding property in CSS.

    Border: The border is the line that goes around the padding and the content. It marks the boundary of the element. The border can be styled using the border property in CSS.

    Margin: The margin is the space outside the border and defines the space between the element's border and other elements. It is used to create space between elements. The margin can be specified using the margin property in CSS.

* Given the following HTML, what CSS would you use to set the text "troubl" to green and leave the "double" text unaffected?

```
<p>double <span class="green-text">troubl</span></p>

.green-text {
    color: green;
}
```

* What will the following code output when executed using a for loop and console.log?



* How would you use JavaScript to select an element with the id of “byu” and change the text color of that element to green?

```
<p id="byu">Sample Text</p>

const element = document.getElementById('byu');
element.style.color = 'green';
```

* What is the opening HTML tag for a paragraph, ordered list, unordered list, second level heading, first level heading, third level heading?

    Paragraph (<p>)

    Ordered List (<ol>)

    Unordered List (<ul>)

    Second Level Heading (<h2>)

    First Level Heading (<h1>)

    Third Level Heading (<h3>)

* How do you declare the document type to be html?

```html
<!DOCTYPE html>
```

* What is valid javascript syntax for if, else, for, while, switch statements?

```js
let condition = true;

if (condition) {
    // Code block to be executed if the condition is true
    console.log('Condition is true');
} else {
    // Code block to be executed if the condition is false
    console.log('Condition is false');
}

//--------------------------------------------
for (let i = 0; i < 5; i++) {
    // Code block to be executed in each iteration
    console.log(i);
}


let count = 0;
while (count < 5) {
    // Code block to be executed as long as the condition is true
    console.log(count);
    count++;
}

//---------------------------------------------
let day = 'Monday';

switch (day) {
    case 'Monday':
        console.log('Today is Monday');
        break;
    case 'Tuesday':
        console.log('Today is Tuesday');
        break;
    // Other cases...
    default:
        console.log('Another day');
}
```

* What is the correct syntax for creating a javascript object?

```js
// Creating an object using object literal notation
let person = {
    name: 'John',
    age: 30,
    city: 'New York'
};

// Creating an object using new Object() syntax
let person = new Object();
person.name = 'John';
person.age = 30;
person.city = 'New York';

```

* Is is possible to add new properties to javascript objects?

Yes 

* If you want to include JavaScript on an HTML page, which tag do you use?

```html
<script src="yourScriptFile.js"></script>
```

Given the following HTML, what JavaScript could you use to set the text "animal" to "crow" and leave the "fish" text unaffected?

```
<!-- Example HTML structure -->
<div id="animals">
    <p>animal</p>
    <p>fish</p>
</div>

// Select the first <p> element within the div with id="animals"
let animalElement = document.querySelector('#animals p:first-child');

// Update the text content of the selected element
animalElement.textContent = 'crow';
```

* Which of the following correctly describes JSON?

    JSON (JavaScript Object Notation) is a lightweight data interchange format that is easy for humans to read and write. It is also easy for machines to parse and generate. Some correct descriptions of JSON include:

    A Data Format: JSON is a data format that uses human-readable text to transmit data objects consisting of attribute-value pairs. It's primarily used to transmit data between a server and a web application as an alternative to XML.

    Based on JavaScript Syntax: JSON is based on a subset of the JavaScript programming language and is commonly used with JavaScript. However, it's a language-independent data format and can be used in many other programming languages.

    Textual Format: JSON is text-based and can be easily read and written by humans. It uses conventions similar to those of JavaScript Object Literal Notation, making it familiar to developers working with JavaScript.

    Supports Key-Value Pairs: JSON consists of key-value pairs, where keys are strings and values can be strings, numbers, arrays, objects, boolean values, or null.

    Widely Used for APIs: It is commonly used as a data format for APIs (Application Programming Interfaces) to exchange information between servers and clients.

    JSON is commonly used for serialization and transmission of structured data over the internet, making it a popular choice for APIs and data exchange due to its simplicity and flexibility.


    JavaScript Object Notation (JSON) was conceived by Douglas Crockford in 2001 while working at Yahoo! JSON, pronounced like the name Jason, received official standardization in 2013 and 2017 (ECMA-404, [RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)).

    JSON provides a simple, and yet effective way, to share and store data. By design JSON is easily convertible to, and from, JavaScript objects. This make it a very convenient data format when working with web technologies. Because of its simplicity, standardization, and compatibility with JavaScript, JSON has become one of the world's most popular data formats.

    ### Format

    A JSON document contains one of the following data types:

    | Type    | Example                 |
    | ------- | ----------------------- |
    | string  | "crockford"             |
    | number  | 42                      |
    | boolean | true                    |
    | array   | [null,42,"crockford"]   |
    | object  | {"a":1,"b":"crockford"} |
    | null    | null                    |

    Most commonly, a JSON document contains an object. Objects contain zero or more key value pairs. The key is always a string, and the value must be one of the valid JSON data types. Key value pairs are delimited with commas. Curly braces delimit an object, square brackets and commas delimit arrays, and strings are always delimited with double quotes.

    Here is an example of a JSON document.

    ```json
    {
    "class": {
        "title": "web programming",
        "description": "Amazing"
    },
    "enrollment": ["Marco", "Jana", "فَاطِمَة"],
    "start": "2025-02-01",
    "end": null
    }
    ```

    JSON is always encoded with [UTF-8](https://en.wikipedia.org/wiki/UTF-8). This allows for the representation of global data.

    ### Converting to JavaScript

    You can convert JSON to, and from, JavaScript using the `JSON.parse` and `JSON.stringify` functions.

    ```js
    const obj = { a: 2, b: 'crockford', c: undefined };
    const json = JSON.stringify(obj);
    const objFromJson = JSON.parse(json);

    console.log(obj, json, objFromJson);

    // OUTPUT:
    // {a: 2, b: 'crockford', c: undefined}
    // {"a":2, "b":"crockford"}
    // {a: 2, b: 'crockford'}
    ```

    Note that in this example, JSON cannot represent the JavaScript `undefined` object and so it gets dropped when converting from JavaScript to JSON.


* What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps, wget, sudo  do?

    * chmod
    * man
    * ssh
    * ps
    * wget
    * sudo
    * do

    chmod: Stands for "change mode." It is used to change the permissions (read, write, execute) of files and directories in Unix-like operating systems.

    pwd: Stands for "print working directory." It displays the current working directory (the absolute path of the current directory) in the file system.

    cd: Stands for "change directory." It is used to change the current working directory within the file system.

    ls: Stands for "list." It is used to list the contents of a directory, showing files and subdirectories.

    vim: A text editor in Unix-like operating systems. Vim stands for "Vi IMproved" and is a highly configurable and powerful text editor often used for programming and system administration tasks.

    nano: Another text editor in Unix-like systems. Nano is a more user-friendly and simple text editor, especially suitable for beginners or quick edits.

    mkdir: Stands for "make directory." It's used to create new directories or folders in the file system.

    mv: Stands for "move." It's used to move files or directories from one location to another within the file system.

    rm: Stands for "remove." It's used to delete or remove files or directories from the file system. Caution should be exercised with this command as it's irreversible.

    man: Stands for "manual." It's used to access manual pages for other commands. For example, man ls displays the manual page for the ls command.

    ssh: Stands for "secure shell." It's used to securely connect to a remote computer over an unsecured network, allowing for remote command-line access.

    ps: Stands for "process status." It's used to display information about the currently running processes on the system.

    wget: It's a command-line tool used to download files from the internet using various protocols like HTTP, HTTPS, and FTP.

    sudo: Stands for "superuser do." It's used to execute commands with elevated permissions, typically as a superuser or administrator.

Which of the following console command creates a remote shell session?

```sh
ssh username@remote_host
```

* Which of the following is true when the -la parameter is specified for the ls console command?

    When the -la parameters are used with the ls command in Unix-like operating systems, it performs the following tasks:

    List All Files: The -a flag lists all files, including hidden files that start with a dot (.). By default, the ls command does not show hidden files. The -a flag reveals hidden files along with the regular files.

    List in Long Format: The -l flag displays detailed information about each file in a long format. This includes file permissions, number of links, owner, group, file size, last modification date, and the file/directory name.

    Therefore, when you use ls -la in the command line, it lists all files (including hidden ones) and displays them in a long format showing detailed information for each file in the specified directory.

* Which of the following is true for the domain name banana.fruit.bozo.click, which is the top level domain, which is a subdomain, which is a root domain?

    * root domain - bozo
    * top level domain - fruit
    * subdomain - banana


* Is a web certificate is necessary to use HTTPS.

    * Yes
    * ```
                http
    [Browser] <----------> [Server]
      ```
    * ```
    [Browser] -----------> [Server]
        |                     |
         \-  [Certificate] <-/
    ```


* Can a DNS A record can point to an IP address or another A record.

    In the Domain Name System (DNS), an A record (Address record) maps a domain name to an IPv4 address. This A record is specifically used to associate a domain name with an IP address.

    An A record in DNS can only point to an IPv4 address, not to another A record or domain name. Its primary purpose is to translate domain names (like example.com) into the corresponding IP address (like 192.0.2.1). This mapping enables users and devices to reach the intended server associated with that domain.

    However, to indirectly link one domain name to another domain name, a CNAME (Canonical Name) record is used. The CNAME record serves to create an alias from one domain name to another, allowing one domain to act as an alias or reference to another domain.

    For example:

    A record directly points to an IP address:

    css
    Copy code
    example.com. IN A 192.0.2.1
    CNAME record indirectly points to another domain or hostname:

    objectivec
    Copy code
    www.example.com. IN CNAME example.com.
    In this instance, the www.example.com domain is a CNAME for example.com. Whenever someone queries www.example.com, it resolves to the IP address associated with example.com through the A record for example.com. This allows for the abstraction of domain names, permitting one domain to refer to another domain indirectly through the CNAME record.

    NO



* Port 443, 80, 22 is reserved for which protocol?

    Port 443: Reserved for HTTPS (Hypertext Transfer Protocol Secure). This port is used for secure web browsing, encrypted communication over the internet, and transferring data securely using SSL/TLS (Secure Sockets Layer/Transport Layer Security).

    Port 80: Reserved for HTTP (Hypertext Transfer Protocol). This port is the standard port for unencrypted web traffic, used for accessing websites and web services over the internet.

    Port 22: Reserved for SSH (Secure Shell). This port is used for secure remote access, providing encrypted communication for logging into and executing commands on a remote machine securely.

* What will the following code using Promises output when executed?

    JavaScript executes as a single threaded application. That means there is only ever one piece of code executing at the same time. However, the fact that it does not execute concurrently does not mean that it does not execute in parallel. You can asynchronously execute code with the use of a JavaScript `Promise`. Because the execution is asynchronous the promise object can be in one of three states at any given point in time.

    1. **pending** - Currently running asynchronously
    1. **fulfilled** - Completed successfully
    1. **rejected** - Failed to complete

    You create a promise by calling the Promise object constructor and passing it an executor function that runs the asynchronous operation. Executing asynchronously means that promise constructor may return before the promise executor function runs.

    We can demonstrate asynchronous execution by using the standard JavaScript `setTimeout` function to create a delay in the execution of the code. The setTimeout function takes the number of milliseconds to wait and a function to call after that amount of time has expired. We call the delay function in a for loop in the promise executor and also a for loop outside the promise so that both code blocks are running in parallel.

    ```js
    const delay = (msg, wait) => {
    setTimeout(() => {
        console.log(msg, wait);
    }, 1000 * wait);
    };

    new Promise((resolve, reject) => {
    // Code executing in the promise
    for (let i = 0; i < 3; i++) {
        delay('In promise', i);
    }
    });

    // Code executing after the promise
    for (let i = 0; i < 3; i++) {
    delay('After promise', i);
    }

    // OUTPUT:
    //   In promise 0
    //   After promise 0
    //   In promise 1
    //   After promise 1
    //   In promise 2
    //   After promise 2
    ```

    ## Resolving and rejecting

    Now that we know how to use a promise to execute asynchronously, we need to be able to set the state to `fulfilled` when things complete correctly, or to `rejected` when an error happens. The promise executor function takes two functions as parameters, `resolve` and `reject`. Calling `resolve` sets the promise to the `fulfilled` state, and calling `reject` sets the promise to the `rejected` state.

    Consider the following "coin toss" promise that waits ten seconds and then has a fifty percent chance of resolving or rejecting.

    ```js
    const coinToss = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.5) {
        resolve('success');
        } else {
        reject('error');
        }
    }, 10000);
    });
    ```

    If you log the coinToss promise object to the console immediately after calling the constructor, it will display that it is in the `pending` state.

    ```js
    console.log(coinToss);
    // OUTPUT: Promise {<pending>}
    ```

    If you then wait ten seconds and the log the coinToss promise object again, the state will either show as `fulfilled` or `rejected` depending upon the way the coin landed.

    ```js
    console.log(coinToss);
    // OUTPUT: Promise {<fulfilled>}
    ```

    ## Then, catch, finally

    With the ability to asynchronously execute and set the resulting state, we now need a way to generically do something with the result of a promise after it resolves. This is done with functionality similar to exception handling. The promise object has three functions: `then`, `catch`, and `finally`. The `then` function is called if the promise is fulfilled, `catch` is called if the promise is `rejected`, and `finally` is always called after all the processing is completed.

    We can rework our coinToss example and make it so 10 percent of the time the coin falls off the table and resolves to the rejected state. Otherwise the promise resolves to fulfilled with a result of either `heads` or `tails`.

    ```js
    const coinToss = new Promise((resolve, reject) => {
    setTimeout(() => {
        if (Math.random() > 0.1) {
        resolve(Math.random() > 0.5 ? 'heads' : 'tails');
        } else {
        reject('fell off table');
        }
    }, 10000);
    });
    ```

    We then chain the `then`, `catch` and `finally` functions to the coinToss object in order to handle each of the possible results.

    ```js
    coinToss
    .then((result) => console.log(`Coin toss result: ${result}`))
    .catch((err) => console.log(`Error: ${err}`))
    .finally(() => console.log('Toss completed'));

    // OUTPUT:
    //    Coin toss result: tails
    //    Toss completed
    ```

    ## The observer pattern

    Promises are the standard way to do asynchronous processing in JavaScript, but they are not the only way. The `Observer` pattern, popularized by web programming frameworks such as `Angular`, use a model called `Observer`. The major difference between Observers and Promises is that Promises immediately begin to execute when the Promise is created, but Observers form a pipeline that you then pass an execution object into. This allows Observers to be reused, and the result of executing an Observable to be saved as a history of a particular execution.


    JavaScript Promise objects are great for asynchronous execution, but as developers began to build large systems with promises they started wanting a more concise representation. This was provided with the introduction of the `async/await` syntax. The `await` keyword wraps the execution of a promise and removed the need to chain functions. The `await` expression will block until the promise state moves to `fulfilled`, or throws an exception if the state moves to `rejected`. For example, if we have a function that returns a coin toss promise.

    ```js
    const coinToss = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
        if (Math.random() > 0.1) {
            resolve(Math.random() > 0.5 ? 'heads' : 'tails');
        } else {
            reject('fell off table');
        }
        }, 1000);
    });
    };
    ```

    We can create equivalent executions with either a promise `then/catch` chain, or an `await` with a `try/catch` block.

    **then/catch chain version**

    ```js
    coinToss()
    .then((result) => console.log(`Toss result ${result}`))
    .catch((err) => console.error(`Error: ${err}`))
    .finally(() => console.log(`Toss completed`));
    ```

    **async, try/catch version**

    ```js
    try {
    const result = await coinToss();
    console.log(`Toss result ${result}`);
    } catch (err) {
    console.error(`Error: ${err}`);
    } finally {
    console.log(`Toss completed`);
    }
    ```

    ## async

    One important restriction for working with `await` is that you cannot call await unless it is called at the top level of the JavaScript, or is in a function that is defined with the `async` keyword. Applying the `async` keyword transforms the function so that it returns a promise that will resolve to the value that was previously returned by the function. Basically this turns any function into an asynchronous function, so that it can in turn make asynchronous requests.

    This can be demonstrated with a function that makes animal noises. Notice that the return value is a simple string.

    ```js
    function cow() {
    return 'moo';
    }
    console.log(cow());
    // OUTPUT: moo
    ```

    If we designate the function to be asynchronous then the return value becomes a promise that is immediately resolved and has a value that is the return value of the function.

    ```js
    async function cow() {
    return 'moo';
    }
    console.log(cow());
    // OUTPUT: Promise {<fulfilled>: 'moo'}
    ```

    We then change the cow function to explicitly create a promise instead of the automatically generated promise that the await keyword generates.

    ```js
    async function cow() {
    return new Promise((resolve) => {
        resolve('moo');
    });
    }
    console.log(cow());
    // OUTPUT: Promise {<pending>}
    ```

    You can see that the promise is in the pending state because the promise's execution function has not yet resolved.

    ## await

    The `async` keyword declares that a function returns a promise. The `await` keyword wraps a call to the `async` function, blocks execution until the promise has resolved, and then returns the result of the promise.

    We can demonstrate `await` in action with the cow promise from above. If we log the output from invoking `cow` then we see that the return value is a promise. However, if we prefix the call to the function with the await keyword, execution will stop until the promise has resolved, at which point the result of the promise is returned instead of the actual promise object.

    ```js
    console.log(cow());
    // OUTPUT: Promise {<pending>}

    console.log(await cow());
    // OUTPUT: moo
    ```

    By combining `async`, to define functions that return promises, with `await`, to wait on the promise, you can create code that is asynchronous, but still maintains the flow of the code without explicitly using callbacks.

    ## Putting it all together

    You can see the benefit for `async`/`await` clearly by considering a case where multiple promises are required. For example, when calling the `fetch` web API on an endpoint that returns JSON, you would need to resolve two promises. One for the network call, and one for converting the result to JSON. A promise implementation would look like the following.

    ```js
    const httpPromise = fetch('https://simon.cs260.click/api/user/me');
    const jsonPromise = httpPromise.then((r) => r.json());
    jsonPromise.then((j) => console.log(j));
    console.log('done');

    // OUTPUT: done
    // OUTPUT: {email: 'bud@mail.com', authenticated: true}
    ```

    With async/await, you can clarify the code intent by hiding the promise syntax, and also make the execution block until the promise is resolved.

    ```js
    const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
    const jsonResponse = await httpResponse.json();
    console.log(jsonResponse));
    console.log('done');

    // OUTPUT: {email: 'bud@mail.com', authenticated: true}
    // OUTPUT: done
    ```