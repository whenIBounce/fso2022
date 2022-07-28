Full Stack Open Course 2022
- [Introduction](#introduction)
- [Part 0](#part-0)
- [Part 1](#part-1)
  - [NB on **State**:](#nb-on-state)
  - [NB on **components**:](#nb-on-components)
- [Part 2](#part-2)
  - [How to render a data collection , like a list of names?](#how-to-render-a-data-collection--like-a-list-of-names)
  - [JavaScript Engines, or runtime enviornments, follows the *asynchronous* model.](#javascript-engines-or-runtime-enviornments-follows-the-asynchronous-model)
  - [How JavaScript code in the browser can fetch and handle data stored in a remote backend server?](#how-javascript-code-in-the-browser-can-fetch-and-handle-data-stored-in-a-remote-backend-server)
  - [React dev server:](#react-dev-server)
  - [Simple ways of adding CSS styles to a React app.](#simple-ways-of-adding-css-styles-to-a-react-app)
- [Part 3](#part-3)
  - [HTTP Cookies](#http-cookies)
    - [HTTP is **stateless**](#http-is-stateless)
    - [Creating cookies](#creating-cookies)
    - [Other ways to store information in the browser](#other-ways-to-store-information-in-the-browser)
  - [Cross-Origin Resource Sharing](#cross-origin-resource-sharing)
  - [Node.js](#nodejs)
    - [Differences between Node.js and the Browser](#differences-between-nodejs-and-the-browser)
    - [Express](#express)
      - [Why shall we uss Express?](#why-shall-we-uss-express)
      - [What is Express?](#what-is-express)
      - [What is Middleware?](#what-is-middleware)
        - [Definition](#definition)
        - [Middleware functions](#middleware-functions)
        - [`next()`](#next)
      - [Middlewares We have used in Part 3](#middlewares-we-have-used-in-part-3)
  - [MongoDB and Mongoose](#mongodb-and-mongoose)
    - [MongoDB](#mongodb)
      - [Collections](#collections)
      - [Documents](#documents)
    - [Mongoose](#mongoose)
      - [Mongoose Schema](#mongoose-schema)
      - [Mongoose Models](#mongoose-models)
      - [SchemaType](#schematype)
      - [Validation](#validation)

# Introduction
[Full Stack Open 2022: Deep Dive Into Modern Web Development](https://fullstackopen.com/en/)

This file summarizes what I learned from each part of the course, and it mainly focus on concepts instead of the practice of these concepts. 

Some topics were not explicitly included in course material, but it was necessary to understand before programming, such as, the overview of HTTP, JavaScript Engines, or runtime enviornments, Promise, etc. 

There are lots of notions and skills involved in Modern Web Development, we will forget what we wrote in homework projects very quickly. An advice from Elon Much on how to build knowledge:

> it is important to view knowledge as sort of a semantic tree — make sure you understand the fundamental principles, ie the trunk and big branches, before you get into the leaves/details or there is nothing for them to hang on to. 

This review file serves as my semantic tree of web dev knowledge. 

# Part 0
- difference between traditional web development and AJAX
- single page app
- how browser communicates with server

# Part 1
projects in this part demonstrate the use of *functional components* and *State Hook*
## NB on **State**: 
  1. it is **forbidden in React to mutate state directly**, since it can result in unexpected side effects.
  2. The useState function (as well as the useEffect function) **must not be called from inside of a loop, a conditional expression**, or any place that is not a function defining a component.
  3. It was recommended to *split state into multiple state variables based on which values tend to change together.*
 ## NB on **components**:
   1. Never define components inside of other components.
   2. The biggest problems are due to the fact that React treats a component defined inside of another component as a new component in every render. This makes it impossible for React to optimize the component.
   
 
# Part 2

## How to render a data collection , like a list of names?
  The use of Keys: Keys serve as a hint to React. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. **NB**: But they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name. 
  
## JavaScript Engines, or runtime enviornments, follows the *asynchronous* model. 
  1. Currently, JavaScript engines are **single-threaded**, which means that they cannot execute code in parallel. 
  2. Each message is processed completely before any other message is processed.

      This offers some nice properties when reasoning about your program, including the fact that whenever a function runs, it cannot be preempted and will run entirely before any other code runs (and can modify data the function manipulates). This differs from C, for instance, where if a function runs in a thread, it may be stopped at any point by the runtime system to run some other code in another thread.
  
  3. As a result, it is a requirement in practice to **use a non-blocking model for executing IO operations**. Otherwise, the browser would "freeze" during, for instance, the fetching of data from a server.
  
  4. Explain JavaScript runtime environment model: It consists of a Heap, a Stack, Web APIs, a **event loop + a queue**...
  ![image](https://user-images.githubusercontent.com/108560114/179148904-e9678fc7-cbb9-48a2-b9d3-af66b99a422f.png)


## How JavaScript code in the browser can fetch and handle data stored in a remote backend server?
  1. A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.
  2. Three distinct states of a Promise:
      - The promise is *pending*: It means that the final value (one of the following two) is not available yet.
      - The promise is fulfilled: It means that the operation has been completed and the final value is *available*, which generally is a successful operation. This state is sometimes also called resolved.
      - The promise is *rejected*: It means that an error prevented the final value from being determined, which generally represents a failed operation.
  3. Since the data we sent in the POST request was a JavaScript object, axios automatically knew to set the appropriate application/json value for the Content-Type header.
  4. The data returned by the server is plain text, basically just one long string. The axios library is still able to parse the data into a JavaScript array, since the server has specified that the data format is application/json; charset=utf-8 (see previous image) using the content-type header.
  5. ####  About HTML Form: How to access the data contained in the Form's *input* element?
       we use **controlled components**  (assigned a piece of the App component's state as the value attribute of the input element, the App component now controls the behavior of the input element)
  

## React dev server:
> The **browser gets the JavaScript from the React dev server**, which is the application that runs after running the command npm start. 
> The dev-server transforms the JavaScript into a format understood by the browser. Among other things, it stitches together JavaScript from different files into one file.
      
## Simple ways of adding CSS styles to a React app.
1. Import CSS files: CSS rules comprise of selectors and declarations. The selector defines which elements the rule should be applied to. 

2. Inline Style: 
      - The idea behind defining inline styles is extremely simple. Any React component or element can be provided with a set of CSS properties as a JavaScript object through the style attribute.

      - Every CSS property is defined as a separate property of the JavaScript object. Numeric values for pixels can be simply defined as integers. One of the major differences compared to regular CSS, is that hyphenated (kebab case) CSS properties are written in camelCase.

# Part 3
## HTTP Cookies
### HTTP is **stateless**
There is **no link between two requests** being successively carried out on the same connection. 

This immediately has the prospect of being problematic for users attempting to interact with certain pages coherently, for example, using e-commerce shopping baskets. 

But while the core of HTTP itself is stateless, **HTTP cookies allow the use of stateful sessions**. 

Using *header* extensibility, HTTP Cookies are added to the workflow, allowing session creation on each HTTP request to share the same context, or the same state.
### Creating cookies
- After receiving an HTTP request, a server can send one or more `Set-Cookie` headers with the response. 
			
	```
	HTTP/2.0 200 OK
	Content-Type: text/html
	Set-Cookie: yummy_cookie=choco;Expires=Wed, 21 Oct 2023 07:28:00 GMT
	Set-Cookie: tasty_cookie=strawberry; Max-Age=1000000

	[page content]
	```

- The browser usually stores the cookie and sends it with requests made to the same server inside a `Cookie` HTTP header. 
	```
	GET /sample_page.html HTTP/2.0
	Host: www.example.org
	Cookie: yummy_cookie=choco; tasty_cookie=strawberry
	```
	<p><strong>Warning:</strong> Browsers block frontend JavaScript code from accessing the <code>Set-Cookie</code> header, as required by the Fetch spec, which defines <code>Set-Cookie</code> as a <a href="https://fetch.spec.whatwg.org/#forbidden-response-header-name" class="external" rel=" noopener">forbidden response-header name</a> that <a href="https://fetch.spec.whatwg.org/#ref-for-forbidden-response-header-name%E2%91%A0" class="external" rel=" noopener">must be filtered out</a> from any response exposed to frontend code.</p>
### Other ways to store information in the browser

Another approach to storing data in the browser is the Web Storage API.
	
The `window.sessionStorage` and `window.localStorage` properties correspond to session and permanent cookies in duration, but have larger storage limits than cookies, and are never sent to a server. 

## Cross-Origin Resource Sharing

For security reasons, browsers restrict cross-origin HTTP requests initiated from scripts. For example, XMLHttpRequest and the Fetch API follow the same-origin policy. 

The Cross-Origin Resource Sharing standard works by adding new HTTP headers that let servers describe which origins are permitted to read that information from a web browser.

An Example:

<img src="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/simple-req.png" alt="CORS example">

## Node.js
**Node.js in not a framework, is not a library. It is a JavaScript's runtime enviroment.**

### Differences between Node.js and the Browser
Both the browser and Node.js use JavaScript as their programming language.

1. **In the browser, most of the time what you are doing is interacting with the DOM, or other Web Platform APIs like Cookies**. Those do not exist in Node.js, of course. You don't have the document, window and all the other objects that are provided by the browser. And in the browser, we don't have all the nice APIs that Node.js provides through its modules, like the filesystem access functionality.

2. **in Node.js you control the environment**. Unless you are building an open source application that anyone can deploy anywhere, you know which version of Node.js you will run the application on. Compared to the browser environment, where you don't get the luxury to choose what browser your visitors will use, this is very convenient.

3. Another difference is that **Node.js supports both the CommonJS and ES module systems**(since Node.js v12), while in the browser we are starting to see the ES Modules standard being implemented.

	In practice, this means that you can use both `require()` and `import` in Node.js, while you are limited to `import` in the browser.
### Express
#### Why shall we uss Express?
Implementing our server code directly with Node's built-in http web server is cumbersome. 

Express offers a more pleasing interface to work with the built-in http module. 

#### What is Express?
Express is a routing and middleware web framework that has minimal functionality of its own: An Express application is essentially a series of middleware function calls.
#### What is Middleware?
##### Definition

Middleware functions are functions that have access to the request object (req), the response object (res), and the next middleware function in the application’s request-response cycle. 

##### Middleware functions
   - Execute any code.
   - Make changes to the request and the response objects.
   - End the request-response cycle.
   - Call the next middleware function in the stack.

##### `next()`

If `next` was called without a parameter, then the execution would simply move onto the next route or middleware. If the next function is called with a parameter, then the execution will continue to the error handler middleware.

#### Middlewares We have used in Part 3
```
app.use(express.json())
app.use(express.static('build'))
````
## Heroku
1. Deploy the app:
   
   When you create an app, a git remote (called heroku) is also created and associated with your local git repository.
	<pre class=" language-term"><code class=" language-term"><span class="token input"><span class="token prompt">$ </span>heroku create phonebook</span>
	Creating phonebook... done, stack is heroku-18
	http://phonebook.herokuapp.com/ | https://git.heroku.com/phonebook.git
	Git remote heroku added
	</code></pre>
2. Define a Procfile

	Use a Procfile, in the root directory of your application, to explicitly declare what command should be executed to start your app. An exmaple looks like this:
	```
	web: npm start
    ```
	This declares a single process type, web, and the command needed to run it. 
3. Scale the app
	<pre class=" language-term"><code class=" language-term"><span class="token input"><span class="token prompt">$ </span>heroku ps</span>
	=== web (Free): `npm start`
	web.1: up 2014/04/25 16:26:38 (~ 1s ago)
	</code></pre>

	**Dyno**
	: All Heroku applications run in a collection of lightweight Linux containers called dynos

	Scaling an application on Heroku is equivalent to changing the number of **Dynos**() that are running.

4. Define config vars

	Heroku lets you externalize configuration - storing data such as encryption keys or external resource addresses in config vars.

	<pre class=" language-term"><code class=" language-term"><span class="token input"><span class="token prompt">$ </span>heroku config:set 	MONGODB_URI=...</span>
	</code></pre>
	At runtime, config vars are exposed as environment variables to the application.
## MongoDB and Mongoose
### MongoDB

#### Collections

A database stores one or more collections of documents.

#### Documents
MongoDB stores data records as BSON documents. BSON is a binary representation of JSON documents, though it contains more data types than JSON.

Unlike JavaScript objects, the **fields in a BSON document are ordered**. When comparing documents, field ordering is significant.

In addition to defining data records, MongoDB uses the document structure throughout, including but not limited to: *query filters, update specifications documents, and index specification documents*.

### Mongoose
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

<img src="https://cdn-media-1.freecodecamp.org/images/0*b5piDNW1dqlkJWKe." alt="Object Mapping between Node and MongoDB managed via Mongoose">

#### Mongoose Schema

*Everything in Mongoose starts with a Schema*. Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
#### Mongoose Models
Models are fancy **constructors** compiled from Schema definitions. An instance of a model is called a document. Models are responsible for creating and reading documents from the underlying MongoDB database.

#### SchemaType

You can think of a Mongoose schema as the configuration object for a Mongoose model. **A SchemaType is then a configuration object for an individual property**. 

A SchemaType says what type a given path should have, whether it has any getters/setters, and what values are valid for that path.

<pre><code class="language-javascript"><span class="hljs-keyword">const</span> schema = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Schema</span>({ <span class="hljs-attr">name</span>: <span class="hljs-title class_">String</span> });
schema.<span class="hljs-title function_">path</span>(<span class="hljs-string">'name'</span>) <span class="hljs-keyword">instanceof</span> mongoose.<span class="hljs-property">SchemaType</span>; <span class="hljs-comment">// true</span>
schema.<span class="hljs-title function_">path</span>(<span class="hljs-string">'name'</span>) <span class="hljs-keyword">instanceof</span> mongoose.<span class="hljs-property">Schema</span>.<span class="hljs-property">Types</span>.<span class="hljs-property">String</span>; <span class="hljs-comment">// true</span>
schema.<span class="hljs-title function_">path</span>(<span class="hljs-string">'name'</span>).<span class="hljs-property">instance</span>; <span class="hljs-comment">// 'String'</span>
</code></pre>

#### Validation

- Validation is defined in the SchemaType
- Validation is middleware. Mongoose registers validation as a pre('save') hook on every schema by default.
- Mongose has several built-in validators, such as, all SchemaTypes have the built-in `required` validator
- How to create Custom Validators (including Async Custom Validators)?
  
  <p><strong>Warning:</strong>  When using <code>findOneAndUpdate</code> and related methods, mongoose doesn't automatically run validation. To trigger this, you need to pass a configuration object. For technical reasons, this plugin requires that you also set the <code>context</code> option to <code>query</code>.</p>

  <code>{ runValidators: true, context: 'query' }</code>

 

  