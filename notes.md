# Notes
Notes for the CS 260 class

## Server Notes
The ip address is 52.7.97.46
ssh -i Aws-key.pem ubuntu@52.7.97.46
Domain name: connor-webserver-260.click
Keep the AWS server at US East (N. Virginia)
To push to server: ./deployFiles.sh -k .\Aws-key.pem -h connor-webserver-260.click -s startup

## Class Notes
The following are notes for each important section (**HTML**, **CSS**, **JS**, and **Console**)

### HTML
* **link** - Link to an external style sheet (mostly CSS) `<link rel="stylesheet" href="styles.css">`
* **script** - Points to an external JavaScript file `<script src="myscripts.js"></script>`
* **div** - A `<div>` section in a document that is styled with CSS, defines a division or a section in an HTML Document, used as a container, easily styled by using the class or id attribute. By default, browers include a link break before and after.
* **span** - An linline container used to mark up a aprt of a text/document, easily styled by CSS or manipulated by JS using class/id. Like div, but in an inline element. (display=inline)
* **img** - Inserts an image, has two required attributes `src` (path to image) and `alt` (alternate text for image). Use `<a href="link/to/site">` outside of `<img>` to add a hyperlink  
```HTML
<img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600">
```
* **ol** - Ordered List
* **ul** - Unordered List
* **p** - Paragraph
* **h1-h6** - Headings
* **Document** - `<!DOCTYPE html></html>`
### CSS
* **Order** - From inside to outside: Content, Padding, Border, Margin
* **selectors** - Used to "find" (or select) the HTML elements you want to style. Can be used for all elements. `#` is an id selector (id="??"), `.` is a class selector (class="??"). `*` affects every HTML element.
* **padding** - Padding creates extra space within an element.
* **margin** - Margin creates extra space around an element.
* **background-color** - The `background-color` property sets the background color of an element.

### JS
* **Arrow function expressions** - An arrow function expression is a compact alternative to a traditional function expression, with some semantic differences and deliberate limitations in usage `let myFunction = (a, b) => a * b;`
```js
hello = function() {
  return "Hello World!";
}
hello = () => "Hello World!";
```
* **Object** - Can be created using Object Literal, `new` keyword, Object constructor
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
```js
doSomething()
  .then((result) => doSomethingElse(result))
  .then((newResult) => doThirdThing(newResult))
  .then((finalResult) => {
    console.log(`Got the final result: ${finalResult}`);
  })
  .catch(failureCallback);
```
* **getElementById()** - The getElementById() method of the Document interface returns an Element object representing the element whose id property matches the specified string. Since element IDs are required to be unique if specified, they're a useful way to get access to a specific element quickly.
* THis can also be used to change styles, like `document.getElementById("myP2").style.color = "blue";`
* **addEventListener()** - The addEventListener() method of the EventTarget interface sets up a function that will be called whenever the specified event is delivered to the target.
* **textContent()** - The textContent property of the Node interface represents the text content of the node and its descendants.
```js
document.getElementById("divA").textContent = "This text is different!";
```
* **JSON** - JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax. It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa)

### Console
* **chmod** - Change file permissions. `chmod u+rwx file.txt ` grands read, write, and execute permissions\
* **cd** - Change directory.
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

### Other
* **Domains** - Example `https://www.shop.example.com` | `https://` -> Protocol | `www.` -> subdomain  | `shop` -> subdomain | `example.com` -> Root domain | `example` -> Domain name  | `.com` -> Top-Level domain
`banana.fruit.bozo.click` | `bozo.click` -> Root domain | `banana` & `fruit` -> subdomains | `.click` -> top-level domain
* **HTTPS** - HTTPS: Most crucially for businesses, an SSL certificate is necessary for an HTTPS web address. HTTPS is the secure form of HTTP, and HTTPS websites are websites that have their traffic encrypted by SSL/TLS.
* **DNS A record** -  A DNS A record is the most fundamental type of DNS record. The A stands for “Address,” and it’s used to point a domain name to an IP address or host. You can only use an A record when you want to point to an IPv4 address. An AAAA record is required if you wish to direct your domain to an IPv6 address. 
* **Ports** - `443` is used for HTTPS, `80` for HTTP, `22` for SSH
