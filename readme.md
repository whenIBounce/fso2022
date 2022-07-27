# Projects from Full Stack Open Course 2022
## Part 0:
- difference between traditional web development and AJAX
- single page app
- how browser communicates with server

## Part 1:
projects in this part demonstrate the use of *functional components* and *State Hook*
### NB on **State**: 
  1. it is **forbidden in React to mutate state directly**, since it can result in unexpected side effects.
  2. The useState function (as well as the useEffect function) **must not be called from inside of a loop, a conditional expression**, or any place that is not a function defining a component.
  3. It was recommended to *split state into multiple state variables based on which values tend to change together.*
 ### NB on **components**:
   1. Never define components inside of other components.
   2. The biggest problems are due to the fact that React treats a component defined inside of another component as a new component in every render. This makes it impossible for React to optimize the component.
   
 
## Part 2:

### How to render a data collection , like a list of names?
  The use of Keys: Keys serve as a hint to React. When children have keys, React uses the key to match children in the original tree with children in the subsequent tree. **NB**: But they don’t get passed to your components. If you need the same value in your component, pass it explicitly as a prop with a different name. 
  
### JavaScript Engines, or runtime enviornments, follows the *asynchronous* model. 
  1. Currently, JavaScript engines are **single-threaded**, which means that they cannot execute code in parallel. 
  2. Each message is processed completely before any other message is processed.

      This offers some nice properties when reasoning about your program, including the fact that whenever a function runs, it cannot be preempted and will run entirely before any other code runs (and can modify data the function manipulates). This differs from C, for instance, where if a function runs in a thread, it may be stopped at any point by the runtime system to run some other code in another thread.
  
  3. As a result, it is a requirement in practice to **use a non-blocking model for executing IO operations**. Otherwise, the browser would "freeze" during, for instance, the fetching of data from a server.
  
  4. Explain JavaScript runtime environment model: It consists of a Heap, a Stack, Web APIs, a **event loop + a queue**...
  ![image](https://user-images.githubusercontent.com/108560114/179148904-e9678fc7-cbb9-48a2-b9d3-af66b99a422f.png)


### How JavaScript code in the browser can fetch and handle data stored in a remote backend server?
  1. A **Promise** is an object representing the eventual completion or failure of an asynchronous operation.
  2. Three distinct states of a Promise:
      - The promise is *pending*: It means that the final value (one of the following two) is not available yet.
      - The promise is fulfilled: It means that the operation has been completed and the final value is *available*, which generally is a successful operation. This state is sometimes also called resolved.
      - The promise is *rejected*: It means that an error prevented the final value from being determined, which generally represents a failed operation.
  3. Since the data we sent in the POST request was a JavaScript object, axios automatically knew to set the appropriate application/json value for the Content-Type header.
  4. The data returned by the server is plain text, basically just one long string. The axios library is still able to parse the data into a JavaScript array, since the server has specified that the data format is application/json; charset=utf-8 (see previous image) using the content-type header.
  5. ####  About HTML Form: How to access the data contained in the Form's *input* element?
       we use **controlled components**  (assigned a piece of the App component's state as the value attribute of the input element, the App component now controls the behavior of the input element)
  

### React dev server:
> The **browser gets the JavaScript from the React dev server**, which is the application that runs after running the command npm start. 
> The dev-server transforms the JavaScript into a format understood by the browser. Among other things, it stitches together JavaScript from different files into one file.
      
### Simple ways of adding CSS styles to a React app.
1. Import CSS files: CSS rules comprise of selectors and declarations. The selector defines which elements the rule should be applied to. 

2. Inline Style: 
      - The idea behind defining inline styles is extremely simple. Any React component or element can be provided with a set of CSS properties as a JavaScript object through the style attribute.

      - Every CSS property is defined as a separate property of the JavaScript object. Numeric values for pixels can be simply defined as integers. One of the major differences compared to regular CSS, is that hyphenated (kebab case) CSS properties are written in camelCase.
