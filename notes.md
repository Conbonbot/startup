# Notes
Notes for the CS 260 class

## Server Notes
The ip address is 52.7.97.46
ssh -i Aws-key.pem ubuntu@52.7.97.46
Domain name: connor-webserver-260.click
Keep the AWS server at US East (N. Virginia)
To push to server: ./deployFiles.sh -k .\Aws-key.pem -h connor-webserver-260.click -s startup 
./deployReact.sh -k .\Aws-key.pem -h connor-webserver-260.click -s startup
./deployService.sh -k .\Aws-key.pem -h connor-webserver-260.click -s startup

## Class Notes
The following are notes for each important section (**HTML**, **CSS**, **JS**, and **Console**)

### HTML
* **link** - Link to an external style sheet (mostly CSS) `<link rel="stylesheet" href="styles.css">`
* **script** - Points to an external JavaScript file `<script src="myscripts.js"></script>`
* **div** - A `<div>` section in a document that is styled with CSS, defines a division or a section in an HTML Document, used as a container, easily styled by using the class or id attribute. Anything content can be put inside. By default, browers include a link break before and after.
* **span** - An linline container used to mark up a aprt of a text/document, easily styled by CSS or manipulated by JS using class/id. Like div, but in an inline element. (display=inline)
* **img** - Inserts an image, has two required attributes `src` (path to image) and `alt` (alternate text for image). Use `<a href="link/to/site">` outside of `<img>` to add a hyperlink  
```HTML
<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
```
* **ol** - Ordered List
* **ul** - Unordered List
* **p** - Paragraph
* **h1-h6** - Headings
* **Document** - `<!DOCTYPE html>` All HTML documents must start with a `!<DOCTYPE html>` declaration. However, It is not an HTML tag. It is information ot the broswer about what document to expect (`<html>` is still needed)

### CSS
* **Order** - From inside to outside: Content, Padding (space within an element), Border, Margin (space around an element)
* **selectors** - Used to "find" (or select) the HTML elements you want to style. Can be used for all elements. `#` is an id selector (id="??"), `.` is a class selector (class="??"). `*` affects every HTML element.
* **padding** - Padding creates extra space within an element.
* **margin** - Margin creates extra space around an element.
* **color** - Defines the color of text.
* **background-color** - The `background-color` property sets the background color of an element.
* **justify-content** - defines how the browser distributes space between and around content items along the main axis of a flex conainer and the inline axis of grid and multicolumn containers. Inital value is `normal`. Can be `start`, `center`, `space-between`, `space-around`, `space-evenly`, `left`, `right`.
* **Flex** - `flex: <flex-grow>, <flex-shrink>, <flex-basis>`. Allows for content to grow, shrink, and set inital size of content.
  * **flex-direction** - Sets how flex items are places in the flex container (`row`, `row-reverse`, `column`, `column-reverse`). Default value is `row`.

### JS
* **let/const** - Let allows the variable to be reassigned multiple times, while const creates a variable that cannot be reassigned after it has been assigned a value.
* **loops** 
```js
for (let i = 0; i < 2; i++) {
  console.log(i);
}

let i = 0;
do {
  console.log(i);
  i++;
} while (i < 2);

let i = 0;
while (i < 2) {
  console.log(i);
  i++;
}

const obj = { a: 1, b: 'fish' };
for (const name in obj) {
  console.log(name);
}

const arr = ['a', 'b'];
for (const name in arr) {
  console.log(name);
} // 0 1

const arr = ['a', 'b'];
for (const val of arr) {
  console.log(val);
} // 'a' 'b'
```
* **Function declaration vs. Function expression** - Function declarations are hoisted, while function expressions are not.
* **Arrow function expressions** - An arrow function expression is a compact alternative to a traditional function expression, with some semantic differences and deliberate limitations in usage `let myFunction = (a, b) => a * b;`. If the function has only one statement that returns a value, you can remove the brackets and the `return` keyword. Don't have their own bindings to `this`, `arguments`, or `super`, and should not be used as methods.
```js
hello = function() {
  return "Hello World!";
}
hello = () => "Hello World!";
```
* **Object** - Can be created using Object Literal, `new` keyword, Object constructor. Note: `const` in front  of an object implies that there is an object, and you're working with **references** to alter it. You shold not attempt to reassign references to this object.
```js
const person = {};
const person = new Object();
const myFather = new Person("John", "Doe", 50, "blue");
```
* **Object.defineProperty()** - Used to add a new property to an object, change property values, change property medadata, and change object getters and setters
```js
Object.defineProperty(object, property, descriptor)
Object.defineProperty(person, "year", {value:"2008"});
```
* **map** - The `map()` method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
```js
const array1 = [1, 4, 9, 16];

// Pass a function to map
const map1 = array1.map((x) => x * 2);
// Array [2, 8, 18, 32]
```
* **Promise** - The Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
```js
function doSomething() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Other things to do before completion of the promise
      console.log("Did something");
      // The fulfillment value of the promise
      resolve("https://example.com/");
      // If not fulfilled
      reject("https://example.com/2");
    }, 200);
  });
}
```
Another example of Promises
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

coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```
* **async/await** - Asynchronous execution (like Promises), but with more consise representation. The `async` keyword declares a function that returns a promise. The `await` keyword wraps a call to the `async` function, blocks execution until the promise has been resolved, and then returns the result of the promise. The advantage to Promises is when multiple promises are required.
```js
// Same coin toss method as above
try {
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Toss completed`);
}
```
Example using Promises & await
```js
const httpPromise = fetch('https://simon.cs260.click/api/user/me');
const jsonPromise = httpPromise.then((r) => r.json());
jsonPromise.then((j) => console.log(j));
console.log('done');
// OR
const httpResponse = await fetch('https://simon.cs260.click/api/user/me');
const jsonResponse = await httpResponse.json();
console.log(jsonResponse);
console.log('done');
```
* **getElementById()** - The getElementById() method of the Document interface returns an Element object representing the element whose id property matches the specified string. Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.
* This can also be used to change styles, like 
```js
document.getElementById("myP2").style.color = "blue";
```
* **addEventListener()** - The addEventListener() method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.
* **textContent()** - The textContent property of the Node interface represents the text content of the node and its descendants.
```js
document.getElementById("divA").textContent = "This text is different!";
```
* **JSON** - JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa). 
JSON provides a simple, and yet effective way, to share and store data. By design JSON is easily convertible to, and from, JavaScript objects. This makes it a very convenient data format when working with web technologies. Because of its simplicity, standardization, and compatibility with JavaScript, JSON has become one of the world's most popular data formats.
Most commonly, a JSON document contains an object. Objects contain zero or more key value pairs. The key is always a string, and the value must be one of the valid JSON data types. Key value pairs are delimited with commas. Curly braces delimit an object, square brackets and commas delimit arrays, and strings are always delimited with double quotes.

### Console
* **chmod** - Change file permissions. `chmod u+rwx file.txt ` grands read, write, and execute permissions\
* **cd** - Change directory.
* **pwd** - Print current workign directory (path to directory)
* **ls** - View directory. `-l` for long format listing, `-a` include hidden files, `-h` human-readable file sizes
* **vim/nano** - Text editor
* **mkdir** - Makes directory.
* **mv** - Moves/rename files and directories
* **rm** - removes files and directories
* **man** - Displays user manual for a command
* **ssh** - Securely connect to a remote server
* **ps** - Display running processes
* **wget** - Download files from the web
* **sudo** - Super User.

### APIs
Below are API request methods
* **GET** - retrieves information or data from a specified resource
* **POST** - submits data to be processed to a specified resource
* **PUT** - updates a specified resource with new data
* **DELETE** - deletes a specified resource
* **PATCH** - partially updates a specified resource
* **OPTIONS** - retrieves the supported HTTP methods of a server endpoint
* **HEAD** - retrieves only the headers of a response without the response body
* **CONNECT** - establishes a network connection to a resource, typically used for SSL/TLS tunneling
* **TRACE** - echoes the received request back to the client, for debugging purposes

### Other

* **Domains** - A domain name is simply a text string that follows a specific naming convention and is listed in a special database called the domain name registry. Broken up into a root domain, with one or more possible subdomains prefixes. The root domain is represented by a secondary level domain and a top level domain (e.g. `.com`)
Example `https://www.shop.example.com` | `https://` -> Protocol | `www.` -> subdomain  | `shop` -> subdomain | `example.com` -> Root domain | `shop.example.com` -> Domain name  | `.com` -> Top-Level domain
* **DOM** - Document Object Model. The Document Object Model (DOM) is an object representation of the HTML elements that the browser uses to render the display. The browser also exposes the DOM to external code so that you can write programs that dynamically manipulate the HTML. The browser provides access to the DOM through a global variable name document that points to the root element of the DOM. If you open the browser's debugger console window and type the variable name document you will see the DOM for the document the browser is currently rendering. Every element in an HTML document implements the DOM element interface. It can be accessed, modified, injected, and have event listeners.
* **HTTPS** - HTTPS: Most crucially for businesses, an SSL certificate is necessary for an HTTPS web address. HTTPS is the secure form of HTTP, and HTTPS websites are websites that have their traffic encrypted by SSL/TLS.
* **DNS A record** -  A DNS A record is the most fundamental type of DNS record. The A stands for “Address,” and it’s used to point a domain name to an IP address or host. You can only use an A record when you want to point to an IPv4 address. An AAAA record is required if you wish to direct your domain to an IPv6 address. 
* **Ports** - `443` is used for HTTPS, `80` for HTTP, `22` for SSH



