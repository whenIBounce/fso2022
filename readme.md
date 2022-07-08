# Projects from Full Stack Open Course 2022
## part 0:
- difference between traditional web development and AJAX
- single page app
- how browser communicates with server

## part 1:
- projects in this part demonstrate the use of *functional components* and *State Hook*
- **NB on State**: 
  1. it is **forbidden in React to mutate state directly**, since it can result in unexpected side effects.
  2. The useState function (as well as the useEffect function) **must not be called from inside of a loop, a conditional expression**, or any place that is not a function defining a component.
  3. It was recommended to *split state into multiple state variables based on which values tend to change together.*
 - **NB on components**:
   1. Never define components inside of other components.
   2. The biggest problems are due to the fact that React treats a component defined inside of another component as a new component in every render. This makes it impossible for React to optimize the component.
